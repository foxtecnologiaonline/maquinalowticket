import { v4 as uuidv4 } from 'uuid';
import { query, queryOne } from './database';
import { sendEmail } from './EmailService';
import { callMarketingLLM, LLMConfigError, LLMResponseError } from './LLMClient';
import {
  MarketingCycleType,
  MarketingReportWithRecommendations,
  MarketingAgentLLMResponse,
} from '@maquinalowticket/shared-types';

const SYSTEM_PROMPT = `Você é o DIRETOR DE MARKETING E VENDAS da Máquina Low Ticket, uma fábrica de
produtos digitais de baixo ticket (R$29–R$997). Você atua como estrategista, analista e
operador de funil — não como copywriter genérico.

# MISSÃO
Maximizar receita líquida (LTV - CAC) através de análise de produtos, funis de landing
pages, tráfego pago, conteúdo orgânico e otimização contínua baseada em dados reais.

# MODO DE OPERAÇÃO NESTA VERSÃO
Você opera em MODO PLANEJAMENTO: não há integração ativa com plataformas de anúncio ou
redes sociais. Toda ação que envolva gasto de dinheiro ou publicação externa deve ser
proposta como RECOMENDAÇÃO para aprovação humana — você nunca afirma que uma ação já
foi executada.

# PRINCÍPIOS
1. Dado real > opinião. Se faltar dado (analytics, orders, benchmark de mercado), marque
   data_sufficient=false e liste em missing_data o que falta. Nunca invente números de
   conversão, CPC, ROAS etc. que não possam ser derivados do contexto fornecido.
2. Toda recomendação vem com: ação concreta, raciocínio, impacto esperado, prioridade
   (1=maior impacto/urgência, 5=menor) e se é reversível (true) ou não (false, ex: subir
   orçamento de forma agressiva, mudar preço de produto já publicado).
3. Priorize por impacto x esforço x reversibilidade.
4. Ticket baixo = volume. Otimize para escala e repetibilidade.

# ENTRADA
Você recebe um JSON com: products, orders (últimos 90 dias), analytics (últimos 30 dias)
e landing_pages do usuário. Pode vir parcialmente vazio.

# SAÍDA — responda APENAS com um JSON válido, sem markdown, no schema exato:
{
  "schema_version": 1,
  "summary": "resumo executivo em até 4 linhas",
  "data_sufficient": true|false,
  "missing_data": ["o que falta coletar, se houver"],
  "metrics": {
    "cac": number|null,
    "roas": number|null,
    "conversionRate": number|null,
    "ltvEstimate": number|null,
    "revenueTotal": number|null,
    "ordersCount": number|null
  },
  "anomalies": ["strings descrevendo anomalias detectadas nos dados"],
  "recommendations": [
    {
      "action": "ação concreta e específica",
      "reasoning": "por que, baseado nos dados",
      "expected_impact": "impacto esperado e como medir",
      "priority": 1-5,
      "reversible": true|false
    }
  ]
}

Nunca inclua texto fora do JSON. Nunca omita um campo do schema — use null ou array vazio
quando não houver dado suficiente.`;

interface AgentContext {
  products: any[];
  orders: any[];
  analytics: any[];
  landingPages: any[];
}

export class MarketingAgent {
  private async gatherContext(userId: string): Promise<AgentContext> {
    const [products, orders, analytics, landingPages] = await Promise.all([
      query('SELECT id, title, type, price, status, created_at FROM products WHERE user_id = $1', [userId]),
      query(
        `SELECT o.id, o.product_id, o.amount, o.currency, o.status, o.created_at
         FROM orders o
         JOIN products p ON p.id = o.product_id
         WHERE p.user_id = $1 AND o.created_at >= NOW() - INTERVAL '90 days'`,
        [userId]
      ),
      query(
        `SELECT a.product_id, a.date, a.views, a.clicks, a.conversions, a.revenue, a.traffic_source
         FROM analytics a
         JOIN products p ON p.id = a.product_id
         WHERE p.user_id = $1 AND a.date >= CURRENT_DATE - INTERVAL '30 days'`,
        [userId]
      ),
      query(
        `SELECT lp.id, lp.product_id, lp.slug, lp.title, lp.published
         FROM landing_pages lp
         JOIN products p ON p.id = lp.product_id
         WHERE p.user_id = $1`,
        [userId]
      ),
    ]);

    return { products, orders, analytics, landingPages };
  }

