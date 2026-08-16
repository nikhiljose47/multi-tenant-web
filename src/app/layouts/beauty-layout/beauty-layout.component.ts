import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_BEAUTY_COVER =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';

@Component({
  selector: 'app-beauty-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero beauty-hero">
        <div class="spa-portrait">
          <img [src]="tenant.coverImage ?? defaultCover" [alt]="tenant.businessName">
        </div>
        <div class="spa-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Book your glow-up' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <div class="spa-highlights">
            <span *ngFor="let item of tenant.content.highlights ?? defaultHighlights">{{ item }}</span>
          </div>
          <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Book appointment' }}</a>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class BeautyLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_BEAUTY_COVER;
  readonly defaultHighlights = ['Certified stylists', 'Premium products', 'Relaxing ambience'];
}
