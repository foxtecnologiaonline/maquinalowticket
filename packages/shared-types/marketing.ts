export type MarketingCycleType = 'daily' | 'weekly' | 'manual';
export type RecommendationStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type RecommendationPriority = 1 | 2 | 3 | 4 | 5;

export interface MarketingMetrics {
  cac?: number;
  roas?: number;
  conversionRate?: number;
  ltvEstimate?: number;
  revenueTotal?: number;
  ordersCount?: number;
}

export interface MarketingRecommendation {
  id: string;
  reportId: string;
  userId: string;
  action: string;
  reasoning: string;
  expectedImpact: string;
  priority: RecommendationPriority;
  reversible: boolean;
  status: RecommendationStatus;
  createdAt: Date;
  decidedAt?: Date;
  decidedBy?: string;
}

export interface MarketingReport {
  id: string;
  userId: string;
  cycleType: MarketingCycleType;
  summary: string;
  metrics: MarketingMetrics;
  anomalies: string[];
  dataSufficient: boolean;
  emailSentAt?: Date;
  createdAt: Date;
}

export interface MarketingReportWithRecommendations extends MarketingReport {
  recommendations: MarketingRecommendation[];
}

/** Shape the agent's LLM call must return (schema_version guards silent breakage). */
export interface MarketingAgentLLMResponse {
  schema_version: 1;
  summary: string;
  data_sufficient: boolean;
  missing_data?: string[];
  metrics: MarketingMetrics;
  anomalies: string[];
  recommendations: Array<{
    action: string;
    reasoning: string;
    expected_impact: string;
    priority: RecommendationPriority;
    reversible: boolean;
  }>;
}
