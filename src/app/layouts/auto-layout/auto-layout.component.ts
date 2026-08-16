import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_AUTO_COVER =
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80';

@Component({
  selector: 'app-auto-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero auto-hero">
        <div class="hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Book your service slot' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <div class="hero-actions">
            <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Book service' }}</a>
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
export class AutoLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_AUTO_COVER;
}
