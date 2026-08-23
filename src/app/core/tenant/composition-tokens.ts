import { CompositionId } from './composition.models';
import { TenantSection } from './tenant.models';

// Reordering priority only — never hides a section. Sections a tenant has that aren't
// listed here keep their original relative order, appended after the listed ones.
// 'balanced' is intentionally empty: it means "leave the author's order alone".
export const COMPOSITION_ORDER: Record<CompositionId, TenantSection[]> = {
  balanced: [],
  story: ['about', 'gallery', 'testimonials', 'services', 'menu', 'results', 'teaching-method', 'pricing', 'rooms', 'amenities', 'opening-hours', 'location', 'contact', 'booking', 'offers'],
  catalog: ['menu', 'services', 'pricing', 'rooms', 'offers', 'amenities', 'gallery', 'testimonials', 'about', 'results', 'teaching-method', 'opening-hours', 'location', 'contact', 'booking'],
  conversion: ['booking', 'offers', 'menu', 'pricing', 'testimonials', 'services', 'contact', 'opening-hours', 'location', 'rooms', 'amenities', 'results', 'about', 'gallery', 'teaching-method'],
  showcase: ['gallery', 'offers', 'menu', 'services', 'pricing', 'rooms', 'amenities', 'about', 'testimonials', 'results', 'teaching-method', 'opening-hours', 'location', 'contact', 'booking'],
  directory: ['opening-hours', 'location', 'contact', 'services', 'menu', 'pricing', 'rooms', 'amenities', 'results', 'teaching-method', 'booking', 'offers', 'about', 'testimonials', 'gallery']
};

export const COMPOSITION_DISPLAY_NAME: Record<CompositionId, string> = {
  balanced: 'Balanced',
  story: 'Story',
  catalog: 'Catalog',
  conversion: 'Conversion',
  showcase: 'Showcase',
  directory: 'Directory'
};
