import { ArchetypeId, ArchetypeTokens } from './archetype.models';

// 12 layout archetypes — structural/spacing/motion tokens only.
// Color and typeface come from theme-presets.ts; these two axes are independent.
export const ARCHETYPE_TOKENS: Record<ArchetypeId, ArchetypeTokens> = {
  simple: {
    id: 'simple',
    displayName: 'Simple',
    personality: ['clean', 'straightforward', 'functional'],
    spacing: { density: 'comfortable', sectionGap: 'md', contentWidth: 'standard' },
    typography: { headingScale: 'md', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'sm', shadow: 'soft', borderUsage: 'thin', cardStyle: 'bordered' },
    imagery: { importance: 'medium', aspectRatio: '4:3' },
    layout: { symmetry: 'symmetric', heroVariant: 'two-column-right', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: false, hoverLift: false }
  },
  modern: {
    id: 'modern',
    displayName: 'Modern',
    personality: ['contemporary', 'spacious', 'polished', 'digital-first'],
    spacing: { density: 'roomy', sectionGap: 'lg', contentWidth: 'wide' },
    typography: { headingScale: 'lg', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'lg', shadow: 'soft', borderUsage: 'none', cardStyle: 'elevated' },
    imagery: { importance: 'high', aspectRatio: '4:3' },
    layout: { symmetry: 'mixed', heroVariant: 'two-column-right', stickyNav: true, navStyle: 'transparent' },
    motion: { level: 'medium', scrollReveal: true, hoverLift: true }
  },
  classic: {
    id: 'classic',
    displayName: 'Classic',
    personality: ['traditional', 'trustworthy', 'structured'],
    spacing: { density: 'comfortable', sectionGap: 'md', contentWidth: 'standard' },
    typography: { headingScale: 'lg', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'sm', shadow: 'soft', borderUsage: 'thin', cardStyle: 'bordered' },
    imagery: { importance: 'high', aspectRatio: '4:3' },
    layout: { symmetry: 'symmetric', heroVariant: 'centered', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: false, hoverLift: false }
  },
  minimal: {
    id: 'minimal',
    displayName: 'Minimal',
    personality: ['premium', 'quiet', 'content-focused'],
    spacing: { density: 'airy', sectionGap: 'xl', contentWidth: 'standard' },
    typography: { headingScale: 'display', headingWeight: 500, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'sm', shadow: 'none', borderUsage: 'none', cardStyle: 'flat' },
    imagery: { importance: 'dominant', aspectRatio: '3:2' },
    layout: { symmetry: 'symmetric', heroVariant: 'centered', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: true, hoverLift: false }
  },
  bold: {
    id: 'bold',
    displayName: 'Bold',
    personality: ['high-impact', 'energetic', 'promotional'],
    spacing: { density: 'comfortable', sectionGap: 'lg', contentWidth: 'wide' },
    typography: { headingScale: 'xl', headingWeight: 900, bodyScale: 'md', letterSpacing: 'tight' },
    surfaces: { borderRadius: 'lg', shadow: 'dramatic', borderUsage: 'none', cardStyle: 'elevated' },
    imagery: { importance: 'high', aspectRatio: '16:9' },
    layout: { symmetry: 'asymmetric', heroVariant: 'two-column-right', stickyNav: true, navStyle: 'standard' },
    motion: { level: 'high', scrollReveal: true, hoverLift: true }
  },
  elegant: {
    id: 'elegant',
    displayName: 'Elegant',
    personality: ['refined', 'luxurious', 'sophisticated'],
    spacing: { density: 'roomy', sectionGap: 'xl', contentWidth: 'standard' },
    typography: { headingScale: 'xl', headingWeight: 600, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'sm', shadow: 'soft', borderUsage: 'thin', cardStyle: 'elevated' },
    imagery: { importance: 'dominant', aspectRatio: '3:2' },
    layout: { symmetry: 'symmetric', heroVariant: 'full-image', stickyNav: false, navStyle: 'centered' },
    motion: { level: 'low', scrollReveal: true, hoverLift: false }
  },
  friendly: {
    id: 'friendly',
    displayName: 'Friendly',
    personality: ['warm', 'approachable', 'community-oriented'],
    spacing: { density: 'comfortable', sectionGap: 'md', contentWidth: 'standard' },
    typography: { headingScale: 'lg', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'pill', shadow: 'soft', borderUsage: 'none', cardStyle: 'elevated' },
    imagery: { importance: 'medium', aspectRatio: '4:3' },
    layout: { symmetry: 'symmetric', heroVariant: 'two-column-right', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: false, hoverLift: true }
  },
  editorial: {
    id: 'editorial',
    displayName: 'Editorial',
    personality: ['story-driven', 'magazine-like', 'sophisticated'],
    spacing: { density: 'airy', sectionGap: 'xl', contentWidth: 'full' },
    typography: { headingScale: 'display', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'none', shadow: 'none', borderUsage: 'none', cardStyle: 'flat' },
    imagery: { importance: 'dominant', aspectRatio: '3:2' },
    layout: { symmetry: 'asymmetric', heroVariant: 'editorial', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: true, hoverLift: false }
  },
  dynamic: {
    id: 'dynamic',
    displayName: 'Dynamic',
    personality: ['interactive', 'visual', 'motion-heavy'],
    spacing: { density: 'comfortable', sectionGap: 'lg', contentWidth: 'wide' },
    typography: { headingScale: 'lg', headingWeight: 700, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'lg', shadow: 'lifted', borderUsage: 'none', cardStyle: 'elevated' },
    imagery: { importance: 'high', aspectRatio: '16:9' },
    layout: { symmetry: 'mixed', heroVariant: 'full-image', stickyNav: true, navStyle: 'transparent' },
    motion: { level: 'high', scrollReveal: true, hoverLift: true }
  },
  compact: {
    id: 'compact',
    displayName: 'Compact',
    personality: ['dense', 'utility-first', 'information-rich'],
    spacing: { density: 'compact', sectionGap: 'sm', contentWidth: 'standard' },
    typography: { headingScale: 'sm', headingWeight: 700, bodyScale: 'sm', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'sm', shadow: 'soft', borderUsage: 'thin', cardStyle: 'bordered' },
    imagery: { importance: 'medium', aspectRatio: '1:1' },
    layout: { symmetry: 'symmetric', heroVariant: 'centered', stickyNav: true, navStyle: 'compact' },
    motion: { level: 'low', scrollReveal: false, hoverLift: false }
  },
  immersive: {
    id: 'immersive',
    displayName: 'Immersive',
    personality: ['visual', 'cinematic', 'experiential'],
    spacing: { density: 'airy', sectionGap: 'xl', contentWidth: 'full' },
    typography: { headingScale: 'display', headingWeight: 800, bodyScale: 'md', letterSpacing: 'wide' },
    surfaces: { borderRadius: 'none', shadow: 'none', borderUsage: 'none', cardStyle: 'flat' },
    imagery: { importance: 'dominant', aspectRatio: '16:9' },
    layout: { symmetry: 'mixed', heroVariant: 'full-image', stickyNav: false, navStyle: 'transparent' },
    motion: { level: 'medium', scrollReveal: true, hoverLift: false }
  },
  organic: {
    id: 'organic',
    displayName: 'Organic',
    personality: ['natural', 'soft', 'handcrafted'],
    spacing: { density: 'roomy', sectionGap: 'lg', contentWidth: 'standard' },
    typography: { headingScale: 'lg', headingWeight: 600, bodyScale: 'md', letterSpacing: 'normal' },
    surfaces: { borderRadius: 'xl', shadow: 'soft', borderUsage: 'none', cardStyle: 'flat' },
    imagery: { importance: 'high', aspectRatio: '4:3' },
    layout: { symmetry: 'mixed', heroVariant: 'two-column-left', stickyNav: false, navStyle: 'standard' },
    motion: { level: 'low', scrollReveal: true, hoverLift: false }
  }
};
