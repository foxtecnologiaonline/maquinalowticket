# PDFs — Método Recomeço (Produto #1)

Gerados a partir do markdown em `../free/` e `../pago/` via `scripts/gerar-pdfs-reconquista.py` (Python + Chromium headless, tema visual igual à LP em `apps/landing/reconquista-pos-traicao/`).

| Arquivo | O que é | Onde postar no Hotmart |
|---|---|---|
| `01-GRATUITO-Diagnostico-5-Sinais.pdf` | Lead magnet — quiz autoavaliável de 5 perguntas | Fora do Hotmart (isca de captura) ou como produto gratuito/order bump inicial |
| `02-PAGO-Metodo-Recomeco-Ebook-Completo.pdf` | Produto principal — os 4 módulos + bônus de frases | **Arquivo principal do produto pago** (área de membros / entrega automática) |
| `03-BONUS-Planilha-21-Dias.pdf` | Planilha imprimível de acompanhamento | Anexar como bônus/arquivo extra do produto |

## Antes de publicar

- [ ] Substituir `[Nome do especialista/curador]` (não está nesses PDFs — está na LP; ver `apps/landing/reconquista-pos-traicao/index.html`)
- [ ] Revisar o texto uma última vez como cliente final (ortografia, tom)
- [ ] Confirmar que a capa/preço batem com o valor configurado no Hotmart (R$37)
- [ ] Regenerar se qualquer `.md` de origem for editado — rodar: `python3 scripts/gerar-pdfs-reconquista.py`

## Regenerar

```bash
python3 /home/user/maquinalowticket/scripts/gerar-pdfs-reconquista.py
```

Requer: `pip install markdown` e o Chromium já instalado no ambiente (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`). Em outro ambiente, ajustar a variável `CHROME` no script para o caminho do Chrome/Chromium local.
