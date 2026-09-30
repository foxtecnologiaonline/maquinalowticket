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

## Status

- ✅ Conteúdo textual completo de todos os módulos
- ✅ PDF gerado para o produto grátis
- ⬜ Áudios de pronúncia (não gerados — requer locução/TTS real)
- ⬜ Vídeos das simulações de mock interview (requer gravação)
- ⬜ Diagramação/design final do PDF pago (hoje é texto puro em Markdown)

## Próximo passo para publicar de verdade

1. Gerar PDFs dos módulos 1–6 com o design da marca (hoje estão em Markdown simples).
2. Gravar os áudios (TTS ou locução humana) referenciados no Kit Grátis e nas Simulações.
3. Inserir este conteúdo no campo `content` (JSONB) de uma linha em `templates`, e depois criar o `product` via `POST /api/products`.