  private async persistReport(
    userId: string,
    cycleType: MarketingCycleType,
    llmResponse: MarketingAgentLLMResponse
  ): Promise<MarketingReportWithRecommendations> {
    const reportId = uuidv4();

    await query(
      `INSERT INTO marketing_reports
         (id, user_id, cycle_type, summary, metrics, anomalies, data_sufficient, raw_response)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        reportId,
        userId,
        cycleType,
        llmResponse.summary,
        JSON.stringify(llmResponse.metrics || {}),
        JSON.stringify(llmResponse.anomalies || []),
        llmResponse.data_sufficient,
        JSON.stringify(llmResponse),
      ]
    );

    const recommendations = [];
    for (const rec of llmResponse.recommendations || []) {
      const recId = uuidv4();
      await query(
        `INSERT INTO marketing_recommendations
           (id, report_id, user_id, action, reasoning, expected_impact, priority, reversible, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')`,
        [recId, reportId, userId, rec.action, rec.reasoning, rec.expected_impact, rec.priority, rec.reversible]
      );
      recommendations.push({
        id: recId,
        reportId,
        userId,
        action: rec.action,
        reasoning: rec.reasoning,
        expectedImpact: rec.expected_impact,
        priority: rec.priority,
        reversible: rec.reversible,
        status: 'pending' as const,
        createdAt: new Date(),
      });
    }

    return {
      id: reportId,
      userId,
      cycleType,
      summary: llmResponse.summary,
      metrics: llmResponse.metrics,
      anomalies: llmResponse.anomalies || [],
      dataSufficient: llmResponse.data_sufficient,
      createdAt: new Date(),
      recommendations,
    };
  }

