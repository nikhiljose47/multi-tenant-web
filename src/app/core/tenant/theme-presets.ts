import { TenantTheme } from './tenant.models';

export type ThemeName = 'sunrise' | 'midnight' | 'meadow' | 'berry' | 'ocean' | 'classic';

// 6 standard themes any tenant can use, independent of business category.
// Each pairs a heading + body font from the 6 self-hosted families (src/styles/fonts.scss).
export const THEME_PRESETS: Record<ThemeName, TenantTheme> = {
  sunrise: {
    primary: '#f4823a',
    secondary: '#2b1810',
    background: '#fff8f0',
    surface: '#fff1e0',
    text: '#2b1810',
    headingFont: 'Fredoka, sans-serif',
    bodyFont: 'Nunito, Arial, sans-serif',
    borderRadius: '22px',
    buttonStyle: 'pill',
    cardStyle: 'elevated'
  },
  midnight: {
    primary: '#8b5cf6',
    secondary: '#f5c451',
    background: '#0f0b1e',
    surface: '#1a1430',
    text: '#f4f1fb',
    headingFont: '"Playfair Display", Georgia, serif',
    bodyFont: 'Poppins, Arial, sans-serif',
    borderRadius: '14px',
    buttonStyle: 'rounded',
    cardStyle: 'glass'
  },
  meadow: {
    primary: '#4ca771',
    secondary: '#22432f',
    background: '#f6faf6',
    surface: '#e8f5ec',
    text: '#1e2e24',
    headingFont: 'Quicksand, Arial, sans-serif',
    bodyFont: 'Nunito, Arial, sans-serif',
    borderRadius: '20px',
    buttonStyle: 'pill',
    cardStyle: 'flat'
  },
  berry: {
    primary: '#e0457b',
    secondary: '#3a1229',
    background: '#fff5f9',
    surface: '#ffe3ee',
    text: '#3a1229',
    headingFont: '"Baloo 2", cursive',
    bodyFont: 'Quicksand, Arial, sans-serif',
    borderRadius: '28px',
    buttonStyle: 'pill',
    cardStyle: 'elevated'
  },
  ocean: {
    primary: '#1477b8',
    secondary: '#0b2338',
    background: '#f3f9fc',
    surface: '#e3f1f8',
    text: '#0b2338',
    headingFont: 'Poppins, Arial, sans-serif',
    bodyFont: 'Nunito, Arial, sans-serif',
    borderRadius: '16px',
    buttonStyle: 'rounded',
    cardStyle: 'bordered'
  },
  classic: {
    primary: '#1f2937',
    secondary: '#a98a4d',
    background: '#fbfaf7',
    surface: '#ffffff',
    text: '#20241f',
    headingFont: '"Playfair Display", Georgia, serif',
    bodyFont: 'Poppins, Arial, sans-serif',
    borderRadius: '8px',
    buttonStyle: 'square',
    cardStyle: 'bordered'
  }
};
