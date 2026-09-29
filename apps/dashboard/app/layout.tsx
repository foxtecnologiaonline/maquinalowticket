import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Nav } from '../components/Nav';

export const metadata: Metadata = {
  title: 'Máquina Low Ticket - Factory Dashboard',
  description: 'Create and manage low-ticket products at scale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Providers>
          <div className="min-h-screen">
            <Nav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
