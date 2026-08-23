import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { TenantBusiness, TenantSection } from '../../core/tenant/tenant.models';
import { ARCHETYPE_TOKENS } from '../../core/tenant/archetype-tokens';
import { CATEGORY_ARCHETYPES } from '../../core/tenant/archetype-recommendations';
import { COMPOSITION_ORDER } from '../../core/tenant/composition-tokens';
import { DynamicSectionComponent } from '../../sections/dynamic-section/dynamic-section.component';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';

const DEFAULT_COVER = '/media/placeholder.svg';

// The single renderer for every business category. Visual archetype (12 options) is an
// independent axis from category — see archetype.models.ts / archetype-tokens.ts.
@Component({
  selector: 'app-archetype-layout',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet, SiteShellComponent, DynamicSectionComponent],
  template: `
    <app-site-shell [tenant]="tenant" [orderedSections]="orderedSections">
      <ng-container [ngSwitch]="heroVariant">
        <header
          *ngSwitchCase="'full-image'"
          id="top"
          class="hero archetype-hero hero-full-image"
          [style.background-image]="'linear-gradient(180deg, rgba(15,15,20,.35), rgba(15,15,20,.8)), url(' + coverImage + ')'"
        >
          <div class="archetype-hero-copy">
            <ng-container *ngTemplateOutlet="copyBlock"></ng-container>
          </div>
        </header>

        <header *ngSwitchCase="'two-column-right'" id="top" class="hero archetype-hero hero-two-col hero-image-right">
          <div class="archetype-hero-copy">
            <ng-container *ngTemplateOutlet="copyBlock"></ng-container>
          </div>
          <div class="archetype-hero-media">
            <img [src]="coverImage" [alt]="tenant.businessName">
          </div>
        </header>

        <header *ngSwitchCase="'two-column-left'" id="top" class="hero archetype-hero hero-two-col hero-image-left">
          <div class="archetype-hero-media">
            <img [src]="coverImage" [alt]="tenant.businessName">
          </div>
          <div class="archetype-hero-copy">
            <ng-container *ngTemplateOutlet="copyBlock"></ng-container>
          </div>
        </header>

        <header *ngSwitchCase="'centered'" id="top" class="hero archetype-hero hero-centered">
          <div class="archetype-hero-copy">
            <ng-container *ngTemplateOutlet="copyBlock"></ng-container>
          </div>
        </header>

        <header *ngSwitchCase="'editorial'" id="top" class="hero archetype-hero hero-editorial">
          <div class="archetype-hero-copy">
            <ng-container *ngTemplateOutlet="copyBlock"></ng-container>
          </div>
          <div class="archetype-hero-media">
            <img [src]="coverImage" [alt]="tenant.businessName">
          </div>
        </header>
      </ng-container>

      <app-dynamic-section *ngIf="tenant.content.offers?.length" type="offers" [tenant]="tenant"></app-dynamic-section>

      <ng-template #copyBlock>
        <span class="eyebrow">{{ tenant.content.eyebrow ?? 'Welcome' }}</span>
        <h1>{{ tenant.businessName }}</h1>
        <p>{{ tenant.tagline ?? tenant.description }}</p>

        <div class="archetype-hero-actions">
          <a class="button" [href]="primaryHref">{{ tenant.content.primaryCta ?? 'Get in touch' }}</a>
          <a *ngIf="tenant.content.secondaryCta" class="button secondary" [href]="secondaryHref">{{ tenant.content.secondaryCta }}</a>
        </div>

        <div class="archetype-hero-chips" *ngIf="tenant.rating || tenant.content.deliveryEta || tenant.city || tenant.address">
          <span *ngIf="tenant.rating">&#9733; {{ tenant.rating }} <em *ngIf="tenant.reviewCount">({{ tenant.reviewCount }}+ reviews)</em></span>
          <span *ngIf="tenant.content.deliveryEta">&#128666; {{ tenant.content.deliveryEta }}</span>
          <span *ngIf="tenant.city || tenant.address">&#128205; {{ tenant.city ?? tenant.address }}</span>
        </div>
      </ng-template>

      <app-dynamic-section *ngFor="let section of loopSections" [type]="section" [tenant]="tenant"></app-dynamic-section>
    </app-site-shell>
  `
})
export class ArchetypeLayoutComponent {
  @Input({ required: true }) tenant!: TenantBusiness;

  get archetypeId() {
    return this.tenant.layoutStyle ?? CATEGORY_ARCHETYPES[this.tenant.category].default;
  }

  get heroVariant() {
    return ARCHETYPE_TOKENS[this.archetypeId].layout.heroVariant;
  }

  get coverImage(): string {
    return this.tenant.coverImage ?? DEFAULT_COVER;
  }

  get compositionId() {
    return this.tenant.composition ?? 'balanced';
  }

  /** Reorders tenant.content.sections per the active composition. Never hides a section —
   * anything not named by the composition's priority list keeps its original relative order,
   * appended after the ones the composition prioritizes. */
  get orderedSections(): TenantSection[] {
    const priority = COMPOSITION_ORDER[this.compositionId];
    if (!priority.length) {
      return this.tenant.content.sections;
    }

    const rank = (section: TenantSection): number => {
      const index = priority.indexOf(section);
      return index === -1 ? priority.length : index;
    };

    return [...this.tenant.content.sections].sort((a, b) => rank(a) - rank(b));
  }

  /** 'offers' renders as a rail right under the hero (see template), not in this loop —
   * it stays in orderedSections so nav links / secondaryHref still account for it. */
  get loopSections(): TenantSection[] {
    return this.orderedSections.filter((section) => section !== 'offers');
  }

  get firstSectionAnchor(): string | null {
    const target = this.orderedSections.find((section) => section !== 'hero' && section !== 'booking');
    return target ? `#${target}` : null;
  }

  get primaryHref(): string {
    return this.firstSectionAnchor ?? '#contact';
  }

  get secondaryHref(): string {
    const sections = this.orderedSections;
    const target = sections.find((section) => section === 'offers') ?? sections.find((section) => section === 'gallery');
    return target ? `#${target}` : '#contact';
  }
}
