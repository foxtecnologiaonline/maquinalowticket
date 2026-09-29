import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🏭 Máquina Low Ticket
        </h1>

        <p className="text-xl text-gray-300 mb-6">
          A Full Factory para criar produtos de baixo ticket em minutos, não em semanas.
        </p>

        <Link
          href="/login"
          className="inline-block mb-8 bg-blue-600 hover:bg-blue-500 no-underline text-white rounded px-6 py-3 font-medium"
        >
          Entrar / Criar conta
        </Link>

        <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Funcionalidades</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-bold mb-2">Factory Engine</h3>
              <p className="text-sm text-gray-300">
                Recebe inputs estruturados e gera produtos completos automaticamente
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold mb-2">Template Library</h3>
              <p className="text-sm text-gray-300">
                Cursos, templates, conteúdo e serviços reutilizáveis
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="font-bold mb-2">Automation Engine</h3>
              <p className="text-sm text-gray-300">
                Workflows automáticos: emails, upsells, certificados
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-bold mb-2">Analytics Real-time</h3>
              <p className="text-sm text-gray-300">
                Métricas detalhadas de cada produto em tempo real
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-left">
          <h3 className="font-bold text-lg mb-4">📋 Status da Implementação</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Monorepo estruturado (pnpm workspaces)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Schema PostgreSQL completo</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Factory Engine Core (FactoryEngine.ts)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>API com autenticação JWT (cadastro/login funcionando)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Dashboard: login, criação de produtos, Marketing Agent</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Marketing Agent autônomo (analisa e recomenda)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">○</span>
              <span>Landing Page Generator (renderização real)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">○</span>
              <span>Payment Integration (Stripe)</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          FASE 1: Foundation — Concluída ✓
        </div>
      </div>
    </div>
  );
}
