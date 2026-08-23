export type ArchetypeId =
  | 'simple'
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'friendly'
  | 'editorial'
  | 'dynamic'
  | 'compact'
  | 'immersive'
  | 'organic';

export type HeroVariant =
  | 'full-image' // bg image + overlay text (food, hotel, event...)
  | 'two-column-right' // text left, image right (shop, auto, service...)
  | 'two-column-left' // image left, text right (spa, beauty)
  | 'centered' // text only, centered (biz, health, generic)
  | 'editorial'; // magazine-style, text over full-bleed with side rail

export interface ArchetypeTokens {
  id: ArchetypeId;
  displayName: string;
  personality: string[];

  spacing: {
    density: 'compact' | 'comfortable' | 'roomy' | 'airy';
    sectionGap: 'sm' | 'md' | 'lg' | 'xl';
    contentWidth: 'narrow' | 'standard' | 'wide' | 'full';
  };

  typography: {
    headingScale: 'sm' | 'md' | 'lg' | 'xl' | 'display';
    headingWeight: 400 | 500 | 600 | 700 | 800 | 900;
    bodyScale: 'sm' | 'md' | 'lg';
    letterSpacing: 'tight' | 'normal' | 'wide';
  };

  surfaces: {
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill';
    shadow: 'none' | 'soft' | 'lifted' | 'dramatic';
    borderUsage: 'none' | 'thin' | 'strong';
    cardStyle: 'flat' | 'bordered' | 'elevated' | 'glass';
  };

  imagery: {
    importance: 'low' | 'medium' | 'high' | 'dominant';
    aspectRatio: '1:1' | '4:3' | '3:2' | '16:9' | '2:1';
  };

  layout: {
    symmetry: 'symmetric' | 'mixed' | 'asymmetric';
    heroVariant: HeroVariant;
    stickyNav: boolean;
    navStyle: 'standard' | 'centered' | 'compact' | 'transparent';
  };

  motion: {
    level: 'none' | 'low' | 'medium' | 'high';
    scrollReveal: boolean;
    hoverLift: boolean;
  };
}
