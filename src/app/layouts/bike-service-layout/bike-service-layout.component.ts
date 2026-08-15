import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-bike-service-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero bike-hero">
        <div class="hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline }}</p>
          <div class="hero-actions">
            <a class="button" href="#booking">{{ tenant.content.primaryCta }}</a>
            <a class="button secondary" href="#pricing">{{ tenant.content.secondaryCta }}</a>
          </div>
        </div>
        <div class="hero-media">
          <img [src]="tenant.coverImage" [alt]="tenant.businessName">
          <div class="rating-pill">{{ tenant.rating }} star / {{ tenant.reviewCount }} reviews</div>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class BikeServiceLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
}
