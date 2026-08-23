import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { TenantService } from '../../core/tenant/tenant.service';
import { TenantThemeService } from '../../core/tenant/tenant-theme.service';
import { SiteShellComponent } from '../../shared/components/site-shell/site-shell.component';
import { BusinessNotFoundComponent } from '../business-not-found/business-not-found.component';

@Component({
  selector: 'app-tenant-location',
  standalone: true,
  imports: [NgIf, RouterLink, SiteShellComponent, BusinessNotFoundComponent],
  template: `
    <app-site-shell *ngIf="tenant; else notFound" [tenant]="tenant" [orderedSections]="[]">
      <section class="section location-page">
        <div class="section-inner">
          <a class="back-link" [routerLink]="['/', tenant.code, tenant.username]">&larr; Back to {{ tenant.businessName }}</a>

          <div class="section-heading">
            <span class="section-kicker">Find us</span>
            <h1>Come say hello at {{ tenant.businessName }}</h1>
          </div>

          <div class="location-page-body">
            <img *ngIf="tenant.coverImage" class="location-image" [src]="tenant.coverImage" [alt]="tenant.businessName">

            <div class="location-text">
              <p class="location-address">{{ tenant.address ?? tenant.city }}</p>
              <p *ngIf="tenant.address && tenant.city">{{ tenant.city }}</p>
            </div>

            <div #mapEl class="location-map"></div>
          </div>
        </div>
      </section>
    </app-site-shell>

    <ng-template #notFound>
      <app-business-not-found></app-business-not-found>
    </ng-template>
  `
})
export class TenantLocationComponent implements OnInit, OnDestroy {
  @ViewChild('mapEl') private readonly mapEl?: ElementRef<HTMLDivElement>;

  private readonly route = inject(ActivatedRoute);
  private readonly tenantService = inject(TenantService);
  private readonly themeService = inject(TenantThemeService);

  private map?: L.Map;
  tenant: TenantBusiness | null = null;

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.tenant = await this.tenantService.loadTenant(code, username);

    if (this.tenant) {
      this.themeService.applyTenant(this.tenant);
      setTimeout(() => this.initMap());
    } else {
      this.themeService.reset();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    if (!this.tenant || !this.mapEl || this.tenant.lat === undefined || this.tenant.lng === undefined) {
      return;
    }

    const position: L.LatLngExpression = [this.tenant.lat, this.tenant.lng];
    this.map = L.map(this.mapEl.nativeElement, { scrollWheelZoom: false }).setView(position, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker(position).addTo(this.map).bindPopup(this.tenant.businessName).openPopup();
  }
}
