import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TenantBusiness } from '../../../core/tenant/tenant.models';

@Component({
  selector: 'app-site-shell',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="tenant-page" [class]="'nav-' + tenant.layout.navigation + ' category-' + tenant.category">
      <nav class="tenant-nav">
        <a class="brand" href="#top" aria-label="Home">
          <img *ngIf="tenant.logo" class="brand-mark brand-logo" [src]="tenant.logo" [alt]="tenant.businessName">
          <span *ngIf="!tenant.logo" class="brand-mark">{{ tenant.businessName.charAt(0) }}</span>
          <span>{{ tenant.businessName }}</span>
        </a>
        <div class="nav-links">
          <a *ngFor="let item of navItems" [href]="'#' + item.id">{{ item.label }}</a>
        </div>
        <a class="nav-cta" [href]="primaryHref">{{ primaryLabel }}</a>
      </nav>

      <ng-content></ng-content>

      <footer class="tenant-footer" [class.minimal]="tenant.layout.footer === 'minimal'">
        <div>
          <strong>{{ tenant.businessName }}</strong>
          <p>{{ tenant.description }}</p>
        </div>
        <div class="footer-meta">
          <span *ngIf="tenant.phone">{{ tenant.phone }}</span>
          <span *ngIf="tenant.email">{{ tenant.email }}</span>
          <span *ngIf="tenant.city">{{ tenant.city }}</span>
        </div>
      </footer>

      <div class="sticky-actions" aria-label="Quick actions">
        <a *ngIf="tenant.phone" [href]="'tel:' + phoneDigits">Call</a>
        <a *ngIf="tenant.whatsapp" [href]="'https://wa.me/' + whatsappDigits">WhatsApp</a>
        <a *ngIf="showDirections" [href]="directionsHref" target="_blank" rel="noopener">Directions</a>
        <a [href]="primaryHref">{{ shortAction }}</a>
      </div>
    </div>
  `
})
export class SiteShellComponent {
  @Input({ required: true }) tenant!: TenantBusiness;

  get primaryLabel(): string {
    return this.tenant.content.primaryCta ?? 'Book now';
  }

  get shortAction(): string {
    if (this.tenant.category === 'hotel') {
      return 'Book Room';
    }

    if (this.tenant.category === 'home-tuition') {
      return 'Book Demo';
    }

    if (this.tenant.category === 'spa') {
      return 'Book';
    }

    return 'Book';
  }

  get primaryHref(): string {
    return this.tenant.whatsapp ? `https://wa.me/${this.whatsappDigits}` : '#contact';
  }

  get phoneDigits(): string {
    return this.tenant.phone?.replace(/[^\d+]/g, '') ?? '';
  }

  get whatsappDigits(): string {
    return this.tenant.whatsapp?.replace(/[^\d]/g, '') ?? '';
  }

  get showDirections(): boolean {
    return this.tenant.category === 'hotel' || Boolean(this.tenant.address);
  }

  get directionsHref(): string {
    const query = encodeURIComponent([this.tenant.businessName, this.tenant.address, this.tenant.city].filter(Boolean).join(', '));
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  get navItems(): { id: string; label: string }[] {
    return this.tenant.content.sections
      .filter((section) => !['hero', 'booking'].includes(section))
      .slice(0, 4)
      .map((section) => ({ id: section, label: this.labelFor(section) }));
  }

  private labelFor(section: string): string {
    return section
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
