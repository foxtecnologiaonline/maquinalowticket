# 🎯 Playbook: Metodologia Low Ticket (estilo Hotmart)

> Documento de referência estratégica para a **Máquina Low Ticket**. Define a metodologia de conteúdo/copywriting, a estrutura de LP, a estratégia de tráfego pago/Google Ads, e o backlog de nichos validados para o vertical de Finanças. Serve de input para o `FactoryEngine`, o `LandingPageEngine` (FASE 2) e o serviço de automação de email (FASE 3).

---

## 1. Metodologia Core: 60/40 (Free → Paid)

Modelo clássico de infoproduto low ticket (R$ 29–R$ 997), otimizado para conversão em funil de venda direta ("straight-line").

### 1.1 Princípio

- **60% do conteúdo é entregue de graça** (isca/lead magnet: PDF, vídeo-aula, checklist, mini-curso, desafio de N dias).
  - Deve gerar **resultado real e rápido** (quick win) para construir prova e confiança.
  - Cada peça do conteúdo grátis termina com um **gatilho de continuidade** ("isso resolve X, mas o que trava a maioria é Y — e Y está na Aula 4 do curso completo").
- **40% restante é o produto pago**: aprofundamento, templates prontos, automações, suporte, comunidade, bônus e implementação passo a passo.
  - O pago deve resolver a **objeção final**, não repetir o gratuito.
  - Regra prática: se o free ensina o "o quê" e o "por quê", o pago entrega o "como", pronto para copiar/colar.

### 1.2 Estrutura de conteúdo por produto

```
FREE (60%)                         PAID (40%)
├─ Aula/PDF 1: Diagnóstico         ├─ Módulo 4: Implementação guiada
├─ Aula/PDF 2: Método (visão geral)├─ Módulo 5: Templates/scripts prontos
├─ Aula/PDF 3: Primeiro resultado  ├─ Módulo 6: Automação/escala
└─ CTA de conversão                └─ Bônus + Comunidade/Suporte
```

### 1.3 Gatilhos mentais obrigatórios (usar em copy, LP e email)

| Gatilho | Onde usar |
|---|---|
| Escassez (vagas/tempo) | Header da LP, final de email, pop-up de saída |
| Urgência (preço sobe / oferta expira) | Countdown na LP, PS do email |
| Prova social (depoimentos, prints de resultado) | Seção dedicada na LP, meio do VSL |
| Autoridade (antes/depois do criador) | Abertura da LP, sobre o criador |
| Reciprocidade (o grátis já entrega valor real) | Todo o conteúdo 60% |
| Dor específica nomeada | Headline e primeiro parágrafo |
| Novidade/Mecanismo único | Subheadline ("o método X que ninguém te contou") |
| Garantia (7 dias incondicional) | Seção de preço, reduz risco percebido |

---

## 2. Copywriting: Sistema de Vendas em Linha Reta

Estrutura de copy condutora (straight-line persuasion) usada em toda LP/VSL/email:

1. **Hook (3s)** — dor específica + promessa de transformação.
2. **Identificação** — "se você já tentou X e Y e nada funcionou, o problema não é você".
3. **Mecanismo único** — por que os métodos tradicionais falham e por que este é diferente.
4. **Prova** — resultado do criador + depoimentos de alunos.
5. **Plano em passos** — 3 a 5 passos simples e memoráveis.
6. **Oferta** — o que está incluso, empilhamento de valor (stack), bônus.
7. **Preço ancorado** — comparar com custo do problema não resolvido / concorrentes caros.
8. **Garantia** — remove risco.
9. **Urgência/Escassez** — motivo real para agir agora.
10. **CTA repetido** — a cada 2-3 seções da página.

### 2.1 Fórmula de headline (persistir em `templates.content.copy.headlineFormula`, coluna JSONB `content` da tabela `templates`)

```
[Resultado desejado] sem [maior objeção/dor], mesmo que [maior crença limitante]
```
Exemplo: "Saia do cheque especial em 30 dias sem cortar tudo que você gosta, mesmo que você já tenha tentado de tudo."

---

## 3. Estrutura de Landing Page (para `LandingPageEngine.ts`, FASE 2)

A tabela `landing_pages` (`packages/database/schema.sql`) já define 6 colunas `JSONB`. O `LandingPageEngine` deve gerar cada uma a partir do `ProductFactoryInput` + `templates.content`, agrupando a estrutura de copy da seção 2 assim:

| Coluna JSONB (schema real) | Conteúdo de copy que ela carrega |
|---|---|
| `hero_section` | Header (headline + subheadline + CTA acima da dobra), VSL/bloco de dor-identificação, "para quem é / não é" |
| `benefits_section` | Mecanismo único, módulos do produto (o que está dentro), stack de valor |
| `pricing_section` | Preço ancorado, parcelamento, garantia, urgência/escassez |
| `testimonials_section` | Prova social (depoimentos, prints, nº de alunos) e autoridade do criador |
| `faq_section` | Objeções antecipadas (usar a lista de objeções do nicho, seção 6) |
| `cta_section` | CTA final + rodapé (suporte, termos, contato) |

CTAs intermediários (a cada 2-3 blocos, regra da seção 2) ficam embutidos dentro de `hero_section` e `benefits_section` como sub-chaves (`cta`), não como coluna própria — evita alterar o schema existente.

---

