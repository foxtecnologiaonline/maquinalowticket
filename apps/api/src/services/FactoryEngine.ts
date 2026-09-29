import { v4 as uuidv4 } from 'uuid';
import { PoolClient } from 'pg';
import { query, queryOne, withTransaction } from './database';
import { ProductFactoryInput, ProductFactoryOutput } from '@maquinalowticket/shared-types';
import { generateSlug } from '@maquinalowticket/utils';

const SLUG_UNIQUE_VIOLATION = '23505';

export class FactoryEngine {
  /**
   * Main factory method - receives structured input and creates a complete product.
   * Runs in a single DB transaction so a failure at any step leaves no
   * partial product/landing-page/automation rows behind.
   */
  async createProduct(userId: string, input: ProductFactoryInput): Promise<ProductFactoryOutput> {
    // 1. Validate inputs
    this.validateInputs(input);

    const productId = uuidv4();
    const baseSlug = generateSlug(input.title);

    return withTransaction(async (client) => {
      // 2. Fetch template
      const templateResult = await client.query(
        'SELECT * FROM templates WHERE id = $1 AND active = true',
        [input.templateId]
      );
      const template = templateResult.rows[0];

      if (!template) {
        throw new Error(`Template ${input.templateId} not found or inactive`);
      }

      // 3. Create product in database (retry once with a unique suffix on slug collision)
      const slug = await this.insertProductWithUniqueSlug(client, productId, baseSlug, userId, input, template);

      // 4. Setup landing page
      const landingPageUrl = await this.setupLandingPage(client, productId, slug, input, template);

      // 5. Setup automations
      await this.setupAutomations(client, productId, input.automations, template);

      // 6. Setup email sequences
      await this.setupEmailSequences(client, productId, template);

      // 7. Activate analytics tracking
      await this.activateAnalytics(client, productId);

      // 8. Publish product
      await client.query(
        'UPDATE products SET status = $1, published_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['published', productId]
      );

      return {
        productId,
        landingPageUrl,
        funnelSetup: true,
        analyticsActive: true,
      };
    });
  }

  private async insertProductWithUniqueSlug(
    client: PoolClient,
    productId: string,
    baseSlug: string,
    userId: string,
    input: ProductFactoryInput,
    template: any
  ): Promise<string> {
    const attemptSlug = async (slug: string) => {
      await client.query(
        `INSERT INTO products (id, user_id, title, slug, description, type, price, status, template_id, content_data, tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          productId,
          userId,
          input.title,
          slug,
          input.description,
          input.type,
          input.price,
          'draft',
          input.templateId,
          JSON.stringify(template.content),
          input.category ? [input.category] : [],
        ]
      );
    };

    try {
      await attemptSlug(baseSlug);
      return baseSlug;
    } catch (error: any) {
      if (error.code !== SLUG_UNIQUE_VIOLATION) {
        throw error;
      }
      // Title already used elsewhere — disambiguate with a short unique suffix
      const uniqueSlug = `${baseSlug}-${productId.slice(0, 8)}`;
      await attemptSlug(uniqueSlug);
      return uniqueSlug;
    }
  }

  private validateInputs(input: ProductFactoryInput): void {
    const errors: string[] = [];

    if (!input.title || input.title.length < 3) {
      errors.push('Title must be at least 3 characters');
    }

    if (!input.description || input.description.length < 10) {
      errors.push('Description must be at least 10 characters');
    }

    if (!input.price || input.price <= 0) {
      errors.push('Price must be greater than 0');
    }

    if (!['course', 'template', 'content', 'service'].includes(input.type)) {
      errors.push('Invalid product type');
    }

    if (!input.templateId) {
      errors.push('Template ID is required');
    }

    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`);
    }
  }

  private async setupLandingPage(
    client: PoolClient,
    productId: string,
    slug: string,
    input: ProductFactoryInput,
    template: any
  ): Promise<string> {
    const landingPageId = uuidv4();

    // Templates may ship their own copy (see packages/database/seeds/*.sql);
    // fall back to generic copy derived from the product input otherwise.
    const heroSection = template.content?.hero_section || {
      headline: input.title,
      subheadline: input.description,
      ctaText: 'Get Access Now',
    };
    const benefitsSection = template.content?.benefits_section || [];

    await client.query(
      `INSERT INTO landing_pages (id, product_id, slug, title, hero_section, benefits_section, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        landingPageId,
        productId,
        slug,
        input.title,
        JSON.stringify(heroSection),
        JSON.stringify(benefitsSection),
        true,
      ]
    );

    return `${process.env.LANDING_PAGE_BASE_URL || 'http://localhost:3000'}/landing/${slug}`;
  }

  private async setupAutomations(
    client: PoolClient,
    productId: string,
    automationIds: string[],
    template: any
  ): Promise<void> {
    if (!automationIds || automationIds.length === 0) {
      return;
    }

    for (const automationId of automationIds) {
      const automationDef = template.automations?.find((a: any) => a.id === automationId);

      if (!automationDef) continue;

      await client.query(
        `INSERT INTO automations (id, product_id, name, trigger_type, trigger_config, actions, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          uuidv4(),
          productId,
          automationDef.name,
          automationDef.trigger_type,
          JSON.stringify(automationDef.trigger_config || {}),
          // `actions` is JSONB[] in Postgres: each element must be its own
          // JSON string, not one JSON string for the whole array.
          (automationDef.actions || []).map((action: any) => JSON.stringify(action)),
          true,
        ]
      );
    }
  }

  private async setupEmailSequences(client: PoolClient, productId: string, template: any): Promise<void> {
    if (!template.email_sequence) {
      return;
    }

    const sequence = template.email_sequence;

    for (let i = 0; i < sequence.sequence.length; i++) {
      const step = sequence.sequence[i];

      await client.query(
        `INSERT INTO email_templates (id, product_id, name, subject, html_content, text_content, sequence_order, delay_minutes, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          uuidv4(),
          productId,
          `Email ${i + 1}`,
          step.subject,
          step.htmlContent,
          step.textContent || null,
          i,
          step.delayMinutes || 0,
          true,
        ]
      );
    }
  }

  private async activateAnalytics(client: PoolClient, productId: string): Promise<void> {
    // Create first analytics record for today
    const today = new Date().toISOString().split('T')[0];

    await client.query(
      `INSERT INTO analytics (id, product_id, date, views, clicks, conversions, revenue)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (product_id, date) DO NOTHING`,
      [uuidv4(), productId, today, 0, 0, 0, 0]
    );
  }

  /**
   * Get product with all related data
   */
  async getProduct(productId: string) {
    const product = await queryOne('SELECT * FROM products WHERE id = $1', [productId]);

    if (!product) {
      throw new Error('Product not found');
    }

    const [automations, emails, analytics] = await Promise.all([
      query('SELECT * FROM automations WHERE product_id = $1', [productId]),
      query('SELECT * FROM email_templates WHERE product_id = $1 ORDER BY sequence_order', [
        productId,
      ]),
      query(
        'SELECT * FROM analytics WHERE product_id = $1 ORDER BY date DESC LIMIT 30',
        [productId]
      ),
    ]);

    return {
      ...product,
      automations,
      emails,
      analytics,
    };
  }

  /**
   * List products for a user
   */
  async listProducts(userId: string, status?: string) {
    const where = status ? 'WHERE user_id = $1 AND status = $2' : 'WHERE user_id = $1';
    const params = status ? [userId, status] : [userId];

    return query(
      `SELECT * FROM products ${where} ORDER BY created_at DESC`,
      params
    );
  }
}

export const factoryEngine = new FactoryEngine();
