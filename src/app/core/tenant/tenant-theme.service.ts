import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ArchetypeTokens } from './archetype.models';
import { ARCHETYPE_TOKENS } from './archetype-tokens';
import { archetypeCssVars } from './archetype-css';
import { CATEGORY_ARCHETYPES } from './archetype-recommendations';
import { TenantBusiness, TenantTheme } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  applyTenant(tenant: TenantBusiness): void {
    this.applyTheme(tenant.theme);
    const archetypeId = tenant.layoutStyle ?? CATEGORY_ARCHETYPES[tenant.category].default;
    this.applyArchetype(ARCHETYPE_TOKENS[archetypeId]);
    this.title.setTitle(`${tenant.businessName} | ${tenant.city ?? 'Business Homepage'}`);
    this.meta.updateTag({ name: 'description', content: tenant.description ?? tenant.tagline ?? tenant.businessName });
  }

  /** Sets only the CSS custom properties for an archetype's structural tokens. Used by the theme/font preview switcher. */
  applyArchetype(tokens: ArchetypeTokens): void {
    const root = this.document.documentElement;
    const vars = archetypeCssVars(tokens);
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }

    // Gates CSS-only behavior that can't be expressed as a custom property value
    // (whether the scroll-reveal hidden/shown states apply at all).
    root.dataset['scrollReveal'] = tokens.motion.scrollReveal ? 'on' : 'off';
  }

  /** Sets only the CSS custom properties for a theme, without touching page title/meta. Used by the theme/font preview switcher. */
  applyTheme(theme: TenantTheme): void {
    const root = this.document.documentElement;
    root.style.setProperty('--tenant-primary', theme.primary);
    root.style.setProperty('--tenant-secondary', theme.secondary);
    root.style.setProperty('--tenant-background', theme.background);
    root.style.setProperty('--tenant-surface', theme.surface);
    root.style.setProperty('--tenant-text', theme.text);
    root.style.setProperty('--tenant-radius', theme.borderRadius);
    root.style.setProperty('--tenant-heading-font', theme.headingFont);
    root.style.setProperty('--tenant-body-font', theme.bodyFont);
    root.style.setProperty('--tenant-card-shadow', this.cardShadowFor(theme.cardStyle));
  }

  setFonts(headingFont: string, bodyFont: string): void {
    const root = this.document.documentElement;
    root.style.setProperty('--tenant-heading-font', headingFont);
    root.style.setProperty('--tenant-body-font', bodyFont);
  }

  private cardShadowFor(cardStyle: TenantBusiness['theme']['cardStyle']): string {
    switch (cardStyle) {
      case 'elevated':
        return '0 24px 80px rgba(15, 23, 42, 0.16)';
      case 'glass':
      case 'bordered':
        return '0 14px 40px rgba(15, 23, 42, 0.12)';
      case 'flat':
      default:
        return 'none';
    }
  }

  reset(): void {
    this.title.setTitle('Business Not Found | Multi Tenant Web');
    this.meta.updateTag({ name: 'description', content: 'The requested business link could not be found.' });
  }
}
