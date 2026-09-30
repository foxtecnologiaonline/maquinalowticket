import { v4 as uuidv4 } from 'uuid';
import { query } from './database.js';
import {
  ProductFactoryInput,
  LandingPageSections,
  LandingPageCopyOverrides,
  Template,
} from '@maquinalowticket/shared-types';

/**
 * Generates the 6 JSONB sections of `landing_pages` (packages/database/schema.sql)
 * from a ProductFactoryInput + Template, following the straight-line copy
 * structure and section mapping in docs/playbook-low-ticket-hotmart.md.
 *
 * A template supplies overrides via `content.copy` (LandingPageCopyOverrides);
 * anything it doesn't provide falls back to a sane default derived from the
 * product input, so a landing page can always be generated even from a
 * minimal template.
 */
export class LandingPageEngine {
  buildSections(input: ProductFactoryInput, template: Pick<Template, 'content'>): LandingPageSections {
    const copy: LandingPageCopyOverrides = template?.content?.copy || {};

    return {
      heroSection: {
        headline: copy.headline || input.title,
        subheadline: copy.subheadline || input.description,
        ...(copy.videoOrImage !== undefined && { videoOrImage: copy.videoOrImage }),
        ...(copy.identificationBlock !== undefined && { identificationBlock: copy.identificationBlock }),
        ...(copy.whoItsFor !== undefined && { whoItsFor: copy.whoItsFor }),
        ...(copy.whoItsNotFor !== undefined && { whoItsNotFor: copy.whoItsNotFor }),
        cta: copy.heroCta || { label: 'Quero Começar Agora', anchor: '#oferta' },
      },
      benefitsSection: {
        ...(copy.mechanism !== undefined && { mechanism: copy.mechanism }),
        modules: copy.modules || [],
        valueStack: copy.valueStack || [],
        cta: copy.benefitsCta || { label: 'Ver a Oferta Completa', anchor: '#oferta' },
      },
      pricingSection: {
        ...(copy.totalValue !== undefined && { totalValue: copy.totalValue }),
        price: copy.priceLabel || `R$ ${input.price.toFixed(2)}`,
        ...(copy.installments !== undefined && { installments: copy.installments }),
        ...(copy.anchorCopy !== undefined && { anchorCopy: copy.anchorCopy }),
        guarantee: copy.guarantee || {
          days: 7,
          copy: 'Garantia incondicional de 7 dias. Sem perguntas.',
        },
        ...(copy.urgency !== undefined && { urgency: copy.urgency }),
        cta: copy.pricingCta || { label: 'Quero Garantir Minha Vaga', style: 'primary' },
      },
      testimonialsSection: {
        ...(copy.authority !== undefined && { authority: copy.authority }),
        testimonials: copy.testimonials || [],
      },
      faqSection: {
        questions: copy.faq || [],
      },
      ctaSection: {
        finalCta: copy.finalCta || {
          headline: 'Não deixe para depois o que resolve agora.',
          button: copy.heroCta?.label || 'Quero Começar Agora',
        },
        ...(copy.footer !== undefined && { footer: copy.footer }),
      },
    };
  }

  /**
   * Persists a landing page for a product and returns its public URL.
   * One landing page per product (landing_pages.product_id is UNIQUE).
   */
  async create(
    productId: string,
    slug: string,
    input: ProductFactoryInput,
    template: Pick<Template, 'content'>
  ): Promise<string> {
    const landingPageId = uuidv4();
    const sections = this.buildSections(input, template);

    await query(
      `INSERT INTO landing_pages
        (id, product_id, slug, title, hero_section, benefits_section, pricing_section, testimonials_section, faq_section, cta_section, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        landingPageId,
        productId,
        slug,
        input.title,
        JSON.stringify(sections.heroSection),
        JSON.stringify(sections.benefitsSection),
        JSON.stringify(sections.pricingSection),
        JSON.stringify(sections.testimonialsSection),
        JSON.stringify(sections.faqSection),
        JSON.stringify(sections.ctaSection),
        true,
      ]
    );

    return `${process.env.LANDING_PAGE_BASE_URL || 'http://localhost:3000'}/landing/${slug}`;
  }
}

export const landingPageEngine = new LandingPageEngine();
