import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { TenantService } from '../../core/tenant/tenant.service';
import { TenantThemeService } from '../../core/tenant/tenant-theme.service';
import { AutoLayoutComponent } from '../../layouts/auto-layout/auto-layout.component';
import { BeautyLayoutComponent } from '../../layouts/beauty-layout/beauty-layout.component';
import { BikeServiceLayoutComponent } from '../../layouts/bike-service-layout/bike-service-layout.component';
import { BizLayoutComponent } from '../../layouts/biz-layout/biz-layout.component';
import { EventLayoutComponent } from '../../layouts/event-layout/event-layout.component';
import { FitnessLayoutComponent } from '../../layouts/fitness-layout/fitness-layout.component';
import { FoodLayoutComponent } from '../../layouts/food-layout/food-layout.component';
import { GenericLayoutComponent } from '../../layouts/generic-layout/generic-layout.component';
import { HealthLayoutComponent } from '../../layouts/health-layout/health-layout.component';
import { HotelLayoutComponent } from '../../layouts/hotel-layout/hotel-layout.component';
import { LearnLayoutComponent } from '../../layouts/learn-layout/learn-layout.component';
import { ServiceLayoutComponent } from '../../layouts/service-layout/service-layout.component';
import { ShopLayoutComponent } from '../../layouts/shop-layout/shop-layout.component';
import { SpaLayoutComponent } from '../../layouts/spa-layout/spa-layout.component';
import { SpaceLayoutComponent } from '../../layouts/space-layout/space-layout.component';
import { TravelLayoutComponent } from '../../layouts/travel-layout/travel-layout.component';
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
    FoodLayoutComponent,
    ShopLayoutComponent,
    AutoLayoutComponent,
    ServiceLayoutComponent,
    BeautyLayoutComponent,
    HealthLayoutComponent,
    FitnessLayoutComponent,
    LearnLayoutComponent,
    SpaceLayoutComponent,
    TravelLayoutComponent,
    EventLayoutComponent,
    BizLayoutComponent,
    HotelLayoutComponent,
    SpaLayoutComponent,
    TutorLayoutComponent,
    GenericLayoutComponent,
    BusinessNotFoundComponent
  ],
  template: `
    <ng-container *ngIf="tenant; else notFound" [ngSwitch]="tenant.category">
      <app-bike-service-layout *ngSwitchCase="'bike-wash'" [tenant]="tenant"></app-bike-service-layout>
      <app-food-layout *ngSwitchCase="'food'" [tenant]="tenant"></app-food-layout>
      <app-shop-layout *ngSwitchCase="'shop'" [tenant]="tenant"></app-shop-layout>
      <app-auto-layout *ngSwitchCase="'auto'" [tenant]="tenant"></app-auto-layout>
      <app-service-layout *ngSwitchCase="'service'" [tenant]="tenant"></app-service-layout>
      <app-beauty-layout *ngSwitchCase="'beauty'" [tenant]="tenant"></app-beauty-layout>
      <app-health-layout *ngSwitchCase="'health'" [tenant]="tenant"></app-health-layout>
      <app-fitness-layout *ngSwitchCase="'fitness'" [tenant]="tenant"></app-fitness-layout>
      <app-learn-layout *ngSwitchCase="'learn'" [tenant]="tenant"></app-learn-layout>
      <app-space-layout *ngSwitchCase="'space'" [tenant]="tenant"></app-space-layout>
      <app-travel-layout *ngSwitchCase="'travel'" [tenant]="tenant"></app-travel-layout>
      <app-event-layout *ngSwitchCase="'event'" [tenant]="tenant"></app-event-layout>
      <app-biz-layout *ngSwitchCase="'biz'" [tenant]="tenant"></app-biz-layout>
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
