# 🏭 Máquina Low Ticket - Documentação do Projeto

## Sobre Este Projeto

A **Máquina Low Ticket** é uma full-stack application para criar, automatizar e escalar produtos de baixo ticket (R$ 29 a R$ 997) com velocidade industrial. É uma "factory" que transforma o processo de criação de produtos em uma operação altamente eficiente.

**Criado em**: 31 de agosto de 2026
**Stack**: Next.js + Node.js + PostgreSQL + TypeScript
**Modelo**: C (Full Factory Escalável)

## 🏗️ Arquitetura

### Camadas

1. **Admin Dashboard** (Next.js)
   - Interface para criar/gerenciar produtos
   - Template library manager
   - Workflow builder
   - Analytics em tempo real

2. **Factory Engine** (Node.js TypeScript)
   - `FactoryEngine.ts`: Core logic para criação de produtos
   - `database.ts`: Connection pool PostgreSQL
   - Automação de workflows e landing pages

3. **Delivery Layer**
   - Landing page generator automático
   - Email funnels
   - Payment integration (Stripe - ready)
   - Storage (S3/Supabase)

4. **Data Layer**
   - PostgreSQL com schema completo
   - Real-time analytics
   - Product performance tracking

### Estrutura de Diretórios

```
maquinalowticket/
├── apps/
│   ├── api/                  # Backend Express.js
│   │   ├── src/
│   │   │   ├── services/    # FactoryEngine, Database
│   │   │   ├── routes/      # API endpoints (products, templates, etc)
│   │   │   ├── middlewares/ # Auth JWT
│   │   │   └── index.ts     # Server entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   ├── dashboard/           # Frontend Next.js
│   │   ├── app/            # Pages e layouts
│   │   ├── components/     # React components (será expandido)
│   │   ├── lib/            # Utilities e hooks
│   │   └── public/         # Static assets
│   │
│   └── landing/            # Landing pages templates (future)
│
├── packages/
│   ├── shared-types/       # TypeScript types compartilhadas
│   │   ├── product.ts      # Product, ProductFactoryInput, etc
│   │   ├── template.ts     # Template, Automation, etc
│   │   └── user.ts         # User, AuthPayload, etc
│   │
│   ├── database/           # Schema SQL
│   │   └── schema.sql      # 8 tabelas principais
│   │
│   └── utils/              # Shared utilities
│       └── validators.ts   # Email, UUID, Slug validation
│
├── docker-compose.yml      # PostgreSQL + Redis + API + Dashboard
├── turbo.json             # Monorepo build config
├── tsconfig.json          # Root TS config
├── package.json           # Root dependencies
├── pnpm-workspace.yaml    # pnpm workspaces
└── CLAUDE.md              # This file

```

## 🔄 Core Workflows

### Product Creation Flow

```
User Input (ProductFactoryInput)
  ↓
Input Validation
  ↓
Template Selection
  ↓
Database Insert
  ↓
Landing Page Generation
  ↓
Automation Setup
  ↓
Email Sequences
  ↓
Analytics Activation
  ↓
Product Published
  ↓
Return: ProductFactoryOutput
```

### FactoryEngine.ts - Main Entry Point

**Método Principal**: `createProduct(userId, input)`

```typescript
async createProduct(userId: string, input: ProductFactoryInput): Promise<ProductFactoryOutput>
```

**Input**:
```typescript
{
  type: 'course' | 'template' | 'content' | 'service',
  title: string,
  description: string,
  price: number,
  category: string,
  templateId: string,
  aiGenerate: boolean,
  automations: string[]
}
```

**Output**:
```typescript
{
  productId: string,
  landingPageUrl: string,
  funnelSetup: boolean,
  analyticsActive: boolean
}
```

**Métodos Privados**:
- `validateInputs()` - Validação de dados
- `setupLandingPage()` - Gera página de venda
- `setupAutomations()` - Configura workflows
- `setupEmailSequences()` - Cria funil de email
- `activateAnalytics()` - Ativa tracking

## 🗄️ Database Schema

### Tabelas Principais

1. **users** - Usuários do sistema
2. **products** - Produtos criados
3. **templates** - Templates reutilizáveis
4. **analytics** - Métricas de produtos
5. **automations** - Workflows automáticos
6. **email_templates** - Sequências de email
7. **landing_pages** - Landing pages geradas
8. **orders** - Pagamentos e pedidos

### Índices Importantes

- `idx_products_user` - Queries por usuário
- `idx_products_status` - Filtro por status
- `idx_analytics_product` - Analytics por produto
- `idx_orders_created` - Ordenação temporal

## 🔑 Key Technologies

### Frontend
- **Next.js 14** - React Framework com SSR
- **React 19** - UI Library
- **Tailwind CSS** - Styling
- **React Query** - Data fetching (ready to use)
- **Zustand** - State management (ready to use)

### Backend
- **Express.js** - HTTP Server
- **PostgreSQL** - Database
- **Redis** - Caching & Queues (ready)
- **Bull** - Job processing (ready)
- **JWT** - Authentication
- **pg pool** - Connection pooling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local development
- **Turbo** - Build orchestration
- **pnpm** - Package manager

