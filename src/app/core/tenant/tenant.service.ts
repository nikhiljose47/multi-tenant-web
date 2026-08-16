import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase-client';
import { TENANTS } from './tenant-registry';
import { TenantBusiness } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantService {
  async loadTenant(code: string, username: string): Promise<TenantBusiness | null> {
    const tenant = this.findByCode(code);
    if (!tenant || tenant.username !== username) {
      return null;
    }

    const { data } = await supabase
      .from('users')
      .select('business_name, avatar_url, business_images')
      .eq('business_website', `${code}/${username}`)
      .maybeSingle();

    if (!data) {
      return null;
    }

    return {
      ...tenant,
      businessName: data.business_name ?? tenant.businessName,
      logo: data.avatar_url ?? tenant.logo,
      content: {
        ...tenant.content,
        gallery: data.business_images?.length ? data.business_images : tenant.content.gallery
      }
    };
  }

  findByCode(code: string): TenantBusiness | null {
    return TENANTS.find((tenant) => tenant.code.toLowerCase() === code.toLowerCase()) ?? null;
  }

  getCanonicalUrl(tenant: TenantBusiness): string {
    return `/${tenant.code}/${tenant.username}`;
  }
}
