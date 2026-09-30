# Landing Pages — Relacionamento

Páginas estáticas (HTML autocontido, sem build) prontas para deploy, geradas a partir da copy em `content/relacionamento/`.

| Pasta | Produto | Preço |
|---|---|---|
| `reconquista-pos-traicao/` | Método Recomeço | R$37 |
| `comunicacao-nao-violenta/` | Método CNV Casal | R$37 |
| `relacionamento-a-distancia/` | Guia Relacionamento à Distância | R$29 |

## Pendências antes de rodar tráfego pago

1. **Checkout**: os botões `.cta-btn` apontam para `#oferta`/`#checkout` — trocar pelo link real do checkout (Hotmart/plataforma escolhida).
2. **Depoimentos**: todo bloco marcado com ⚠️ é placeholder. Substituir por depoimento real e autorizado antes de publicar (ver `content/relacionamento/00-estrategia-geral.md`, seção 8 — Compliance).
3. **Autor**: substituir `[Nome do especialista/curador]` e a foto placeholder pelos dados reais.
4. **Pixel/analytics**: adicionar Meta Pixel / Google Tag antes de rodar campanhas.
5. **Domínio**: as páginas ainda não estão publicadas — deploy sugerido via Vercel (mesma stack do restante do projeto) ou como parte de `apps/dashboard`.

## Como visualizar localmente

Abrir o `index.html` de cada pasta diretamente no navegador, ou servir com qualquer servidor estático:

```bash
npx serve apps/landing/reconquista-pos-traicao
```
