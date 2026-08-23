// Convention for per-tenant photo overrides — see public/media/README.md
export const MEDIA_PLACEHOLDER = '/media/placeholder.svg';

export function tenantMediaPath(category: string, tenantCode: string, slot: string): string {
  return `/media/${category}/${tenantCode}/${slot}.jpg`;
}

// Generic gradient placeholders per business category — see public/media/placeholders/offers/README.md
export function offerPlaceholderPath(category: string): string {
  return `/media/placeholders/offers/${category}.svg`;
}

// Category x offer-type variant (sub-category badge) — falls back to the plain category
// gradient (offerPlaceholderPath) when the offer has no offerType set.
export function offerTypePlaceholderPath(category: string, offerType: string): string {
  return `/media/placeholders/offers/${category}/${offerType}.svg`;
}

export function menuItemSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
