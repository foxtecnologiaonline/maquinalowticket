# 🔥 Nicho: Emagrecimento — Pacote de Lançamento Low Ticket

> Metodologia: Sistema de Vendas em Linha Reta (Straight Line Persuasion) + modelo Hotmart de conteúdo 60/40.
> Preço-alvo: R$ 29 a R$ 97 (front-end low ticket), com order bump e upsell para escalar ticket médio.

## 🎯 Por que esses 3 sub-nichos

| # | Sub-nicho | Dor | Saturação | Ticket médio | Poder de compra |
|---|-----------|-----|-----------|---------------|------------------|
| 🥇 | Emagrecimento pós-40 / menopausa | Alta (hormonal, identidade, autoestima) | Baixa/Média | R$ 47-97 | Alto |
| 🥈 | Emagrecimento pós-parto | Alta (urgência emocional, corpo "de volta") | Média | R$ 37-67 | Médio |
| 🥉 | Low carb pré-diabético | Alta (medo médico, concreta) | Média/Alta | R$ 37-77 | Médio-Alto |

## 📐 Metodologia aplicada (regra 60/40)

1. **Free / Isca (Lead Magnet — 60% do valor percebido)**
   - Resolve UM problema imediato e gera resultado rápido (quick win) em 3-7 dias.
   - Cria a crença de que "isso funciona pra mim" e expõe a lacuna que só o produto pago fecha.
   - Formatos: e-book/checklist + mini-vídeo + planner de 7 dias.

2. **Pago (Produto Core — 100% do conteúdo completo)**
   - Entrega o sistema completo: protocolo passo a passo, cardápios, templates, calculadoras, comunidade/suporte.
   - Sempre com bônus de "atalho" (ex: planilha, receitas prontas) para reduzir fricção de implementação.

3. **Straight Line Persuasion (Jordan Belfort adaptado a copy)**
   - Abertura com rapport (dor validada) → certeza no PRODUTO → certeza na PESSOA/AUTORIDADE → certeza na EMPRESA/MÉTODO → eliminar as 3 principais objeções (dinheiro, tempo, "já tentei de tudo") → tie-down + CTA único.

## 📁 Estrutura de arquivos

- `01-pos-40-menopausa.md` — Avatar, oferta, LP, copy, e-mails, ads, keywords
- `02-pos-parto.md` — idem
- `03-low-carb-pre-diabetico.md` — idem
- `funil-trafego-pago.md` — arquitetura de campanhas (Meta Ads + Google Ads), orçamento e KPIs
- `calendario-lancamento.md` — cronograma de 21 dias para os 3 produtos

## 📦 Status de produção por produto

| Produto | Isca (free) | Cardápio/módulo core (pago) | LP funcional |
|---|---|---|---|
| 🥇 Pós-40/menopausa | ✅ `produto-01-pos-40/free/` | ✅ `produto-01-pos-40/pago/cardapio-21-dias.md` | ✅ `apps/landing/produto-01-pos-40/index.html` |
| 🥈 Pós-parto | ⏳ planejado em `02-pos-parto.md`, conteúdo final não escrito | ⏳ planejado, conteúdo final não escrito | ⏳ não criada |
| 🥉 Low carb pré-diabético | ⏳ planejado em `03-low-carb-pre-diabetico.md`, conteúdo final não escrito | ⏳ planejado, conteúdo final não escrito | ⏳ não criada |

Os arquivos `01-pos-40-menopausa.md`, `02-pos-parto.md` e `03-low-carb-pre-diabetico.md` continuam sendo o **plano de copy/oferta/ads** dos 3 produtos. O conteúdo final (e-book, cardápio, LP) do produto 1 já está pronto em `produto-01-pos-40/`; os produtos 2 e 3 seguem o mesmo padrão quando forem produzidos.

## ✅ Próximos passos de implementação (ligar ao FactoryEngine)

1. Cadastrar os 3 produtos via `POST /api/products` com `type: 'course'`, usando os títulos/preços deste pacote.
2. Publicar `apps/landing/produto-01-pos-40/index.html` (ou seed do `LandingPageEngine` na FASE 2) e trocar os depoimentos placeholder por reais antes de rodar tráfego.
3. Alimentar `email_templates` com as sequências de e-mail de cada arquivo.
4. Criar campanhas espelho no Meta Ads Manager e Google Ads usando os blocos de anúncio prontos.
5. Repetir a produção de conteúdo final (isca + cardápio/módulo + LP) para os produtos 2 e 3.
