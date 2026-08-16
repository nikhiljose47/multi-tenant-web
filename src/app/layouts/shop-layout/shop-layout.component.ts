import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_SHOP_COVER =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';

@Component({
  selector: 'app-shop-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero shop-hero">
        <div class="hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'New arrivals weekly' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <div class="hero-actions">
            <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Shop now' }}</a>
          </div>
        </div>
        <div class="hero-media">
          <img [src]="tenant.coverImage ?? defaultCover" [alt]="tenant.businessName">
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class ShopLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_SHOP_COVER;
}
