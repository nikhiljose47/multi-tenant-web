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
  | 'teaching-method';

export interface BusinessService {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  highlight?: string;
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
  tagline?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
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
