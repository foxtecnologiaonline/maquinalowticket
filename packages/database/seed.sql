-- Baseline templates so the Factory Engine has something to build products
-- from on a fresh database. Fixed UUIDs so they can be referenced
-- predictably (docs, manual tests, first product creation) without a lookup.
-- Safe to re-run: ON CONFLICT (id) DO NOTHING.

INSERT INTO templates (id, name, description, type, category, content, automations, email_sequence, refund_policy, featured, active)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Curso Digital Básico',
  'Template padrão para cursos em vídeo com módulos e aulas.',
  'course',
  'education',
  '{"modules": [{"title": "Módulo 1", "lessons": []}]}',
  ARRAY['{"id": "welcome_email", "name": "E-mail de boas-vindas", "trigger_type": "purchase_completed", "trigger_config": {}, "actions": [{"type": "send_email", "template": "welcome"}]}']::jsonb[],
  '{"sequence": [{"subject": "Bem-vindo(a) ao curso!", "htmlContent": "<p>Seu acesso está liberado.</p>", "textContent": "Seu acesso está liberado.", "delayMinutes": 0}]}',
  'Garantia de 7 dias.',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000002',
  'Template Reutilizável',
  'Template padrão para produtos do tipo template (planilhas, kits, etc).',
  'template',
  'productivity',
  '{"files": []}',
  ARRAY[]::jsonb[],
  '{"sequence": [{"subject": "Seu template chegou!", "htmlContent": "<p>Baixe seu arquivo pelo link de acesso.</p>", "textContent": "Baixe seu arquivo pelo link de acesso.", "delayMinutes": 0}]}',
  'Garantia de 7 dias.',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000003',
  'Conteúdo Digital',
  'Template padrão para e-books, guias e conteúdos digitais.',
  'content',
  'ebook',
  '{"pages": 0}',
  ARRAY[]::jsonb[],
  '{"sequence": [{"subject": "Seu conteúdo está disponível", "htmlContent": "<p>Acesse seu conteúdo agora.</p>", "textContent": "Acesse seu conteúdo agora.", "delayMinutes": 0}]}',
  'Garantia de 7 dias.',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000004',
  'Serviço Sob Demanda',
  'Template padrão para serviços prestados (consultoria, revisão, etc).',
  'service',
  'consulting',
  '{"deliverables": []}',
  ARRAY[]::jsonb[],
  '{"sequence": [{"subject": "Recebemos seu pedido", "htmlContent": "<p>Entraremos em contato em breve.</p>", "textContent": "Entraremos em contato em breve.", "delayMinutes": 0}]}',
  'Sem garantia de reembolso após início do serviço.',
  false,
  true
)
ON CONFLICT (id) DO NOTHING;
