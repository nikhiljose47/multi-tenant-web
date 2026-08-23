import { ArchetypeId } from './archetype.models';

// Per-archetype visual variants for section types that otherwise render identically
// everywhere. Same pattern as tenant.layout.gallery/services (a class suffix), just
// driven by archetype instead of authored per tenant. Extend this — and the matching
// CSS in styles.scss — when another section type needs archetype-specific variance.
export type TestimonialVariant = 'grid' | 'spotlight' | 'compact';
export type OfferVariant = 'row' | 'stacked';

interface SectionVariants {
  testimonials: TestimonialVariant;
  offers: OfferVariant;
}

export const SECTION_VARIANTS: Record<ArchetypeId, SectionVariants> = {
  simple: { testimonials: 'grid', offers: 'row' },
  modern: { testimonials: 'grid', offers: 'row' },
  classic: { testimonials: 'grid', offers: 'row' },
  minimal: { testimonials: 'spotlight', offers: 'stacked' },
  bold: { testimonials: 'grid', offers: 'row' },
  elegant: { testimonials: 'spotlight', offers: 'stacked' },
  friendly: { testimonials: 'grid', offers: 'row' },
  editorial: { testimonials: 'spotlight', offers: 'stacked' },
  dynamic: { testimonials: 'grid', offers: 'row' },
  compact: { testimonials: 'compact', offers: 'row' },
  immersive: { testimonials: 'spotlight', offers: 'stacked' },
  organic: { testimonials: 'spotlight', offers: 'stacked' }
};
