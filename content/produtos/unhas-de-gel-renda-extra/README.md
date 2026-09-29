# Pacote de Lançamento — Unhas de Gel para Renda Extra

Pacote completo de marketing e conteúdo para o primeiro produto piloto da Máquina Low Ticket, no nicho **Beleza**, seguindo a metodologia de vendas em linha reta e o modelo de conteúdo 60% grátis / 40% pago.

## Índice

| Arquivo | Conteúdo |
|---|---|
| [`00-briefing.md`](./00-briefing.md) | Avatar, dores, desejos, oferta e estrutura de produto |
| [`01-metodologia-linha-reta.md`](./01-metodologia-linha-reta.md) | Metodologia de venda em linha reta, gatilhos mentais, script de VSL |
| [`02-landing-page.md`](./02-landing-page.md) | Copy completo da página de vendas |
| [`03-anuncios-trafego-pago.md`](./03-anuncios-trafego-pago.md) | Campanhas e copy para Meta Ads / TikTok Ads |
| [`04-google-keywords.md`](./04-google-keywords.md) | Estrutura de campanha, keywords e anúncios de pesquisa (Google Ads) |
| [`05-nomes-e-headlines.md`](./05-nomes-e-headlines.md) | Banco de nomes de produto e headlines para teste A/B |
| [`06-conteudo-gratuito-60.md`](./06-conteudo-gratuito-60.md) | Roteiro do conteúdo gratuito (desafio de 3 dias) |
| [`07-conteudo-pago-40.md`](./07-conteudo-pago-40.md) | Estrutura do produto pago (módulos + bônus) |
| [`08-sequencia-emails.md`](./08-sequencia-emails.md) | Sequência de e-mails/WhatsApp do funil |
| [`09-order-bump-upsell-downsell.md`](./09-order-bump-upsell-downsell.md) | Copy do order bump, upsells e downsell da esteira de checkout |

## Próximos passos sugeridos

1. Gravar os vídeos do conteúdo gratuito (Dia 1–3) e do VSL de vendas
2. Cadastrar o produto no `FactoryEngine` (`apps/api/src/services/FactoryEngine.ts`) usando este briefing como `ProductFactoryInput`
3. Implementar a LP via `LandingPageEngine` (FASE 2 do roadmap, ver `CLAUDE.md`) usando `02-landing-page.md` como conteúdo-fonte
4. Subir as campanhas de tráfego (Meta + Google) com a copy e keywords deste pacote
5. Replicar esta mesma estrutura de pasta para os produtos 🥈 (extensão de cílios) e 🥉 (skincare teen)
