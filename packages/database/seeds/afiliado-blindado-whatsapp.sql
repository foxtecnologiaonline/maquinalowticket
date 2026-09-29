-- Seed: primeiro template real da fábrica (nicho #1 do playbook — afiliados via WhatsApp/Instagram)
-- Conteúdo completo em docs/products/afiliado-blindado-whatsapp/
-- Rodar após schema.sql: psql $DATABASE_URL -f packages/database/seeds/afiliado-blindado-whatsapp.sql

INSERT INTO templates (
  id, name, description, type, category, content, automations, email_sequence, pricing_rules, refund_policy, featured, active
) VALUES (
  uuid_generate_v4(),
  'Afiliado Blindado — WhatsApp/Instagram sem verba',
  'Template de curso low-ticket ensinando o sistema de aquecimento de contatos (frio/morno/quente) para afiliados venderem via WhatsApp e Instagram sem tráfego pago.',
  'course',
  'afiliados',
  '{
    "free_modules": [
      "01-conteudo-free.md#modulo-1",
      "01-conteudo-free.md#modulo-2",
      "01-conteudo-free.md#modulo-3"
    ],
    "paid_modules": [
      "02-conteudo-pago.md#modulo-4",
      "02-conteudo-pago.md#modulo-5",
      "02-conteudo-pago.md#modulo-6"
    ],
    "bonuses": [
      "Banco de 60 artes editáveis (Stories/Feed)",
      "Planilha de controle de comissões e follow-up",
      "Grupo de suporte no WhatsApp por 30 dias"
    ],
    "hero_section": {
      "headline": "Faça sua primeira venda como afiliado em até 7 dias — mesmo sem aparecer e sem gastar 1 real em anúncio",
      "subheadline": "Para quem tem WhatsApp e Instagram e nunca conseguiu vender como afiliado por achar que precisa de tráfego pago.",
      "ctaText": "Quero garantir meu acesso"
    },
    "benefits_section": [
      "Sistema dos 3 estágios de contato (frio, morno, quente)",
      "30+ scripts prontos de abordagem, qualificação e fechamento",
      "Sua primeira mensagem de venda pronta pra mandar hoje",
      "Automação leve com etiquetas e respostas rápidas",
      "Calendário de 30 dias de conteúdo pronto",
      "Banco de 60 artes editáveis + planilha de comissões"
    ]
  }'::jsonb,
  ARRAY[
    '{
      "id": "aquecimento_3_dias",
      "name": "Sequência de aquecimento 3 dias",
      "trigger_type": "lead_capture",
      "trigger_config": {"source": "isca_free"},
      "actions": [
        {"type": "email", "config": {"template": "email_1_boas_vindas"}},
        {"type": "email", "config": {"template": "email_2_prova_social", "delayMinutes": 2880}},
        {"type": "email", "config": {"template": "email_3_oferta", "delayMinutes": 5760}}
      ]
    }'::jsonb,
    '{
      "id": "carrinho_abandonado",
      "name": "Recuperação de carrinho abandonado",
      "trigger_type": "checkout_abandoned",
      "trigger_config": {"delayMinutes": 60},
      "actions": [
        {"type": "email", "config": {"template": "email_recuperacao_garantia"}}
      ]
    }'::jsonb
  ],
  '{
    "subject": "Sequência de aquecimento — Afiliado Blindado",
    "sequence": [
      {
        "order": 0,
        "delayMinutes": 0,
        "subject": "Seu primeiro passo pra vender como afiliado (sem gastar nada)",
        "htmlContent": "<p>Oi! Aqui está seu conteúdo do Módulo 1 — por que você não precisa de anúncio pra vender. Assista/leia e já aplique o checklist de escolha de produto.</p>",
        "textContent": "Aqui está seu conteúdo do Módulo 1 — por que você não precisa de anúncio pra vender."
      },
      {
        "order": 1,
        "delayMinutes": 2880,
        "subject": "O erro que trava 90% dos afiliados iniciantes",
        "htmlContent": "<p>Módulo 2 liberado: como montar sua vitrine sem aparecer. Além disso, veja como outros alunos já estão aplicando os scripts.</p>",
        "textContent": "Módulo 2 liberado: como montar sua vitrine sem aparecer."
      },
      {
        "order": 2,
        "delayMinutes": 5760,
        "subject": "Seus primeiros scripts (e o que falta pra fechar sua 1ª venda)",
        "htmlContent": "<p>Módulo 3 liberado com os primeiros scripts reais. Quando terminar, conheça o Afiliado Blindado completo com os 30+ scripts e a automação: [link da oferta].</p>",
        "textContent": "Módulo 3 liberado. Conheça o Afiliado Blindado completo: [link da oferta]."
      }
    ]
  }'::jsonb,
  '[{"condition": "default", "price": 47.00, "currency": "BRL"}]'::jsonb,
  'Garantia incondicional de 7 dias — reembolso total sem perguntas.',
  true,
  true
);