  private async persistFallbackReport(
    userId: string,
    cycleType: MarketingCycleType,
    reason: string
  ): Promise<MarketingReportWithRecommendations> {
    const reportId = uuidv4();

    await query(
      `INSERT INTO marketing_reports
         (id, user_id, cycle_type, summary, metrics, anomalies, data_sufficient, raw_response)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [reportId, userId, cycleType, `Ciclo não pôde ser concluído: ${reason}`, '{}', '[]', false, null]
    );

    return {
      id: reportId,
      userId,
      cycleType,
      summary: `Ciclo não pôde ser concluído: ${reason}`,
      metrics: {},
      anomalies: [],
      dataSufficient: false,
      createdAt: new Date(),
      recommendations: [],
    };
  }

  private buildEmailHtml(report: MarketingReportWithRecommendations): string {
    const metricsRows = Object.entries(report.metrics)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
      .join('');

    const recommendationsList = report.recommendations
      .sort((a, b) => a.priority - b.priority)
      .map(
        (r) =>
          `<li><b>[P${r.priority}${r.reversible ? '' : ' · irreversível'}]</b> ${r.action}<br/><small>${r.reasoning}</small></li>`
      )
      .join('');

    return `
      <h2>Relatório de Marketing — ${report.cycleType}</h2>
      <p>${report.summary}</p>
      ${!report.dataSufficient ? '<p><i>Atenção: dados insuficientes para algumas métricas.</i></p>' : ''}
      <h3>Métricas</h3>
      <table>${metricsRows || '<tr><td colspan="2">Sem métricas disponíveis</td></tr>'}</table>
      <h3>Recomendações (aguardando sua aprovação)</h3>
      <ul>${recommendationsList || '<li>Nenhuma recomendação neste ciclo</li>'}</ul>
    `;
  }

  private async emailReport(userId: string, report: MarketingReportWithRecommendations): Promise<void> {
    const user = await queryOne('SELECT email FROM users WHERE id = $1', [userId]);
    if (!user) return;

    const sent = await sendEmail({
      to: user.email,
      subject: `[Máquina Low Ticket] Relatório de Marketing — ${report.cycleType}`,
      html: this.buildEmailHtml(report),
    });

    if (sent) {
      await query('UPDATE marketing_reports SET email_sent_at = CURRENT_TIMESTAMP WHERE id = $1', [report.id]);
    }
  }

  /**
   * Runs one full analysis cycle for a user: gathers data, calls the LLM,
   * persists the report + recommendations, and emails a summary.
   * Never executes recommendations — those require explicit approval via
   * approveRecommendation().
   */
  async runCycle(userId: string, cycleType: MarketingCycleType = 'manual'): Promise<MarketingReportWithRecommendations> {
    const context = await this.gatherContext(userId);

    const userPrompt = JSON.stringify({
      products: context.products,
      orders: context.orders,
      analytics: context.analytics,
      landing_pages: context.landingPages,
    });

    let llmResponse: MarketingAgentLLMResponse;
    try {
      llmResponse = await callMarketingLLM(SYSTEM_PROMPT, userPrompt);
    } catch (error: any) {
      const reason =
        error instanceof LLMConfigError || error instanceof LLMResponseError
          ? error.message
          : 'erro inesperado ao chamar o modelo';
      const fallback = await this.persistFallbackReport(userId, cycleType, reason);
      await this.emailReport(userId, fallback);
      return fallback;
    }

    const report = await this.persistReport(userId, cycleType, llmResponse);
    await this.emailReport(userId, report);
    return report;
  }

  async listReports(userId: string, limit = 20): Promise<any[]> {
    return query(
      'SELECT * FROM marketing_reports WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );
  }

  async getReport(userId: string, reportId: string): Promise<MarketingReportWithRecommendations | null> {
    const report = await queryOne('SELECT * FROM marketing_reports WHERE id = $1 AND user_id = $2', [
      reportId,
      userId,
    ]);
    if (!report) return null;

    const recommendations = await query(
      'SELECT * FROM marketing_recommendations WHERE report_id = $1 ORDER BY priority ASC',
      [reportId]
    );

    return { ...report, recommendations };
  }

  async listRecommendations(userId: string, status?: string): Promise<any[]> {
    if (status) {
      return query(
        'SELECT * FROM marketing_recommendations WHERE user_id = $1 AND status = $2 ORDER BY priority ASC, created_at DESC',
        [userId, status]
      );
    }
    return query(
      'SELECT * FROM marketing_recommendations WHERE user_id = $1 ORDER BY priority ASC, created_at DESC',
      [userId]
    );
  }

  /**
   * Marks a recommendation as approved/rejected by a human. This never
   * triggers automatic execution — it only records the decision so a
   * downstream operator/service can act on approved items.
   */
  async decideRecommendation(
    userId: string,
    recommendationId: string,
    decidedBy: string,
    decision: 'approved' | 'rejected'
  ): Promise<any> {
    const recommendation = await queryOne(
      'SELECT * FROM marketing_recommendations WHERE id = $1 AND user_id = $2',
      [recommendationId, userId]
    );

    if (!recommendation) {
      throw new Error('Recommendation not found');
    }

    if (recommendation.status !== 'pending') {
      throw new Error(`Recommendation already ${recommendation.status}`);
    }

    await query(
      `UPDATE marketing_recommendations
       SET status = $1, decided_at = CURRENT_TIMESTAMP, decided_by = $2
       WHERE id = $3`,
      [decision, decidedBy, recommendationId]
    );

    await query(
      `INSERT INTO audit_logs (id, user_id, entity_type, entity_id, action, changes)
       VALUES ($1, $2, 'marketing_recommendation', $3, $4, $5)`,
      [uuidv4(), decidedBy, recommendationId, decision, JSON.stringify({ action: recommendation.action })]
    );

    return { ...recommendation, status: decision };
  }
}

export const marketingAgent = new MarketingAgent();
