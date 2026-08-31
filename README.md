# 🏭 Máquina Low Ticket - Full Factory Escalável

Uma plataforma completa para criar, automatizar e escalar produtos de baixo ticket (R$ 29 a R$ 997) com velocidade industrial.

## 📋 Visão Geral

A **Máquina Low Ticket** é uma factory automation que transforma o processo de criação de produtos em uma operação altamente eficiente. Com arquitetura modular, templates reutilizáveis e automações inteligentes, você consegue lançar 1-2 produtos por semana.

### Tipos de Produtos Suportados
- 📚 **Cursos**: Cursos online, treinamentos, certificações
- 📄 **Conteúdo**: E-books, guias, artigos, PLR
- 🛠️ **Templates**: Planilhas, frameworks, kits
- 💼 **Serviços**: Auditorias, consultoria, análises

## 🎯 Arquitetura

```
┌─────────────────────────────────────────────────────┐
│         ADMIN FACTORY DASHBOARD (Next.js)          │
│  Product Builder | Templates | Automations | Stats │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│      PRODUCT FACTORY ENGINE (Node.js/TS)           │
│  Input Validation → Template Selection →            │
│  Content Generation → Landing Page → Deploy         │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│          DELIVERY & AUTOMATION LAYER                │
│  Landing Pages | Email Funnels | Payments | Storage │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│      DATABASE & INTELLIGENCE (PostgreSQL)          │
│  Analytics | Product Performance | Tracking         │
└─────────────────────────────────────────────────────┘
```

## 📦 Stack Tecnológico

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Query** - Data Fetching
- **Zustand** - State Management

### Backend
- **Node.js 20+** - Runtime
- **Express.js** - API Framework
- **PostgreSQL** - Database
- **Redis** - Caching & Queues
- **Bull** - Job Processing

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel/Railway** - Deployment

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+
- pnpm 8+
- PostgreSQL 14+
- Docker (opcional)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/foxtecnologiaonline/maquinalowticket.git
cd maquinalowticket

# Instale dependências
pnpm install

# Setup do banco de dados
createdb maquinalowticket
psql maquinalowticket < packages/database/schema.sql

# Configure variáveis de ambiente
cp .env.example .env.local

# Inicie o desenvolvimento
pnpm dev
```

### Usando Docker

```bash
# Inicie todos os serviços
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Parar
docker-compose down
```

### Acessar

- **Dashboard**: http://localhost:3000
- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📂 Estrutura de Arquivos

```
maquinalowticket/
├── apps/
│   ├── api/                 # Backend API
│   │   ├── src/
│   │   │   ├── services/   # FactoryEngine, Database
│   │   │   ├── routes/     # API endpoints
│   │   │   ├── middlewares/# Auth, Logging
│   │   │   └── index.ts    # Entry point
│   │   └── Dockerfile
│   │
│   ├── dashboard/           # Admin dashboard
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities
│   │   └── Dockerfile
│   │
│   └── landing/            # Landing page templates
│
├── packages/
│   ├── shared-types/       # TypeScript types
│   ├── database/           # Schema & migrations
│   └── utils/              # Shared utilities
│
├── docker-compose.yml
├── pnpm-workspace.yaml
└── README.md
```

## 🔄 Fluxo de Criação de Produto

1. **Admin acessa o Dashboard**
2. **Clica em "Criar Novo Produto"**
3. **Seleciona tipo** (Curso, Template, Conteúdo, Serviço)
4. **Escolhe template da biblioteca**
5. **Preenche dados básicos** (título, descrição, preço)
6. **Ativa automações** (emails, upsells, etc)
7. **Clica Publicar**
8. **Sistema automaticamente:**
   - Gera landing page
   - Cria funnel de email
   - Setup de pagamento
   - Ativa analytics
   - Faz deploy
9. **Produto LIVE em minutos!** 🎉

## 🏗️ Fases de Desenvolvimento

### ✅ FASE 1: Foundation (CONCLUÍDA)
- Monorepo estruturado
- Database schema
- Auth system base
- API skeleton
- Dashboard skeleton

### 🔄 FASE 2: Factory Core (PRÓXIMA)
- [ ] Product Builder form
- [ ] Template Library CRUD
- [ ] Factory Engine optimization
- [ ] Landing page generator

### 📋 FASE 3: Automation
- [ ] Workflow builder (visual)
- [ ] Email automation
- [ ] Payment integration (Stripe)
- [ ] Content delivery

### 📊 FASE 4: Analytics & Polish
- [ ] Real-time dashboard
- [ ] Performance metrics
- [ ] Optimization engine
- [ ] Documentation

### 🚀 FASE 5: Deployment & Scale
- [ ] Docker setup completo
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Monitoring

## 📚 API Endpoints

### Products
```
POST   /api/products              # Criar produto
GET    /api/products              # Listar produtos
GET    /api/products/:id          # Obter produto
PUT    /api/products/:id          # Atualizar
DELETE /api/products/:id          # Arquivar
```

### Templates
```
GET    /api/templates             # Listar templates
POST   /api/templates             # Criar template
```

### Analytics
```
GET    /api/products/:id/analytics  # Métricas
POST   /api/products/:id/track      # Track events
```

## 🔑 Environment Variables

```
DATABASE_URL=postgresql://user:pass@localhost/maquinalowticket
SUPABASE_URL=https://...
SUPABASE_KEY=...
JWT_SECRET=your-secret-key
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

## 🧪 Testing

```bash
# Rodar testes
pnpm test

# Teste com coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## 📖 Documentação

- [API Documentation](./docs/API.md)
- [Database Schema](./packages/database/schema.sql)
- [Architecture Plan](./plans/harmonic-discovering-bumblebee.md)

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/sua-feature`
2. Commit: `git commit -m "Add: sua feature"`
3. Push: `git push origin feature/sua-feature`
4. Abra PR

## 📝 Licença

Propriedade de Fox Tecnologia Online

## 📞 Suporte

- Email: frattari@gmail.com
- Issues: https://github.com/foxtecnologiaonline/maquinalowticket/issues

---

**Desenvolvido com ❤️ por Claude Code**
