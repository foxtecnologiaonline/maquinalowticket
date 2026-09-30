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

### Ativos executáveis (produzidos, prontos para uso)

| Ativo | Onde está | Status |
|---|---|---|
| Landing page principal | [`apps/landing/unhas-de-gel-renda-extra/index.html`](../../../apps/landing/unhas-de-gel-renda-extra/index.html) | ✅ HTML funcional, responsivo, com contador regressivo. ⚠️ contém placeholders marcados (`[SUBSTITUIR]`) para depoimentos reais, foto/vídeo da instrutora e nome real — **não publicar antes de trocar** |
| Checkout + order bump | [`apps/landing/.../checkout.html`](../../../apps/landing/unhas-de-gel-renda-extra/checkout.html) | ✅ HTML funcional com checkbox de order bump e total dinâmico. ⚠️ botão de pagamento ainda não integrado a gateway real |
| Upsell 1, Upsell 2, Downsell, Obrigado | `apps/landing/.../upsell-1.html`, `upsell-2.html`, `downsell.html`, `obrigado.html` | ✅ HTML funcional, esteira de navegação ligada |
| Roteiro completo das 3 aulas gratuitas | [`roteiros-gravacao/free-aula-1.md`](./roteiros-gravacao/free-aula-1.md), `free-aula-2.md`, `free-aula-3.md` | ✅ Texto pronto para ler/gravar (não é mais só outline) |
| Roteiro dos módulos pagos 1–4 | [`roteiros-gravacao/pago-modulos-1-a-4.md`](./roteiros-gravacao/pago-modulos-1-a-4.md) | ✅ Roteiro por aula com fala de abertura, demonstração e ponte |
| Checklist de Materiais Essenciais (PDF) | [`bonus-pdf/checklist-materiais-essenciais.pdf`](./bonus-pdf/checklist-materiais-essenciais.pdf) | ✅ PDF pronto para entregar no conteúdo gratuito |
| Tabela de Precificação (PDF) | [`bonus-pdf/tabela-precificacao-referencia.pdf`](./bonus-pdf/tabela-precificacao-referencia.pdf) | ✅ PDF pronto — ativo do order bump |
| Script de Atendimento e Fechamento (PDF) | [`bonus-pdf/script-atendimento-fechamento.pdf`](./bonus-pdf/script-atendimento-fechamento.pdf) | ✅ PDF pronto — bônus incluso no curso |

### O que ainda depende de ação humana (não pode ser gerado por IA de forma legítima)

Estes itens envolvem **fatos reais sobre pessoas** e não podem ser inventados sem configurar propaganda enganosa:
1. **Gravação em vídeo** das aulas (roteiro já pronto acima) — precisa da instrutora real na câmera
2. **Depoimentos de alunas** — só podem ser publicados depoimentos reais e autorizados; os placeholders no HTML/copy precisam ser substituídos, nunca preenchidos com nomes/falas fictícias apresentadas como reais
3. **Prints de faturamento e fotos de antes/depois** — precisam ser capturas reais e verificáveis, não imagens de banco ou exemplos genéricos
4. **Nome real da instrutora, foto e bio** — hoje é `[NOME DA INSTRUTORA]` no HTML e nos roteiros
5. **Integração de pagamento real** (Hotmart/Stripe) no `checkout.html` — hoje os botões navegam entre páginas estáticas, sem processar pagamento
6. **Cadastro do produto no banco de dados** via `FactoryEngine.createProduct()` — requer Postgres rodando e um registro em `templates` (ver `packages/database/schema.sql`); não executado nesta sessão por não haver infraestrutura de banco disponível no ambiente

## Próximos passos sugeridos

1. Gravar os vídeos usando os roteiros em `roteiros-gravacao/`
2. Substituir todos os placeholders `[SUBSTITUIR]` / `[NOME DA INSTRUTORA]` nos arquivos HTML por conteúdo real
3. Integrar `checkout.html` a um gateway de pagamento real
4. Subir a LP para hospedagem (Vercel/Netlify) ou publicar via `LandingPageEngine` quando implementado (FASE 2 do roadmap, ver `CLAUDE.md`)
5. Subir as campanhas de tráfego (Meta + Google) com a copy e keywords deste pacote
6. Replicar esta mesma estrutura de pasta para os produtos 🥈 (extensão de cílios) e 🥉 (skincare teen)
