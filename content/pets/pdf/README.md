# PDFs dos Produtos Pets

Gerados a partir de `content/pets/conteudo/*.md` pelo script `build_pdfs.py`.

## Estrutura

- `gratis/` — amostra gratuita (só os módulos 🆓), termina com CTA para a versão completa.
  Use como lead magnet (captura de e-mail) ou como conteúdo de prévia.
- `completo/` — produto 100% completo (módulos 🆓 + 💰 + bônus). **É este arquivo que vai no Hotmart**
  como o produto entregue após a compra.

## Regenerar após editar o conteúdo

```bash
pip install weasyprint markdown
python3 content/pets/pdf/build_pdfs.py
```

O script lê os arquivos em `content/pets/conteudo/`, separa módulos grátis (`## 🆓`) de pagos
(`## 💰`), e gera capa + sumário + conteúdo formatado automaticamente, usando a paleta de cor de
cada nicho (mesmas cores das LPs em `content/pets/lp/`).

## Publicando no Hotmart

1. Cadastre o produto no Hotmart com o preço da tabela em `../00-INDEX.md`.
2. Faça upload do PDF de `completo/` como o arquivo de entrega do produto.
3. (Opcional) Use o PDF de `gratis/` como isca em um formulário de captura antes do checkout,
   ou como o "Módulo 1" liberado automaticamente para quem abandona o carrinho.
4. Cole a copy de `../01-...md` / `../02-...md` / `../03-...md` (seção "Landing Page") na página
   de vendas do Hotmart, ou publique o `.html` de `../lp/` em domínio próprio e linke o checkout
   do Hotmart no botão de CTA.