## 4. Tráfego Pago & Google Ads

### 4.1 Estrutura de campanha (Google Ads)

- **Campanha 1 — Pesquisa (Search)**: captura intenção alta (quem já busca solução).
- **Campanha 2 — Performance Max**: escala com sinais de conversão (lead magnet + compra).
- **Campanha 3 — Remarketing (Display/YouTube)**: reimpacta quem baixou o grátis mas não comprou.
- **Campanha 4 — YouTube Ads (in-stream)**: VSL curto como anúncio, direciona pro grátis.

### 4.2 Estrutura de grupo de anúncios

Um ad group por **dor específica**, não por produto genérico. Cada ad group tem:
- 3-5 keywords de cauda longa (long-tail) relacionadas à dor
- 3 anúncios responsivos testando ângulos diferentes (dor, resultado, mecanismo)
- Landing page dedicada (ou seção ancorada da LP principal)

### 4.3 Funil de tráfego

```
Anúncio (dor específica)
  → Página do grátis (60%) [captura email/WhatsApp]
  → Entrega do grátis + sequência de email (gatilhos)
  → Oferta do pago (40%) com urgência/escassez
  → Checkout
  → Remarketing para quem não comprou
```

### 4.4 Métricas-alvo (para o módulo de Analytics)

| Métrica | Meta inicial |
|---|---|
| CPL (custo por lead) | R$ 3–8 |
| Taxa de conversão LP grátis | 25-40% |
| Taxa de conversão grátis→pago | 3-8% |
| ROAS mínimo aceitável | 2.5x |
| Ticket médio | R$ 29–R$ 197 (entrada) |

---

## 5. Pesquisa de Palavras-chave (Google Keywords)

Processo por nicho:

1. Levantar dor em linguagem do cliente (fóruns, Reclame Aqui, grupos de Facebook/WhatsApp, comentários do YouTube).
2. Usar Google Keyword Planner / Ubersuggest / Answer The Public para variações de cauda longa.
3. Priorizar keywords com **intenção de solução** ("como sair do cheque especial", "planilha para MEI") sobre keywords informativas genéricas.
4. Classificar por intenção: `informacional`, `comparação`, `transacional` — focar orçamento em transacional + comparação.
5. Negativar termos de emprego/concurso/curso gratuito quando o produto é pago.

---

## 6. Backlog de Nichos — Vertical Finanças

Priorização sugerida (maior dor/urgência → maior ticket potencial):

### 🥇 1. Sair do cartão de crédito / cheque especial
- **Por quê**: dor aguda e imediata → decisão de compra rápida, baixa fricção.
- **Ângulo de copy**: "pare de pagar juros que não acabam mais" / método de 30 dias.
- **Free (60%)**: diagnóstico de dívida + planilha de renegociação + script de ligação para o banco.
- **Paid (40%)**: plano completo de quitação, automações de controle financeiro, acompanhamento.
- **Keywords**: "como sair do cheque especial", "quitar cartão de crédito rápido", "renegociar dívida banco".

### 🥈 2. Finanças para MEI / autônomo
- **Por quê**: público crescente (gig economy, autônomos pós-pandemia), pouco conteúdo de qualidade.
- **Ângulo de copy**: "organize as finanças do seu negócio em 1 hora por semana".
- **Free (60%)**: planilha de fluxo de caixa simples + checklist de separação PF/PJ.
- **Paid (40%)**: sistema completo de precificação, reserva de emergência, DAS/impostos, automação de cobrança.
- **Keywords**: "controle financeiro MEI", "planilha financeira autônomo", "como precificar serviço freelancer".

### 🥉 3. Finanças para casais
- **Por quê**: ticket pode subir (venda para 2 pessoas / plano família); dor recorrente (brigas por dinheiro).
- **Ângulo de copy**: "pare de brigar por dinheiro: o método para casais organizarem as finanças juntos".
- **Free (60%)**: teste de "perfil financeiro do casal" + guia de conversa sobre dinheiro.
- **Paid (40%)**: planejamento financeiro conjunto, metas compartilhadas, automação de divisão de contas.
- **Keywords**: "finanças para casais", "como organizar dinheiro com o parceiro", "planilha financeira casal".

---

## 7. Checklist de lançamento por produto

> Referência operacional para quem roda o lançamento; os itens de automação de fato acionáveis pelo sistema (email, remarketing, analytics) devem ser cadastrados como IDs em `ProductFactoryInput.automations: string[]` (ver `packages/shared-types/product.ts`).

- [ ] Pesquisa de dor + keywords do nicho
- [ ] Roteiro do conteúdo grátis (60%) com CTA de continuidade
- [ ] Roteiro do conteúdo pago (40%)
- [ ] Copy da LP (headline → CTA final) seguindo a linha reta (seção 2)
- [ ] LP publicada com todas as seções da seção 3
- [ ] Sequência de email (mín. 5 emails: entrega, gatilho 1, prova social, urgência, última chance)
- [ ] Campanhas Google Ads estruturadas (seção 4.1) com ad groups por dor
- [ ] Pixel/analytics configurado (LP → checkout → remarketing)
- [ ] Garantia e FAQ publicados
- [ ] Teste de checkout ponta a ponta

---

**Última atualização**: 29 de setembro de 2026
**Mantenedor**: Claude Code (AI) — a pedido de frattari@gmail.com
