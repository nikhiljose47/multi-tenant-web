import type { ArchetypeId } from './archetype.models';
import type { CompositionId } from './composition.models';

export type BusinessCategory =
  | 'bike-wash'
  | 'car-wash'
  | 'hotel'
  | 'spa'
  | 'salon'
  | 'home-tuition'
  | 'restaurant'
  | 'gym'
  | 'clinic'
  | 'retail'
  | 'service'
  | 'food'
  | 'shop'
  | 'beauty'
  | 'health'
  | 'fitness'
  | 'learn'
  | 'auto'
  | 'space'
  | 'travel'
  | 'event'
  | 'biz'
  | 'other';

export type TenantSection =
  | 'hero'
  | 'booking'
  | 'services'
  | 'pricing'
  | 'about'
  | 'rooms'
  | 'amenities'
  | 'gallery'
  | 'testimonials'
  | 'opening-hours'
  | 'location'
  | 'contact'
  | 'results'
  | 'teaching-method'
  | 'menu'
  | 'offers';

export interface BusinessService {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  highlight?: string;
  image?: string;
  veg?: boolean;
  group?: string;
}

// Sub-category of an offer, independent of the tenant's BusinessCategory — drives which
// badge placeholder is used (see public/media/placeholders/offers/<category>/<offerType>.svg).
export type OfferType =
  | 'discount'
  | 'bogo'
  | 'combo'
  | 'flash-sale'
  | 'new'
  | 'seasonal'
  | 'membership'
  | 'clearance'
  | 'freebie';

export interface TenantOffer {
  title: string;
  description?: string;
  tag?: string;
  image?: string;
  code?: string;
  offerType?: OfferType;
}

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface TenantTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
  buttonStyle: 'rounded' | 'pill' | 'square' | 'outline';
  cardStyle: 'flat' | 'bordered' | 'elevated' | 'glass';
}

export interface TenantLayout {
  navigation: 'transparent' | 'standard' | 'centered' | 'compact';
  hero: 'split' | 'centered' | 'full-image' | 'minimal' | 'editorial';
  services: 'grid' | 'horizontal' | 'pricing' | 'list';
  gallery: 'grid' | 'masonry' | 'carousel';
  footer: 'simple' | 'detailed' | 'minimal';
}

export interface TenantContent {
  sections: TenantSection[];
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  bookingTitle?: string;
  bookingFields?: string[];
  aboutTitle?: string;
  about?: string;
  highlights?: string[];
  amenities?: string[];
  gallery?: string[];
  testimonials?: TenantTestimonial[];
  locationNote?: string;
  stats?: TenantStat[];
  menuGroups?: string[];
  offers?: TenantOffer[];
  deliveryEta?: string;
  orderNote?: string;
}

export interface TenantTestimonial {
  name: string;
  quote: string;
  meta?: string;
}

export interface TenantStat {
  label: string;
  value: string;
}

export interface TenantBusiness {
  id: string;
  code: string;
  username: string;
  businessName: string;
  category: BusinessCategory;
  /** One of the 12 layout archetypes (see archetype.models.ts). Falls back to CATEGORY_ARCHETYPES default when unset. */
  layoutStyle?: ArchetypeId;
  /** Reorders (never hides) content.sections — see composition.models.ts. Defaults to 'balanced' (author's order) when unset. */
  composition?: CompositionId;
  tagline?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  reviewCount?: number;
  services: BusinessService[];
  openingHours?: OpeningHours[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  theme: TenantTheme;
  layout: TenantLayout;
  content: TenantContent;
}
