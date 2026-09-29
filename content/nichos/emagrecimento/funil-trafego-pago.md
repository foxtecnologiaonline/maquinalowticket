# 🚀 Arquitetura de Funil de Tráfego Pago — Nicho Emagrecimento

Aplicável aos 3 produtos (pós-40/menopausa, pós-parto, low carb pré-diabético).

## 1. Estrutura do Funil

```
Tráfego Pago (Meta Ads / Google Ads)
        ↓
Landing Page da Isca (captura e-mail/WhatsApp)
        ↓
Página de Obrigado + Entrega da Isca
        ↓
Sequência de E-mail/WhatsApp (7 dias) — straight line
        ↓
Página de Vendas (VSL + copy) → Checkout
        ↓
Order Bump (checkout) → Upsell (pós-compra) → Downsell (se recusar upsell)
```

## 2. Alocação de Orçamento Inicial (fase de teste)

- **Orçamento mínimo de teste por produto:** R$ 50-100/dia por 5-7 dias
- **Divisão:** 70% Meta Ads (topo de funil / isca), 30% Google Ads (fundo de funil / intenção)
- **Regra de corte:** desligar criativo/campanha sem lead após R$ 80-100 gastos sem conversão
- **Regra de escala:** aumentar orçamento em 20-30% a cada 2-3 dias quando ROAS > 2x, nunca dobrar de uma vez

## 3. Estrutura de Campanha Meta Ads (recomendada)

```
Campanha: [Produto] - Leads - Fria
├── Conjunto 1: Interesses (broad, deixar algoritmo otimizar com 3-5 interesses)
├── Conjunto 2: Lookalike 1-3%
└── Conjunto 3: Advantage+ audience (se disponível)

Campanha: [Produto] - Remarketing
├── Conjunto: Visitantes LP 14 dias (não converteram)
├── Conjunto: Engajamento vídeo 50%+ 30 dias
└── Conjunto: Add to cart / checkout iniciado (não comprou)
```

Cada conjunto com 3-4 criativos (ângulos diferentes) para teste A/B — desligar os que não performarem em 48-72h.

## 4. Estrutura de Campanha Google Ads (recomendada)

```
Campanha 1: Pesquisa - Intenção Alta (produto/solução)
Campanha 2: Pesquisa - Sintomas/Dor (topo de funil → direciona pra isca)
Campanha 3: Remarketing Display (visitantes do site)
Campanha 4: Performance Max (após validação, com feed de conversão)
```

- Match types: começar com frase/exata para controle de custo; expandir para ampla modificada após dados de conversão.
- Extensões de anúncio: sitelinks (FAQ, garantia, depoimentos), snippets estruturados, chamada (se houver).

## 5. Criativos — Framework de Produção (para os 3 produtos)

Para cada produto, produzir no mínimo:
- 2 vídeos UGC (depoimento/identificação) — 30-60s
- 2 carrosséis educativos (3-5 slides, gancho no slide 1)
- 2 estáticos com prova/resultado
- 1 vídeo VSL curto (60-90s) para anúncio + VSL longa (10-15min) na LP

**Fórmula de gancho (primeiros 3 segundos):**
"Se você [situação específica do avatar], isso vai mudar como você vê [problema]."

## 6. Métricas de Controle (dashboard semanal)

| Métrica | Meta |
|---|---|
| CPM | Monitorar tendência, não é decisório sozinho |
| CTR | > 1,5% (Meta) / > 4% (Google Pesquisa) |
| CPL | Ver valores por produto nos arquivos individuais |
| Conversão LP→Lead | > 25% |
| Conversão Lead→Venda | > 3% |
| ROAS | > 2x para escalar, < 1x = pausar |
| CAC | < 40% do ticket médio (considerando bumps) |

## 7. Checklist de Compliance Antes de Subir Campanha

- [ ] Disclaimers de saúde presentes (especialmente produto 3 - pré-diabetes)
- [ ] Sem promessas de resultado garantido ("emagreça X kg garantido")
- [ ] Anúncios não afirmam/implicam que o viewer tem a condição de saúde (política de "Personalized Attributes" do Meta) — usar afirmações gerais sobre o público-alvo, nunca "você está na menopausa/grávida/pré-diabético" em 2ª pessoa direta
- [ ] Política de reembolso visível na LP
- [ ] Pixel/conversion API instalados e testados (Meta + Google)
- [ ] UTM parametrizada em todos os links (`utm_source`, `utm_campaign`, `utm_content`)
- [ ] Conta de anúncio de saúde verificada quando exigido pela plataforma (produto 3 tem maior chance de exigir)
