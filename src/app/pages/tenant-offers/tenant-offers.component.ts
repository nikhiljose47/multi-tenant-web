import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TenantBusiness, TenantOffer } from '../../core/tenant/tenant.models';
import { TenantService } from '../../core/tenant/tenant.service';
import { TenantThemeService } from '../../core/tenant/tenant-theme.service';
import { MEDIA_PLACEHOLDER, offerPlaceholderPath, offerTypePlaceholderPath, tenantMediaPath } from '../../core/media/media-path';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';
import { BusinessNotFoundComponent } from '../business-not-found/business-not-found.component';

@Component({
  selector: 'app-tenant-offers',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, SiteShellComponent, BusinessNotFoundComponent],
  template: `
    <app-site-shell *ngIf="tenant; else notFound" [tenant]="tenant" [orderedSections]="[]">
      <section class="section offers-page">
        <div class="section-inner">
          <a class="back-link" [routerLink]="['/', tenant.code, tenant.username]">&larr; Back to {{ tenant.businessName }}</a>

          <div class="section-heading">
            <span class="section-kicker">Offers</span>
            <h1>Today's offers at {{ tenant.businessName }}</h1>
          </div>

          <div class="offers-page-grid" *ngIf="tenant.content.offers?.length; else empty">
            <article class="offer-card offer-card-large" *ngFor="let offer of tenant.content.offers; let i = index">
              <div class="offer-media">
                <img [src]="offerImage(offer, i)" [alt]="offer.title" loading="lazy" (error)="onImgError($event, offer)">
                <span *ngIf="offer.tag" class="offer-tag-chip">{{ offer.tag }}</span>
                <div class="offer-pill">
                  <strong class="offer-pill-title">{{ offer.title }}</strong>
                  <span *ngIf="offer.code" class="offer-pill-code">{{ offer.code }}</span>
                </div>
              </div>
              <div class="offer-body" *ngIf="offer.description">
                <p>{{ offer.description }}</p>
              </div>
            </article>
          </div>

          <ng-template #empty>
            <p>No offers right now — check back soon.</p>
          </ng-template>
        </div>
      </section>
    </app-site-shell>

    <ng-template #notFound>
      <app-business-not-found></app-business-not-found>
    </ng-template>
  `
})
export class TenantOffersComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tenantService = inject(TenantService);
  private readonly themeService = inject(TenantThemeService);

  tenant: TenantBusiness | null = null;

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.tenant = await this.tenantService.loadTenant(code, username);

    if (this.tenant) {
      this.themeService.applyTenant(this.tenant);
    } else {
      this.themeService.reset();
    }
  }

  offerImage(offer: TenantOffer, index: number): string {
    if (offer.image) {
      return offer.image;
    }

    return tenantMediaPath(this.tenant!.category, this.tenant!.code, `offer-${index + 1}`);
  }

  onImgError(event: Event, offer: TenantOffer): void {
    const img = event.target as HTMLImageElement;
    const category = this.tenant?.category ?? 'other';
    const stage = img.dataset['fallback'];

    if (!stage && offer.offerType) {
      img.dataset['fallback'] = 'type';
      img.src = offerTypePlaceholderPath(category, offer.offerType);
    } else if (stage !== 'category' && stage !== 'flat') {
      img.dataset['fallback'] = 'category';
      img.src = offerPlaceholderPath(category);
    } else {
      img.dataset['fallback'] = 'flat';
      img.src = MEDIA_PLACEHOLDER;
    }
  }
}
