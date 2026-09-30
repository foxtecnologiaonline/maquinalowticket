# 🐾 Nicho Pets — Playbooks de Produtos Low Ticket

Este diretório guarda os 3 playbooks completos de produtos para o nicho **Pets**,
prontos para entrar na Máquina Low Ticket (FactoryEngine → LP → Automations →
Email → Tráfego Pago). Cada playbook segue a metodologia padrão do segmento:

- **60% do conteúdo é gratuito** (isca/lead magnet ou primeiras aulas do "grátis")
  → gera confiança, autoridade e abre loops que só fecham na versão paga.
- **40% restante é pago** (a virada: solução completa, templates, suporte,
  bônus, garantia) → é o que converte a venda de R$29–R$97 (low ticket) com
  upsell possível para R$197–R$497 (order bump / OTO).
- **Copywriting em "linha reta"** (straight-line persuasion, Jordan Belfort /
  escola Hotmart): Hook → Story → Oferta → Gatilhos → Fechamento, repetido em
  cascata na LP, no VSL e nos e-mails.

## Produtos priorizados

| # | Produto | Preço | Order Bump | OTO | Playbook | Conteúdo dos módulos | LP pronta |
|---|---------|-------|------------|-----|----------|----------------------|-----------|
| 🥇 | Adestramento de Filhotes | R$47 | +R$27 | R$97 | [playbook](./01-adestramento-de-filhotes.md) | [conteúdo](./conteudo/01-adestramento-conteudo-modulos.md) | [LP (.html)](./lp/adestramento-de-filhotes.html) |
| 🥈 | Nutrição Caseira para Cães | R$37 | +R$19 | R$67 | [playbook](./02-nutricao-caseira-caes.md) | [conteúdo](./conteudo/02-nutricao-conteudo-modulos.md) | [LP (.html)](./lp/nutricao-caseira-caes.html) |
| 🥉 | Cuidados com Pets Idosos | R$47 | +R$27 | R$97 | [playbook](./03-cuidados-pets-idosos.md) | [conteúdo](./conteudo/03-idosos-conteudo-modulos.md) | [LP (.html)](./lp/cuidados-pets-idosos.html) |

**Por quê estes 3**: momento de maior ansiedade do tutor (adestramento) = maior disposição a pagar
e decisão de compra em <48h; tendência de humanização pet crescendo ~20%a.a. (nutrição), com baixo
custo de produção de conteúdo; nicho fiel e pouco explorado com tutor de maior poder aquisitivo
médio (pets idosos).

## Status de execução (atualizado nesta sessão)

- ✅ **LPs prontas**: 3 páginas HTML estáticas e autocontidas em `./lp/`, com toda a copy do
  Sistema de Linha Reta (hero, agitação, mecanismo, prova social, oferta + order bump, garantia,
  FAQ, CTA final). Abra o `.html` direto no navegador ou publique como está (Vercel/S3/Cloudflare
  Pages) — não dependem do `LandingPageEngine` do FactoryEngine, que ainda não existe no código
  (item pendente da FASE 3 no `CLAUDE.md`).
- ✅ **Conteúdo dos módulos (free + pago)**: roteiro completo, pronto para gravar em vídeo ou
  publicar como texto/PDF, em `./conteudo/`.
- ⚠️ **Integração com a FactoryEngine/DB** (produto "publicado" dentro do próprio sistema, com
  `product_id`, analytics e automações reais): ainda depende de construir a rota de Template CRUD
  e o `LandingPageEngine` (FASE 2/3). O passo a passo de seed SQL abaixo mostra como fazer isso
  manualmente enquanto essas rotas não existem.

## Como usar com a FactoryEngine

⚠️ **Atenção**: `FactoryEngine.createProduct()` (`apps/api/src/services/FactoryEngine.ts`) busca o
template com `SELECT * FROM templates WHERE id = $1 AND active = true` — ou seja, `templateId`
precisa ser o **UUID real de uma linha já existente** na tabela `templates`, e cada string do
array `automations` precisa bater com um `id` dentro do JSON `automations` **daquele template**.
Como a rota de Template CRUD (item pendente da FASE 2 no `CLAUDE.md`) ainda não existe, hoje o
template precisa ser inserido via SQL direto antes de chamar `POST /api/products`.

**Passo 1 — seed do template** (uma vez por playbook, ex.: Adestramento de Filhotes):

```sql
INSERT INTO templates (id, name, type, category, content, automations, email_sequence, active)
VALUES (
  uuid_generate_v4(),
  'Low Ticket VSL/LP — Adestramento de Filhotes',
  'course',
  'pets',
  '{"benefits": ["Protocolo anti-mordida em 72h", "7 comandos essenciais", "Bônus: rotina 30 dias"]}',
  ARRAY[
    '{"id": "order-bump", "name": "Kit de Comandos de Emergência", "trigger_type": "checkout", "actions": [{"type": "update", "config": {"addOrderBump": true}}]}'::jsonb
  ],
  '{"subject": "Bem-vindo(a)", "sequence": [{"order": 0, "delayMinutes": 0, "subject": "Aqui está seu Módulo Grátis #1", "htmlContent": "..."}]}',
  true
) RETURNING id;
```

Guarde o `id` retornado — é o `templateId` real a ser usado no passo 2.

**Passo 2 — criar o produto** (`POST /api/products`, com o UUID do passo 1):

```typescript
{
  type: 'course',
  title: 'Adestramento de Filhotes em 7 Dias',       // ver "Nome do Produto" no playbook
  description: 'Método caseiro para eliminar mordida, xixi fora do lugar e latido excessivo em 7 dias, sem gritar ou pagar por adestrador presencial.',
  price: 47,                                          // ver coluna "Preço" na tabela acima
  category: 'pets',
  templateId: '<uuid retornado no passo 1>',
  aiGenerate: true,
  automations: ['order-bump']                         // deve bater com os `id`s definidos no template
}
```

## Checklist de lançamento (por produto)

- [ ] Gravar/produzir os módulos gratuitos (60%)
- [ ] Gravar/produzir os módulos pagos (40%)
- [ ] Publicar LP com copy da seção 4 de cada playbook
- [ ] Subir sequência de e-mail (seção 5) na automação
- [ ] Criar campanha Google Ads (Pesquisa + Performance Max) com keywords da seção 6
- [ ] Criar campanha Meta Ads (Advantage+ / manual) com criativos da seção 7
- [ ] Configurar pixel/analytics e testar funil ponta a ponta
- [ ] Definir orçamento de teste (sugestão: R$30–50/dia por produto nos primeiros 7 dias)
