import { v4 as uuidv4 } from 'uuid';
import { query, queryOne } from './database.js';
import { landingPageEngine } from './LandingPageEngine.js';
import { ProductFactoryInput, ProductFactoryOutput } from '@maquinalowticket/shared-types';
import { generateSlug } from '@maquinalowticket/utils';

export class FactoryEngine {
  /**
   * Main factory method - receives structured input and creates a complete product
   */
  async createProduct(userId: string, input: ProductFactoryInput): Promise<ProductFactoryOutput> {
    const productId = uuidv4();

    try {
      // 1. Validate inputs
      this.validateInputs(input);

      // 2. Generate slug from title
      const slug = generateSlug(input.title);

      // 3. Fetch template
      const template = await queryOne(
        'SELECT * FROM templates WHERE id = $1 AND active = true',
        [input.templateId]
      );

      if (!template) {
        throw new Error(`Template ${input.templateId} not found or inactive`);
      }

      // 4. Create product in database
      await query(
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

      // 5. Setup landing page
      const landingPageUrl = await landingPageEngine.create(productId, slug, input, template);

      // 6. Setup automations
      await this.setupAutomations(productId, input.automations, template);

      // 7. Setup email sequences
      await this.setupEmailSequences(productId, template);

      // 8. Activate analytics tracking
      await this.activateAnalytics(productId);

      // 9. Publish product
      await query(
        'UPDATE products SET status = $1, published_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['published', productId]
      );

      return {
        productId,
        landingPageUrl,
        funnelSetup: true,
        analyticsActive: true,
      };
    } catch (error) {
      // Rollback if something fails
      await query('DELETE FROM products WHERE id = $1', [productId]);
      throw error;
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

  private async setupAutomations(
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

      await query(
        `INSERT INTO automations (id, product_id, name, trigger_type, trigger_config, actions, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          uuidv4(),
          productId,
          automationDef.name,
          automationDef.trigger_type,
          JSON.stringify(automationDef.trigger_config || {}),
          JSON.stringify(automationDef.actions || []),
          true,
        ]
      );
    }
  }

  private async setupEmailSequences(productId: string, template: any): Promise<void> {
    if (!template.email_sequence) {
      return;
    }

    const sequence = template.email_sequence;

    for (let i = 0; i < sequence.sequence.length; i++) {
      const step = sequence.sequence[i];

      await query(
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

  private async activateAnalytics(productId: string): Promise<void> {
    // Create first analytics record for today
    const today = new Date().toISOString().split('T')[0];

    await query(
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
