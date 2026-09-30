# Produto 1 — Entregáveis Reais (Inglês Fluente para Entrevista)

Conteúdo final pronto para entrega (não mais apenas roteiro/outline). Ver estratégia/copy em `../../01-ingles-entrevista-curriculo.md`.

| Arquivo | Papel no funil |
|---|---|
| `00-kit-gratis-20-frases.md` | **Produto grátis (60%)** — vira o PDF da isca. Exportado também em `00-kit-gratis-20-frases.pdf`. |
| `01-curriculo-linkedin-templates.md` | Módulo 1 do pago |
| `02-banco-perguntas-por-area.md` | Módulo 2 do pago (5 áreas: TI, Vendas, Marketing, Engenharia, RH) |
| `03-simulacoes-mock-interview.md` | Módulo 3 do pago (roteiros de 4 simulações + ficha de feedback) |
| `04-vocabulario-tecnico-por-setor.md` | Módulo 4 do pago |
| `05-negociacao-salarial.md` | Módulo 5 do pago |
| `06-bonus-cola-de-emergencia.md` | Bônus/order bump (R$ 27) |
| `00-kit-gratis-20-frases.pdf` | **PDF pronto para entrega** — arquivo do produto grátis (capa + conteúdo), ~5 páginas |
| `PRODUTO-PAGO-ingles-fluente-para-entrevista.pdf` | **PDF pronto para upload na Hotmart** — os 6 módulos pagos consolidados em 1 arquivo (capa + sumário + módulos), ~15 páginas |

## Status

- ✅ Conteúdo textual completo de todos os módulos
- ✅ PDF do produto grátis gerado (com capa)
- ✅ PDF do produto pago gerado — 1 arquivo único com capa, sumário e os 6 módulos, pronto para subir como arquivo do produto na Hotmart
- ⬜ Áudios de pronúncia (não gerados — requer locução/TTS real)
- ⬜ Vídeos das simulações de mock interview (requer gravação)
- ⬜ Design gráfico/diagramação de marca (hoje é um PDF limpo e funcional, mas sem identidade visual customizada — logo, cores da marca, ilustrações)

## Como subir na Hotmart

1. Produto principal (pago): envie `PRODUTO-PAGO-ingles-fluente-para-entrevista.pdf` como arquivo de entrega do produto (R$ 97, conforme copy em `../../01-ingles-entrevista-curriculo.md`).
2. Isca/captura (grátis): `00-kit-gratis-20-frases.pdf` é o que já está publicado na LP (`apps/dashboard/app/lp/ingles-entrevista`) e servido em `apps/dashboard/public/downloads/kit-20-frases-entrevista-ingles.pdf` — não precisa subir na Hotmart, só o produto pago vai lá.
3. Bônus (`06-bonus-cola-de-emergencia.md`) pode virar um PDF avulso de 1 página para usar como order bump — hoje está embutido no PDF principal.

## Próximo passo para deixar mais profissional

1. Aplicar identidade visual (logo, cores, capa customizada) ao PDF — hoje o layout é limpo mas genérico.
2. Gravar os áudios (TTS ou locução humana) referenciados no Kit Grátis e nas Simulações.
3. Gravar os vídeos de mock interview do Módulo 3.
4. Inserir este conteúdo no campo `content` (JSONB) de uma linha em `templates`, e depois criar o `product` via `POST /api/products`, se quiser gerenciar pela própria Máquina Low Ticket além da Hotmart.
