'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth-context';

export function Nav() {
  const { user, logout, isHydrated } = useAuth();

  if (!isHydrated || !user) return null;

  return (
    <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/products" className="font-bold text-white no-underline">
          🏭 Máquina Low Ticket
        </Link>
        <Link href="/products" className="text-sm text-gray-300 no-underline hover:text-white">
          Produtos
        </Link>
        <Link href="/marketing" className="text-sm text-gray-300 no-underline hover:text-white">
          Marketing
        </Link>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{user.email}</span>
        <button onClick={logout} className="text-red-400 hover:text-red-300 bg-transparent">
          Sair
        </button>
      </div>
    </nav>
  );
}
