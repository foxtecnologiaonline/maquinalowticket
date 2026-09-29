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

| # | Produto | Preço sugerido | Por quê |
|---|---------|-----------------|---------|
| 🥇 | [Adestramento de Filhotes](./01-adestramento-de-filhotes.md) | R$47 (bump R$97) | Momento de maior ansiedade do tutor = maior disposição a pagar. Compra por impulso, decisão em <48h. |
| 🥈 | [Nutrição Caseira para Cães](./02-nutricao-caseira-caes.md) | R$37 (bump R$67) | Tendência de humanização pet crescendo ~20%a.a. Baixo custo de produção de conteúdo, alta percepção de valor (saúde = medo de perder o pet). |
| 🥉 | [Cuidados com Pets Idosos](./03-cuidados-pets-idosos.md) | R$47 (bump R$97) | Nicho fiel, pouco explorado, tutor com maior poder aquisitivo médio (pet já é "membro da família" há anos) e menos concorrência de anúncio. |

## Como usar com a FactoryEngine

Cada playbook já está formatado para virar um `ProductFactoryInput`:

```typescript
{
  type: 'course',
  title: '<ver seção "Nome do Produto">',
  description: '<ver seção "Promessa Central">',
  price: <ver tabela acima>,
  category: 'pets',
  templateId: 'low-ticket-vsl-lp',
  aiGenerate: true,
  automations: ['email-sequence-7d', 'order-bump', 'abandoned-cart']
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
