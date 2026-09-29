# Vertical: Inglês — Materiais de Produto e Marketing

Pacote completo de estratégia low ticket (metodologia Hotmart/linha reta) para 3 produtos de inglês, priorizados por urgência de dor e potencial de conversão.

| Ordem | Produto | Arquivo |
|---|---|---|
| 0 | Metodologia geral (regra 60/40, gatilhos, funil) | [00-metodologia-low-ticket.md](./00-metodologia-low-ticket.md) |
| 🥇 1 | Inglês para entrevista/currículo de emprego | [01-ingles-entrevista-curriculo.md](./01-ingles-entrevista-curriculo.md) |
| 🥈 2 | Inglês para viagem | [02-ingles-viagem.md](./02-ingles-viagem.md) |
| 🥉 3 | Inglês para ensinar os filhos | [03-ingles-filhos.md](./03-ingles-filhos.md) |

Cada arquivo de produto contém: avatar, desenho do produto grátis (60%) e pago (100%), copy completa da landing page em linha reta, sequência de e-mail/WhatsApp, anúncios Google Search e Meta, lista de keywords (comercial + informacional + negativas) e sazonalidade recomendada.

Uso pretendido: servir de conteúdo-fonte para popular o campo `content` (JSONB) de uma linha na tabela `templates` (ver `packages/database/schema.sql`) para cada um dos 3 produtos. O `FactoryEngine` (`apps/api/src/services/FactoryEngine.ts`) busca o template pelo **UUID** gerado no `INSERT` (`WHERE id = $1 AND active = true`), não por um nome — portanto `input.templateId` em `POST /api/products` deve ser esse UUID, não um slug como `"ingles-low-ticket"`. Estes arquivos também servem de referência direta para quem for montar a LP em `apps/dashboard` e as campanhas de tráfego pago.

> ⚠️ Nenhum destes 3 produtos foi inserido na tabela `templates` ainda — este pacote é conteúdo/copy pronto, não um template ativo no banco. Antes de criar produto via API, é necessário rodar um `INSERT INTO templates (...)` com o `content` derivado destes arquivos.
