import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-spa-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero spa-hero">
        <div class="spa-portrait">
          <img [src]="tenant.coverImage" [alt]="tenant.businessName">
        </div>
        <div class="spa-copy">
          <span class="eyebrow">{{ tenant.content.eyebrow }}</span>
          <h1>{{ tenant.businessName }}</h1>
          <p>{{ tenant.tagline }}</p>
          <div class="spa-highlights">
            <span *ngFor="let item of tenant.content.highlights">{{ item }}</span>
          </div>
          <a class="button" href="#booking">{{ tenant.content.primaryCta }}</a>
        </div>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class SpaLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
}
