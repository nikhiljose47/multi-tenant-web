import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-health-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero health-hero">
        <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Trusted care, close to you' }}</span>
        <h1>{{ tenant.businessName }}</h1>
        <p>{{ tenant.tagline ?? tenant.description }}</p>
        <div class="spa-highlights">
          <span *ngFor="let item of tenant.content.highlights ?? defaultHighlights">{{ item }}</span>
        </div>
        <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Book appointment' }}</a>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class HealthLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultHighlights = ['Qualified practitioners', 'Hygienic facility', 'Easy scheduling'];
}
