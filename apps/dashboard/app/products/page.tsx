'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError, ProductRow } from '../../lib/api';
import { useRequireAuth } from '../../lib/auth-context';

/**
 * Fixed IDs from packages/database/seed.sql — there is no GET /api/templates
 * endpoint yet, so the only templates that exist are the ones seeded there.
 */
const TEMPLATES = [
  { id: '00000000-0000-0000-0000-000000000001', type: 'course', label: 'Curso Digital Básico' },
  { id: '00000000-0000-0000-0000-000000000002', type: 'template', label: 'Template Reutilizável' },
  { id: '00000000-0000-0000-0000-000000000003', type: 'content', label: 'Conteúdo Digital' },
  { id: '00000000-0000-0000-0000-000000000004', type: 'service', label: 'Serviço Sob Demanda' },
] as const;

export default function ProductsPage() {
  const { token, isHydrated } = useRequireAuth();
  const queryClient = useQueryClient();

  const [selectedTemplate, setSelectedTemplate] = useState<string>(TEMPLATES[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('49.90');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', token],
    queryFn: () => api.listProducts(token!),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: () => {
      const template = TEMPLATES.find((t) => t.id === selectedTemplate)!;
      return api.createProduct(token!, {
        type: template.type,
        title,
        description,
        price: parseFloat(price),
        category,
        templateId: selectedTemplate,
        aiGenerate: false,
        automations: [],
      });
    },
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setCategory('');
      queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (err) => setFormError(err instanceof ApiError ? err.message : 'Falha ao criar produto'),
  });

  if (!isHydrated || !token) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    createMutation.mutate();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Produtos</h1>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="font-semibold">Criar novo produto</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Template</label>
            <select
              className="w-full px-3 py-2"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="w-full px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Título</label>
          <input
            type="text"
            className="w-full px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Descrição</label>
          <textarea
            className="w-full px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Categoria</label>
          <input
            type="text"
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        {formError && <p className="text-sm text-red-400">{formError}</p>}

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded px-4 py-2 font-medium"
        >
          {createMutation.isPending ? 'Criando...' : 'Criar produto'}
        </button>
      </form>

      <div>
        <h2 className="font-semibold mb-3">Seus produtos</h2>
        {isLoading && <p className="text-gray-400 text-sm">Carregando...</p>}
        {!isLoading && products?.length === 0 && <p className="text-gray-400 text-sm">Nenhum produto ainda.</p>}
        <div className="space-y-2">
          {products?.map((p: ProductRow) => (
            <div key={p.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-gray-400">
                {p.type} · R$ {p.price} · {p.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
