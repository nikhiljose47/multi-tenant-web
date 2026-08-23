import { ArchetypeTokens } from './archetype.models';

const SECTION_GAP: Record<ArchetypeTokens['spacing']['sectionGap'], string> = {
  sm: '32px',
  md: '54px',
  lg: '80px',
  xl: '112px'
};

const CONTENT_WIDTH: Record<ArchetypeTokens['spacing']['contentWidth'], string> = {
  narrow: '880px',
  standard: '1160px',
  wide: '1320px',
  full: '100%'
};

const HEADING_MULT: Record<ArchetypeTokens['typography']['headingScale'], string> = {
  sm: '0.75',
  md: '0.9',
  lg: '1',
  xl: '1.15',
  display: '1.35'
};

const LETTER_SPACING: Record<ArchetypeTokens['typography']['letterSpacing'], string> = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.04em'
};

const RADIUS: Record<ArchetypeTokens['surfaces']['borderRadius'], string> = {
  none: '0px',
  sm: '8px',
  md: '14px',
  lg: '22px',
  xl: '32px',
  pill: '999px'
};

const SHADOW: Record<ArchetypeTokens['surfaces']['shadow'], string> = {
  none: 'none',
  soft: '0 14px 40px rgba(15, 23, 42, 0.12)',
  lifted: '0 24px 70px rgba(15, 23, 42, 0.18)',
  dramatic: '0 32px 90px rgba(15, 23, 42, 0.28)'
};

const MOTION_DURATION: Record<ArchetypeTokens['motion']['level'], string> = {
  none: '0s',
  low: '0.25s',
  medium: '0.4s',
  high: '0.6s'
};

/** Resolves an archetype's scale tokens to concrete CSS custom property values. */
export function archetypeCssVars(tokens: ArchetypeTokens): Record<string, string> {
  return {
    '--archetype-section-gap': SECTION_GAP[tokens.spacing.sectionGap],
    '--archetype-content-width': CONTENT_WIDTH[tokens.spacing.contentWidth],
    '--archetype-heading-mult': HEADING_MULT[tokens.typography.headingScale],
    '--archetype-letter-spacing': LETTER_SPACING[tokens.typography.letterSpacing],
    '--archetype-hero-radius': RADIUS[tokens.surfaces.borderRadius],
    '--archetype-hero-shadow': SHADOW[tokens.surfaces.shadow],
    '--archetype-motion-duration': MOTION_DURATION[tokens.motion.level],
    '--archetype-hover-lift': tokens.motion.hoverLift ? '-4px' : '0px'
  };
}
