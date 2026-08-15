import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-hotel-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero hotel-hero" [style.background-image]="'linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.55)), url(' + tenant.coverImage + ')'">
        <div class="hotel-hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline }}</p>
          <a class="button" href="#booking">{{ tenant.content.primaryCta }}</a>
        </div>
        <div class="hotel-stats">
          <span *ngFor="let stat of tenant.content.stats"><strong>{{ stat.value }}</strong>{{ stat.label }}</span>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class HotelLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
}
