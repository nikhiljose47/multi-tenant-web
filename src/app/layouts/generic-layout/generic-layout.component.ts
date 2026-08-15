import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

@Component({
  selector: 'app-generic-layout',
  standalone: true,
  imports: [NgFor, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant">
      <header id="top" class="hero generic-hero">
        <span class="eyebrow">{{ tenant.category }}</span>
        <h1>{{ tenant.businessName }}</h1>
        <p>{{ tenant.tagline ?? tenant.description }}</p>
        <a class="button" href="#contact">Contact</a>
      </header>
      <app-dynamic-section *ngFor="let section of tenant.content.sections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class GenericLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;
}
