import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TenantBusiness } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  applyTenant(tenant: TenantBusiness): void {
    const root = this.document.documentElement;
    root.style.setProperty('--tenant-primary', tenant.theme.primary);
    root.style.setProperty('--tenant-secondary', tenant.theme.secondary);
    root.style.setProperty('--tenant-background', tenant.theme.background);
    root.style.setProperty('--tenant-surface', tenant.theme.surface);
    root.style.setProperty('--tenant-text', tenant.theme.text);
    root.style.setProperty('--tenant-radius', tenant.theme.borderRadius);
    root.style.setProperty('--tenant-heading-font', tenant.theme.headingFont);
    root.style.setProperty('--tenant-body-font', tenant.theme.bodyFont);
    root.style.setProperty('--tenant-card-shadow', tenant.theme.cardStyle === 'elevated' ? '0 24px 80px rgba(15, 23, 42, 0.16)' : 'none');
    this.title.setTitle(`${tenant.businessName} | ${tenant.city ?? 'Business Homepage'}`);
    this.meta.updateTag({ name: 'description', content: tenant.description ?? tenant.tagline ?? tenant.businessName });
  }

  reset(): void {
    this.title.setTitle('Business Not Found | Multi Tenant Web');
    this.meta.updateTag({ name: 'description', content: 'The requested business link could not be found.' });
  }
}
