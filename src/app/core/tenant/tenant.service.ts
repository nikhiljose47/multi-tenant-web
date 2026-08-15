import { Injectable } from '@angular/core';
import { TENANTS } from './tenant-registry';
import { TenantBusiness } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantService {
  loadTenant(code: string, username: string): TenantBusiness | null {
    const tenant = this.findByCode(code);
    if (!tenant || tenant.username !== username) {
      return null;
    }

    return tenant;
  }

  findByCode(code: string): TenantBusiness | null {
    return TENANTS.find((tenant) => tenant.code.toLowerCase() === code.toLowerCase()) ?? null;
  }

  getCanonicalUrl(tenant: TenantBusiness): string {
    return `/${tenant.code}/${tenant.username}`;
  }
}
