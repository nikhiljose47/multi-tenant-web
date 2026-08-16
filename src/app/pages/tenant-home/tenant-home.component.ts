import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { TenantService } from '../../core/tenant/tenant.service';
import { TenantThemeService } from '../../core/tenant/tenant-theme.service';
import { BikeServiceLayoutComponent } from '../../layouts/bike-service-layout/bike-service-layout.component';
import { GenericLayoutComponent } from '../../layouts/generic-layout/generic-layout.component';
import { HotelLayoutComponent } from '../../layouts/hotel-layout/hotel-layout.component';
import { SpaLayoutComponent } from '../../layouts/spa-layout/spa-layout.component';
import { TutorLayoutComponent } from '../../layouts/tutor-layout/tutor-layout.component';
import { BusinessNotFoundComponent } from '../business-not-found/business-not-found.component';

@Component({
  selector: 'app-tenant-home',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    BikeServiceLayoutComponent,
    HotelLayoutComponent,
    SpaLayoutComponent,
    TutorLayoutComponent,
    GenericLayoutComponent,
    BusinessNotFoundComponent
  ],
  template: `
    <ng-container *ngIf="tenant; else notFound" [ngSwitch]="tenant.category">
      <app-bike-service-layout *ngSwitchCase="'bike-wash'" [tenant]="tenant"></app-bike-service-layout>
      <app-hotel-layout *ngSwitchCase="'hotel'" [tenant]="tenant"></app-hotel-layout>
      <app-spa-layout *ngSwitchCase="'spa'" [tenant]="tenant"></app-spa-layout>
      <app-tutor-layout *ngSwitchCase="'home-tuition'" [tenant]="tenant"></app-tutor-layout>
      <app-generic-layout *ngSwitchDefault [tenant]="tenant"></app-generic-layout>
    </ng-container>

    <ng-template #notFound>
      <app-business-not-found></app-business-not-found>
    </ng-template>
  `
})
export class TenantHomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tenantService = inject(TenantService);
  private readonly themeService = inject(TenantThemeService);

  tenant: TenantBusiness | null = null;

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    const tenantByCode = this.tenantService.findByCode(code);

    if (tenantByCode && tenantByCode.username !== username) {
      void this.router.navigateByUrl(this.tenantService.getCanonicalUrl(tenantByCode), { replaceUrl: true });
      return;
    }

    this.tenant = await this.tenantService.loadTenant(code, username);

    if (this.tenant) {
      this.themeService.applyTenant(this.tenant);
    } else {
      this.themeService.reset();
    }
  }
}
