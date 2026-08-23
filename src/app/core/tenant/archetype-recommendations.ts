import { ArchetypeId } from './archetype.models';
import { BusinessCategory } from './tenant.models';

// Recommendations, not restrictions — any tenant can pick any archetype.
// `default` is used when a tenant has no explicit `layoutStyle`.
export const CATEGORY_ARCHETYPES: Record<BusinessCategory, { default: ArchetypeId; recommended: ArchetypeId[] }> = {
  food: { default: 'modern', recommended: ['modern', 'classic', 'bold', 'compact', 'elegant', 'organic', 'immersive'] },
  restaurant: { default: 'modern', recommended: ['modern', 'classic', 'bold', 'compact', 'elegant', 'organic', 'immersive'] },
  shop: { default: 'modern', recommended: ['modern', 'minimal', 'bold', 'editorial', 'dynamic'] },
  service: { default: 'simple', recommended: ['simple', 'modern', 'classic', 'compact', 'friendly'] },
  beauty: { default: 'elegant', recommended: ['elegant', 'minimal', 'modern', 'organic', 'editorial', 'friendly'] },
  health: { default: 'simple', recommended: ['simple', 'classic', 'minimal', 'friendly', 'modern', 'compact'] },
  fitness: { default: 'bold', recommended: ['bold', 'dynamic', 'modern', 'immersive', 'friendly'] },
  learn: { default: 'simple', recommended: ['simple', 'modern', 'friendly', 'classic', 'compact'] },
  auto: { default: 'bold', recommended: ['bold', 'modern', 'dynamic', 'compact', 'classic'] },
  space: { default: 'minimal', recommended: ['minimal', 'modern', 'elegant', 'editorial', 'immersive'] },
  travel: { default: 'immersive', recommended: ['immersive', 'editorial', 'modern', 'elegant', 'organic', 'dynamic'] },
  event: { default: 'bold', recommended: ['bold', 'dynamic', 'immersive', 'elegant', 'modern'] },
  biz: { default: 'modern', recommended: ['modern', 'simple', 'classic', 'minimal', 'editorial'] },
  'bike-wash': { default: 'bold', recommended: ['bold', 'dynamic', 'modern'] },
  'car-wash': { default: 'bold', recommended: ['bold', 'dynamic', 'modern'] },
  hotel: { default: 'elegant', recommended: ['elegant', 'immersive', 'classic', 'modern'] },
  spa: { default: 'minimal', recommended: ['minimal', 'organic', 'elegant', 'modern'] },
  salon: { default: 'elegant', recommended: ['elegant', 'minimal', 'modern', 'friendly'] },
  'home-tuition': { default: 'friendly', recommended: ['friendly', 'simple', 'modern', 'classic'] },
  gym: { default: 'bold', recommended: ['bold', 'dynamic', 'modern', 'immersive'] },
  clinic: { default: 'simple', recommended: ['simple', 'classic', 'minimal', 'friendly'] },
  retail: { default: 'modern', recommended: ['modern', 'minimal', 'bold', 'editorial'] },
  other: { default: 'simple', recommended: ['simple', 'modern', 'minimal'] }
};
