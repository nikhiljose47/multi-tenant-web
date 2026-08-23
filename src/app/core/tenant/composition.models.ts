export type CompositionId =
  | 'balanced' // author's own order, untouched — the default
  | 'story' // narrative-led: about → gallery → testimonials → offerings → contact
  | 'catalog' // browsing-led: menu/services/pricing first
  | 'conversion' // action-led: booking/offers/pricing pinned right after the hero
  | 'showcase' // visual-led: gallery first
  | 'directory'; // utility-led: hours/location/contact first
