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

| # | Produto | Preço | Order Bump | OTO | Por quê |
|---|---------|-------|------------|-----|---------|
| 🥇 | [Adestramento de Filhotes](./01-adestramento-de-filhotes.md) | R$47 | +R$27 | R$97 | Momento de maior ansiedade do tutor = maior disposição a pagar. Compra por impulso, decisão em <48h. |
| 🥈 | [Nutrição Caseira para Cães](./02-nutricao-caseira-caes.md) | R$37 | +R$19 | R$67 | Tendência de humanização pet crescendo ~20%a.a. Baixo custo de produção de conteúdo, alta percepção de valor (saúde = medo de perder o pet). |
| 🥉 | [Cuidados com Pets Idosos](./03-cuidados-pets-idosos.md) | R$47 | +R$27 | R$97 | Nicho fiel, pouco explorado, tutor com maior poder aquisitivo médio (pet já é "membro da família" há anos) e menos concorrência de anúncio. |

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
