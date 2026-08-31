export type TemplateType = 'course' | 'template' | 'content' | 'service';

export interface Template {
  id: string;
  name: string;
  description?: string;
  type: TemplateType;
  category?: string;
  content: Record<string, any>;
  automations?: Automation[];
  emailSequence?: EmailSequence;
  pricingRules?: PricingRule[];
  upsellLogic?: UpsellConfig;
  refundPolicy?: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Automation {
  id: string;
  name: string;
  triggerType: string;
  triggerConfig?: Record<string, any>;
  actions: AutomationAction[];
  active: boolean;
}

export interface AutomationAction {
  type: 'email' | 'webhook' | 'update' | 'create' | 'archive' | 'certificate';
  config: Record<string, any>;
}

export interface EmailSequence {
  subject: string;
  sequence: EmailStep[];
}

export interface EmailStep {
  order: number;
  delayMinutes: number;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface PricingRule {
  condition: string;
  price: number;
  currency?: string;
}

export interface UpsellConfig {
  enabled: boolean;
  products?: string[];
  timing?: 'immediate' | 'delayed';
  delayMinutes?: number;
}
