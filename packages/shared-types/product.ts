export type ProductType = 'course' | 'template' | 'content' | 'service';
export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description?: string;
  type: ProductType;
  price: number;
  currency: string;
  status: ProductStatus;
  templateId?: string;
  contentData?: Record<string, any>;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  publishedAt?: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  title: string;
  description: string;
  type: ProductType;
  price: number;
  templateId: string;
  tags?: string[];
  aiGenerate?: boolean;
  automations?: string[];
}

export interface ProductFactoryInput {
  type: ProductType;
  title: string;
  description: string;
  price: number;
  category: string;
  templateId: string;
  aiGenerate: boolean;
  automations: string[];
}

export interface ProductFactoryOutput {
  productId: string;
  landingPageUrl: string;
  funnelSetup: boolean;
  analyticsActive: boolean;
}
