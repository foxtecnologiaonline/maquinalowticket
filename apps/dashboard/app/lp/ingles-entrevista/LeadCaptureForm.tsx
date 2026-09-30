'use client';

import { useState } from 'react';

const PDF_URL = '/downloads/kit-20-frases-entrevista-ingles.pdf';
const PRODUCT_SLUG = 'ingles-entrevista-curriculo';

export default function LeadCaptureForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, productSlug: PRODUCT_SLUG }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível enviar seus dados agora.');
      }

      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado.');
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center">
        <p className="text-emerald-800 font-semibold mb-3">
          Prontinho! Seu Kit de Sobrevivência está pronto para download.
        </p>
        <a
          href={PDF_URL}
          download
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          BAIXAR PDF AGORA →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Seu nome
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Como podemos te chamar?"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Seu melhor e-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="voce@email.com"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
      >
        {status === 'loading' ? 'Enviando...' : 'QUERO O KIT GRÁTIS →'}
      </button>
      <p className="text-xs text-slate-400 text-center">
        Sem spam. Você recebe o PDF na hora e pode cancelar quando quiser.
      </p>
    </form>
  );
}
