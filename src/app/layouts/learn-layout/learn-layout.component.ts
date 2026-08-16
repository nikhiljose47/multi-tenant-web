import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_LEARN_COVER =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80';

@Component({
  selector: 'app-learn-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero learn-hero">
        <div class="tutor-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Learn with confidence' }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline ?? tenant.description }}</p>
          <div class="hero-actions">
            <a class="button" href="#contact">{{ tenant.content.primaryCta ?? 'Book a class' }}</a>
          </div>
        </div>
        <div class="teacher-panel">
          <img [src]="tenant.coverImage ?? defaultCover" [alt]="tenant.businessName">
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class LearnLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
  readonly defaultCover = DEFAULT_LEARN_COVER;
}
