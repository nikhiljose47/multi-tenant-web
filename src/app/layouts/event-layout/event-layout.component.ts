import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_EVENT_COVER =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80';

@Component({
  selector: 'app-event-layout',
  standalone: true,
  imports: [NgFor, NgIf, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header
        id="top"
        class="hero event-hero"
        [style.background-image]="'linear-gradient(180deg, rgba(10,4,20,.35), rgba(10,4,20,.8)), url(' + (tenant.coverImage ?? defaultCover) + ')'"
      >
        <div class="hotel-hero-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Let\\'s make it unforgettable' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Enquire now' }}</a>
        </div>
        <div class="hotel-stats" *ngIf="tenant.content.stats?.length">
          <span *ngFor="let stat of tenant.content.stats"><strong>{{ stat.value }}</strong>{{ stat.label }}</span>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class EventLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_EVENT_COVER;
}
