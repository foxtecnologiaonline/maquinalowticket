import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), '.data', 'leads.jsonl');

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const productSlug = typeof body?.productSlug === 'string' ? body.productSlug : 'unknown';

  if (!name || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Nome e e-mail válido são obrigatórios.' },
      { status: 400 }
    );
  }

  const lead = { name, email, productSlug, createdAt: new Date().toISOString() };

  // TODO(produção): substituir por integração real (ex: Resend/ActiveCampaign)
  // e/ou por um INSERT na tabela `products`/`analytics` via apps/api. Este
  // armazenamento local é apenas para validar o funil em desenvolvimento.
  await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf-8');

  return NextResponse.json({ ok: true });
}
