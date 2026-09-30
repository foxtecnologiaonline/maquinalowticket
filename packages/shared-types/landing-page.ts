export interface LandingPageCta {
  label: string;
  anchor?: string;
  style?: string;
}

export interface LandingPageHeroSection {
  headline: string;
  subheadline: string;
  videoOrImage?: string;
  identificationBlock?: string;
  whoItsFor?: string[];
  whoItsNotFor?: string[];
  cta: LandingPageCta;
}

export interface LandingPageValueStackItem {
  item: string;
  value: string;
}

export interface LandingPageModule {
  title: string;
  desc: string;
}

export interface LandingPageBenefitsSection {
  mechanism?: string;
  modules: LandingPageModule[];
  valueStack: LandingPageValueStackItem[];
  cta: LandingPageCta;
}

export interface LandingPageGuarantee {
  days: number;
  copy: string;
}

export interface LandingPageUrgency {
  type: string;
  copy: string;
}

export interface LandingPagePricingSection {
  totalValue?: string;
  price: string;
  installments?: string;
  anchorCopy?: string;
  guarantee?: LandingPageGuarantee;
  urgency?: LandingPageUrgency;
  cta: LandingPageCta;
}

export interface LandingPageTestimonial {
  name: string;
  result: string;
}

export interface LandingPageTestimonialsSection {
  authority?: string;
  testimonials: LandingPageTestimonial[];
}

export interface LandingPageFaqItem {
  q: string;
  a: string;
}

export interface LandingPageFaqSection {
  questions: LandingPageFaqItem[];
}

export interface LandingPageFinalCta {
  headline: string;
  button: string;
  urgencyReminder?: string;
}

export interface LandingPageFooter {
  supportEmail?: string;
  termsLink?: string;
  privacyLink?: string;
}

export interface LandingPageCtaSection {
  finalCta: LandingPageFinalCta;
  footer?: LandingPageFooter;
}

/**
 * Maps 1:1 to the 6 JSONB columns on the `landing_pages` table
 * (packages/database/schema.sql), per docs/playbook-low-ticket-hotmart.md section 3.
 */
export interface LandingPageSections {
  heroSection: LandingPageHeroSection;
  benefitsSection: LandingPageBenefitsSection;
  pricingSection: LandingPagePricingSection;
  testimonialsSection: LandingPageTestimonialsSection;
  faqSection: LandingPageFaqSection;
  ctaSection: LandingPageCtaSection;
}

/**
 * Optional shape a Template's `content.copy` can provide to override the
 * defaults LandingPageEngine derives from ProductFactoryInput.
 */
export interface LandingPageCopyOverrides {
  headline?: string;
  subheadline?: string;
  videoOrImage?: string;
  identificationBlock?: string;
  whoItsFor?: string[];
  whoItsNotFor?: string[];
  heroCta?: LandingPageCta;
  mechanism?: string;
  modules?: LandingPageModule[];
  valueStack?: LandingPageValueStackItem[];
  benefitsCta?: LandingPageCta;
  totalValue?: string;
  priceLabel?: string;
  installments?: string;
  anchorCopy?: string;
  guarantee?: LandingPageGuarantee;
  urgency?: LandingPageUrgency;
  pricingCta?: LandingPageCta;
  authority?: string;
  testimonials?: LandingPageTestimonial[];
  faq?: LandingPageFaqItem[];
  finalCta?: LandingPageFinalCta;
  footer?: LandingPageFooter;
}
