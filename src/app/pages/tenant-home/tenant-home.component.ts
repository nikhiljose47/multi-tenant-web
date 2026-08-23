import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantBusiness } from '../../core/tenant/tenant.models';
import { TenantService } from '../../core/tenant/tenant.service';
import { TenantThemeService } from '../../core/tenant/tenant-theme.service';
import { ArchetypeLayoutComponent } from '../../layouts/archetype-layout/archetype-layout.component';
import { BusinessNotFoundComponent } from '../business-not-found/business-not-found.component';

@Component({
  selector: 'app-tenant-home',
  standalone: true,
  imports: [NgIf, ArchetypeLayoutComponent, BusinessNotFoundComponent],
  template: `
    <app-archetype-layout *ngIf="tenant; else notFound" [tenant]="tenant"></app-archetype-layout>

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
