'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError, MarketingRecommendationRow, MarketingReportRow } from '../../lib/api';
import { useRequireAuth } from '../../lib/auth-context';

export default function MarketingPage() {
  const { token, isHydrated } = useRequireAuth();
  const queryClient = useQueryClient();
  const [runError, setRunError] = useState<string | null>(null);

  const { data: reports, isLoading: loadingReports } = useQuery({
    queryKey: ['marketing-reports', token],
    queryFn: () => api.listReports(token!),
    enabled: !!token,
  });

  const { data: pendingRecommendations, isLoading: loadingRecs } = useQuery({
    queryKey: ['marketing-recommendations', token],
    queryFn: () => api.listRecommendations(token!, 'pending'),
    enabled: !!token,
  });

  const runMutation = useMutation({
    mutationFn: () => api.runMarketingCycle(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-reports', token] });
      queryClient.invalidateQueries({ queryKey: ['marketing-recommendations', token] });
    },
    onError: (err) => setRunError(err instanceof ApiError ? err.message : 'Falha ao rodar ciclo'),
  });

  const decisionMutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: 'approve' | 'reject' }) =>
      decision === 'approve' ? api.approveRecommendation(token!, id) : api.rejectRecommendation(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-recommendations', token] });
    },
  });

  if (!isHydrated || !token) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Marketing Agent</h1>
          <p className="text-sm text-gray-400 mt-1">
            Analisa e recomenda — nenhuma ação com custo real é executada sem sua aprovação.
          </p>
        </div>
        <button
          onClick={() => {
            setRunError(null);
            runMutation.mutate();
          }}
          disabled={runMutation.isPending}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded px-4 py-2 font-medium shrink-0"
        >
          {runMutation.isPending ? 'Rodando ciclo...' : 'Rodar ciclo agora'}
        </button>
      </div>
      {runError && <p className="text-sm text-red-400">{runError}</p>}

      <section>
        <h2 className="font-semibold mb-3">Recomendações pendentes</h2>
        {loadingRecs && <p className="text-gray-400 text-sm">Carregando...</p>}
        {!loadingRecs && pendingRecommendations?.length === 0 && (
          <p className="text-gray-400 text-sm">Nenhuma recomendação pendente.</p>
        )}
        <div className="space-y-3">
          {pendingRecommendations?.map((r: MarketingRecommendationRow) => (
            <div key={r.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    <span className="text-xs text-blue-400 mr-2">
                      P{r.priority}
                      {!r.reversible && ' · irreversível'}
                    </span>
                    {r.action}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{r.reasoning}</p>
                  <p className="text-sm text-gray-500 mt-1">Impacto esperado: {r.expected_impact}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => decisionMutation.mutate({ id: r.id, decision: 'approve' })}
                    disabled={decisionMutation.isPending}
                    className="bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded px-3 py-1 text-sm"
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => decisionMutation.mutate({ id: r.id, decision: 'reject' })}
                    disabled={decisionMutation.isPending}
                    className="bg-red-600/80 hover:bg-red-500 disabled:opacity-50 rounded px-3 py-1 text-sm"
                  >
                    Rejeitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Relatórios</h2>
        {loadingReports && <p className="text-gray-400 text-sm">Carregando...</p>}
        {!loadingReports && reports?.length === 0 && (
          <p className="text-gray-400 text-sm">Nenhum relatório ainda. Rode um ciclo acima.</p>
        )}
        <div className="space-y-3">
          {reports?.map((r: MarketingReportRow) => (
            <div key={r.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase text-gray-500">{r.cycle_type}</span>
                <span className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString('pt-BR')}</span>
              </div>
              <p className="text-sm">{r.summary}</p>
              {!r.data_sufficient && <p className="text-xs text-yellow-500 mt-2">⚠ Dados insuficientes neste ciclo</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
