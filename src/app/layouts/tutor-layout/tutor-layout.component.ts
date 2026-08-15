import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-tutor-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero tutor-hero">
        <div class="tutor-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline }}</p>
          <div class="hero-actions">
            <a class="button" href="#booking">{{ tenant.content.primaryCta }}</a>
            <a class="button secondary" href="#services">{{ tenant.content.secondaryCta }}</a>
          </div>
        </div>
        <div class="teacher-panel">
          <img [src]="tenant.coverImage" [alt]="tenant.businessName">
          <div class="stats-row compact">
            <div *ngFor="let stat of tenant.content.stats">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class TutorLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
}
