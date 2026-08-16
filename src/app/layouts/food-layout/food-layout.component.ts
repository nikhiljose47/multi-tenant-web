import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_FOOD_COVER =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80';

@Component({
  selector: 'app-food-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header
        id="top"
        class="hero food-hero"
        [style.background-image]="'linear-gradient(180deg, rgba(20,8,4,.25), rgba(20,8,4,.72)), url(' + (tenant.coverImage ?? defaultCover) + ')'"
      >
        <div class="food-hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Now serving' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Get in touch' }}</a>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class FoodLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_FOOD_COVER;
}
