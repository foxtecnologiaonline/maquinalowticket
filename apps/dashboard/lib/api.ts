const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string> | undefined) || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(response.status, body.error || `Request failed (${response.status})`);
  }
  return body.data as T;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

/**
 * The API returns raw Postgres rows (snake_case) for products/reports/
 * recommendations, not the camelCase shapes in @maquinalowticket/shared-types.
 * These interfaces describe what actually comes back over the wire.
 */
export interface ProductRow {
  id: string;
  title: string;
  type: string;
  price: string;
  status: string;
  created_at: string;
}

export interface MarketingReportRow {
  id: string;
  cycle_type: 'daily' | 'weekly' | 'manual';
  summary: string;
  data_sufficient: boolean;
  created_at: string;
}

export interface MarketingRecommendationRow {
  id: string;
  action: string;
  reasoning: string;
  expected_impact: string;
  priority: number;
  reversible: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
}

export const api = {
  signup: (input: { email: string; name: string; password: string }) =>
    request<AuthResult>('/api/auth/signup', { method: 'POST', body: JSON.stringify(input) }),

  signin: (input: { email: string; password: string }) =>
    request<AuthResult>('/api/auth/signin', { method: 'POST', body: JSON.stringify(input) }),

  me: (token: string) => request<AuthUser>('/api/auth/me', {}, token),

  listProducts: (token: string) => request<ProductRow[]>('/api/products', {}, token),

  createProduct: (
    token: string,
    input: {
      type: string;
      title: string;
      description: string;
      price: number;
      category: string;
      templateId: string;
      aiGenerate: boolean;
      automations: string[];
    }
  ) => request<{ productId: string; landingPageUrl: string }>('/api/products', { method: 'POST', body: JSON.stringify(input) }, token),

  listReports: (token: string) => request<MarketingReportRow[]>('/api/marketing/reports', {}, token),

  runMarketingCycle: (token: string) =>
    request<MarketingReportRow>('/api/marketing/run', { method: 'POST' }, token),

  listRecommendations: (token: string, status?: string) =>
    request<MarketingRecommendationRow[]>(
      `/api/marketing/recommendations${status ? `?status=${status}` : ''}`,
      {},
      token
    ),

  approveRecommendation: (token: string, id: string) =>
    request<MarketingRecommendationRow>(`/api/marketing/recommendations/${id}/approve`, { method: 'POST' }, token),

  rejectRecommendation: (token: string, id: string) =>
    request<MarketingRecommendationRow>(`/api/marketing/recommendations/${id}/reject`, { method: 'POST' }, token),
};