## 🚀 Development Commands

### Setup
```bash
pnpm install              # Install all dependencies
pnpm dev                  # Start all apps in dev mode
pnpm build                # Build all apps
```

### Individual Apps
```bash
cd apps/api && pnpm dev   # Start API only
cd apps/dashboard && pnpm dev  # Start Dashboard only
```

### Database
```bash
psql maquinalowticket < packages/database/schema.sql  # Initialize schema
```

### Docker
```bash
docker-compose up        # Start all services
docker-compose logs -f   # View logs
docker-compose down      # Stop all services
```

## 📝 Environment Variables

**Required in .env.local**:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/maquinalowticket
JWT_SECRET=your-min-32-char-secret-key
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Optional**:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
OPENAI_API_KEY=sk_...
```

## 🔐 Authentication

- **Method**: JWT (Bearer Token)
- **Flow**: Login → JWT Token → Include in Authorization header
- **Middleware**: `authMiddleware` in apps/api/src/middlewares/auth.ts
- **Protected Routes**: All /api/products endpoints require auth

## 📊 API Endpoints (FASE 1)

```
POST   /api/auth/signup        Cria conta (sempre role 'owner' — sem fluxo multi-tenant ainda)
POST   /api/auth/signin        Login, retorna { user, token, refreshToken }
GET    /api/auth/me            Retorna o usuário do token atual (útil para testar o login)
POST   /api/products           Create product via factory
GET    /api/products           List user's products
GET    /api/products/:id       Get specific product
PUT    /api/products/:id       Update product
DELETE /api/products/:id       Archive product
```

**Seed de templates**: `packages/database/seed.sql` cria 4 templates ativos (um por tipo:
course/template/content/service) com UUIDs fixos (`00000000-0000-0000-0000-00000000000{1..4}`),
necessários para `POST /api/products` funcionar em um banco novo. Aplicado automaticamente
pelo `docker-compose up` (montado como `02-seed.sql`) ou manualmente via
`pnpm --filter @maquinalowticket/database seed`.

## 🤖 Marketing Agent (Autônomo — analisa e recomenda, não executa gasto)

Serviço `apps/api/src/services/MarketingAgent.ts` que roda ciclos de análise (manual ou
agendado via cron) sobre `products`, `orders`, `analytics` e `landing_pages` de um usuário,
usando um LLM (OpenAI) com schema de resposta versionado e validado. Gera um
`marketing_report` + `marketing_recommendations`, envia um resumo por e-mail (Resend), e
fica disponível no dashboard.

**Modelo de autonomia**: o agente analisa e recomenda; toda ação com custo real (tráfego
pago, publicação) exige aprovação humana explícita via
`POST /api/marketing/recommendations/:id/approve`. Nenhuma execução automática de gasto ou
publicação existe nesta versão — está em **modo planejamento**, pois as integrações reais
(Meta Ads, Google Ads, redes sociais) ainda não estão conectadas.

```
POST   /api/marketing/run                          Roda um ciclo de análise agora
GET    /api/marketing/reports                       Lista relatórios do usuário
GET    /api/marketing/reports/:id                    Relatório + recomendações
GET    /api/marketing/recommendations?status=pending Lista recomendações
POST   /api/marketing/recommendations/:id/approve    Aprova recomendação (registra decisão)
POST   /api/marketing/recommendations/:id/reject     Rejeita recomendação
```

**Execução autônoma agendada**: controlada por `MARKETING_AGENT_ENABLED=true` e
`MARKETING_AGENT_CRON` (padrão diário 08:00). Quando ativo, roda um ciclo por usuário ativo
e envia relatório por e-mail automaticamente — falha em um usuário não interrompe os demais.

**Tabelas**: `marketing_reports`, `marketing_recommendations` (ver
`packages/database/schema.sql`). Decisões de aprovação/rejeição também são gravadas em
`audit_logs` para rastreabilidade.

**Limitação conhecida**: requer `OPENAI_API_KEY` configurada; sem ela, o ciclo persiste um
relatório de fallback com `data_sufficient=false` em vez de falhar silenciosamente ou
inventar dados.

## 🧪 Testing Strategy (Ready for FASE 2)

- **Unit Tests**: vitest in each app
- **E2E Tests**: Playwright (setup ready)
- **Coverage Target**: 80%+

## 📋 Development Phases

### ✅ FASE 1: Foundation (COMPLETED)
- [x] Monorepo initialization
- [x] Database schema creation
- [x] TypeScript configuration
- [x] API skeleton with Express
- [x] FactoryEngine core service
- [x] Dashboard skeleton with Next.js
- [x] Docker Compose setup
- [x] Git repository initialization

### 🔄 FASE 2: Factory Core (NEXT)
- [x] Product Builder form component (`apps/dashboard/app/products/page.tsx`, formulário simples)
- [ ] Template Library CRUD UI (hoje o dashboard só lista os 4 templates fixos do seed)
- [ ] FactoryEngine optimization
- [ ] Landing page template engine
- [x] Template selection interface (dropdown com os templates seedados)
- [x] Basic form validation (validação nativa HTML5 + erros da API exibidos)

### 📋 FASE 3: Automation (AFTER FASE 2)
- [ ] Workflow builder (visual interface)
- [x] Email automation service (Resend integration via `EmailService.ts`, usado hoje para relatórios do Marketing Agent)
- [ ] Stripe payment integration
- [ ] File delivery system
- [ ] Webhook handling
- [x] Marketing Agent autônomo (análise + recomendações; ver seção "🤖 Marketing Agent")

### 📊 FASE 4: Analytics & Polish (AFTER FASE 3)
- [ ] Real-time dashboard
- [ ] Product metrics
- [ ] Performance optimization
- [ ] Documentation expansion
- [ ] Error handling improvements

### 🚀 FASE 5: Deployment & Scale (FINAL)
- [ ] Production Docker setup
- [ ] GitHub Actions CI/CD
- [ ] Vercel frontend deployment
- [ ] Railway backend deployment
- [ ] Monitoring & alerting

## 🎯 Next Steps for FASE 2

1. **Create Product Builder Component**
   - File: `apps/dashboard/components/ProductBuilder.tsx`
   - Features: Form with all ProductFactoryInput fields
   - Validation: Integrate validators from packages/utils

2. **Template CRUD Endpoints**
   - File: `apps/api/src/routes/templates.ts`
   - Methods: GET (list), POST (create), PUT (update), DELETE (archive)

3. **Landing Page Generator**
   - File: `apps/api/src/services/LandingPageEngine.ts`
   - Features: Dynamic section generation based on template

4. **Dashboard Product List Page**
   - File: `apps/dashboard/app/products/page.tsx`
   - Features: Table with products, filters by status, quick actions
   - Status: lista simples pronta; faltam filtros por status e ações rápidas (editar/arquivar)

## 🖥️ Dashboard (Next.js) — o que já existe

`apps/dashboard` tem autenticação e as duas telas funcionais que consomem a API real:

- `app/login/page.tsx` — login/cadastro (alterna entre os dois modos), guarda token em `localStorage`
- `app/products/page.tsx` — formulário de criação (template fixo do seed + preço/título/descrição/categoria) e lista dos produtos do usuário
- `app/marketing/page.tsx` — botão "Rodar ciclo agora", lista de relatórios e painel de recomendações pendentes com Aprovar/Rejeitar
- `lib/api.ts` — cliente HTTP central; `lib/auth-context.tsx` — sessão via Context API + `localStorage` (sem Zustand/react-query para auth, só para cache de dados)
- Rotas protegidas redirecionam para `/login` se não houver sessão (`useRequireAuth`)

**Validado de ponta a ponta com Playwright real** (não é só leitura de código): cadastro →
login → criação de produto com o template seedado → execução de ciclo do Marketing Agent,
tudo pela UI, no navegador, contra API e Postgres reais.

**Bugs pré-existentes corrigidos para o dashboard sequer compilar**: `next.config.js`,
`postcss.config.js` e `tailwind.config.js` usavam `module.exports` (CommonJS) enquanto
`package.json` declara `"type": "module"` — o Node tratava esses arquivos como ES Module e
quebrava com `ReferenceError: module is not defined`. Convertidos para `export default`.
Também corrigido `.gitignore`: os padrões `/dist`, `/.next`, `/build` (com barra inicial)
só ignoravam esses diretórios na raiz do repo, não dentro de `apps/*` — corrigido para
`dist/`, `.next/`, `build/` (sem âncora), já que é um monorepo.

## 📚 Code Quality Standards

- **TypeScript**: Strict mode enabled globally
- **Formatting**: Prettier (configured in root)
- **Linting**: ESLint (ready to configure)
- **Commit Messages**: Conventional commits format

## 🐛 Known Limitations / TODO

- [ ] Email service integration (Resend/SendGrid)
- [ ] Payment processing (Stripe)
- [ ] File storage (S3/Supabase Storage)
- [ ] Real-time updates (Socket.io)
- [ ] AI content generation (OpenAI)
- [ ] Rate limiting on API
- [ ] Request validation middleware
- [ ] Error handling standardization

## 📖 Documentation References

- **API Routes**: apps/api/src/routes/
- **Schema**: packages/database/schema.sql
- **Types**: packages/shared-types/
- **Plan**: /root/.claude/plans/harmonic-discovering-bumblebee.md

## 🤝 Development Principles

1. **Keep It Simple**: Start with MVP, add features incrementally
2. **Reusability**: Use templates and shared packages
3. **Type Safety**: Leverage TypeScript strict mode
4. **Performance**: Optimize for speed (target < 3s load time)
5. **Scalability**: Design for 1-2 products/week throughput

## 📞 Contact

- **Owner**: frattari@gmail.com
- **Repository**: https://github.com/foxtecnologiaonline/maquinalowticket
- **Current Branch**: claude/low-ticket-product-factory-234e8q

---

**Last Updated**: 31 de agosto de 2026
**Maintainer**: Claude Code (AI)
