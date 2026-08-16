import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase-client';
import { TENANTS } from './tenant-registry';
import { BusinessCategory, TenantBusiness } from './tenant.models';

const DEFAULT_THEME = {
  primary: '#2563eb',
  secondary: '#111827',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  headingFont: 'Inter Tight, Inter, sans-serif',
  bodyFont: 'Inter, Arial, sans-serif',
  borderRadius: '14px',
  buttonStyle: 'rounded' as const,
  cardStyle: 'bordered' as const
};

const DEFAULT_LAYOUT = {
  navigation: 'standard' as const,
  hero: 'centered' as const,
  services: 'grid' as const,
  gallery: 'grid' as const,
  footer: 'simple' as const
};

@Injectable({ providedIn: 'root' })
export class TenantService {
  async loadTenant(code: string, username: string): Promise<TenantBusiness | null> {
    const staticTenant = this.findByCode(code);
    const { data } = await supabase
      .from('users')
      .select('business_name, business_category, avatar_url, business_images')
      .like('business_website', `%/${code}/${username}`)
      .maybeSingle();

    if (staticTenant && staticTenant.username === username) {
      if (!data) {
        return null;
      }

      return {
        ...staticTenant,
        businessName: data.business_name ?? staticTenant.businessName,
        logo: data.avatar_url ?? staticTenant.logo,
        content: {
          ...staticTenant.content,
          gallery: data.business_images?.length ? data.business_images : staticTenant.content.gallery
        }
      };
    }

    if (!data) {
      return null;
    }

    return {
      id: code,
      code,
      username,
      businessName: data.business_name ?? username,
      category: (data.business_category as BusinessCategory) ?? 'other',
      logo: data.avatar_url ?? undefined,
      services: [],
      theme: DEFAULT_THEME,
      layout: DEFAULT_LAYOUT,
      content: {
        sections: ['hero', 'gallery', 'contact'],
        gallery: data.business_images ?? []
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
