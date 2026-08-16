import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase-client';
import { TENANTS } from './tenant-registry';
import { BusinessCategory, TenantBusiness, TenantLayout, TenantTheme } from './tenant.models';

const DEFAULT_THEME: TenantTheme = {
  primary: '#2563eb',
  secondary: '#111827',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  headingFont: 'Inter Tight, Inter, sans-serif',
  bodyFont: 'Inter, Arial, sans-serif',
  borderRadius: '14px',
  buttonStyle: 'rounded',
  cardStyle: 'bordered'
};

const DEFAULT_LAYOUT: TenantLayout = {
  navigation: 'standard',
  hero: 'centered',
  services: 'grid',
  gallery: 'grid',
  footer: 'simple'
};

interface CategoryPreset {
  theme: TenantTheme;
  layout: TenantLayout;
  galleryFillers: string[];
}

const CATEGORY_PRESETS: Partial<Record<BusinessCategory, CategoryPreset>> = {
  food: {
    theme: {
      primary: '#c1440e',
      secondary: '#2b1810',
      background: '#fff8f0',
      surface: '#fff1e0',
      text: '#2b1810',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '20px',
      buttonStyle: 'pill',
      cardStyle: 'elevated'
    },
    layout: { navigation: 'standard', hero: 'full-image', services: 'grid', gallery: 'masonry', footer: 'detailed' },
    galleryFillers: ['Signature dish', 'Dining space', "Chef's special", 'Cozy corner']
  },
  shop: {
    theme: {
      primary: '#7c3aed',
      secondary: '#1f2937',
      background: '#ffffff',
      surface: '#f5f3ff',
      text: '#1f2937',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '16px',
      buttonStyle: 'rounded',
      cardStyle: 'elevated'
    },
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Storefront', 'Best sellers', 'New arrivals', 'Customer favorites']
  },
  auto: {
    theme: {
      primary: '#ef4444',
      secondary: '#111827',
      background: '#0b0b0f',
      surface: '#16161d',
      text: '#f5f5f5',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '10px',
      buttonStyle: 'square',
      cardStyle: 'bordered'
    },
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Service bay', 'Diagnostics', 'Detailing', 'Workshop']
  },
  service: {
    theme: {
      primary: '#f59e0b',
      secondary: '#0f172a',
      background: '#0c1220',
      surface: '#131b2c',
      text: '#f1f5f9',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '14px',
      buttonStyle: 'rounded',
      cardStyle: 'glass'
    },
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['On-site repair', 'Tools of the trade', 'Before & after', 'Certified technicians']
  },
  beauty: {
    theme: {
      primary: '#db2777',
      secondary: '#4a1942',
      background: '#fff5f8',
      surface: '#ffe4ec',
      text: '#4a1942',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '24px',
      buttonStyle: 'pill',
      cardStyle: 'elevated'
    },
    layout: { navigation: 'centered', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Salon interior', 'Treatment room', 'Finishing touches', 'Relax & unwind']
  },
  health: {
    theme: {
      primary: '#0d9488',
      secondary: '#0f172a',
      background: '#f0fdfa',
      surface: '#ccfbf1',
      text: '#0f172a',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '12px',
      buttonStyle: 'rounded',
      cardStyle: 'bordered'
    },
    layout: { navigation: 'standard', hero: 'centered', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Reception', 'Consultation room', 'Care team', 'Clean facility']
  },
  fitness: {
    theme: {
      primary: '#f97316',
      secondary: '#111827',
      background: '#0a0a0a',
      surface: '#161616',
      text: '#fafafa',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '999px',
      buttonStyle: 'pill',
      cardStyle: 'glass'
    },
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Training floor', 'Group sessions', 'Equipment', 'Results in progress']
  },
  learn: {
    theme: {
      primary: '#1d4ed8',
      secondary: '#78350f',
      background: '#f8fafc',
      surface: '#eef2ff',
      text: '#1e293b',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '14px',
      buttonStyle: 'rounded',
      cardStyle: 'bordered'
    },
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Classroom', 'One-on-one sessions', 'Study materials', 'Progress reviews']
  },
  space: {
    theme: {
      primary: '#92400e',
      secondary: '#1c1917',
      background: '#fafaf9',
      surface: '#f5f5f4',
      text: '#1c1917',
      headingFont: 'Georgia, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '8px',
      buttonStyle: 'square',
      cardStyle: 'flat'
    },
    layout: { navigation: 'compact', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'minimal' },
    galleryFillers: ['Entrance', 'Interior', 'Layout', 'Natural light']
  },
  travel: {
    theme: {
      primary: '#0284c7',
      secondary: '#0c4a6e',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '20px',
      buttonStyle: 'pill',
      cardStyle: 'elevated'
    },
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Destination view', 'Guest experience', 'Local flavor', 'Memories made']
  },
  event: {
    theme: {
      primary: '#9333ea',
      secondary: '#f59e0b',
      background: '#120a1f',
      surface: '#1e1033',
      text: '#f5f3ff',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '999px',
      buttonStyle: 'pill',
      cardStyle: 'glass'
    },
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Setup', 'The main moment', 'Crowd favorites', 'After dark']
  },
  biz: {
    theme: {
      primary: '#1e3a8a',
      secondary: '#0f172a',
      background: '#f8fafc',
      surface: '#eef2f7',
      text: '#0f172a',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '10px',
      buttonStyle: 'square',
      cardStyle: 'bordered'
    },
    layout: { navigation: 'standard', hero: 'centered', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Our office', 'The team at work', 'Client outcomes', 'Behind the scenes']
  }
};

@Injectable({ providedIn: 'root' })
export class TenantService {
  async loadTenant(code: string, username: string): Promise<TenantBusiness | null> {
    const staticTenant = this.findByCode(code);
    const escapedSuffix = `${code}/${username}`.replace(/[%_\\]/g, (match) => `\\${match}`);
    const { data, error } = await supabase
      .from('users')
      .select('business_name, business_category, business_phone, avatar_url, business_images')
      .like('business_website', `%/${escapedSuffix}`)
      .maybeSingle();

    if (error) {
      console.error('TenantService.loadTenant: Supabase query failed', error);
    }

    if (staticTenant && staticTenant.username === username) {
      if (!data) {
        return null;
      }

      return {
        ...staticTenant,
        businessName: data.business_name ?? staticTenant.businessName,
        phone: data.business_phone ?? staticTenant.phone,
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

    const category = (data.business_category as BusinessCategory) ?? 'other';
    const preset = CATEGORY_PRESETS[category];

    return {
      id: code,
      code,
      username,
      businessName: data.business_name ?? username,
      category,
      phone: data.business_phone ?? undefined,
      logo: data.avatar_url ?? undefined,
      services: [],
      theme: preset?.theme ?? DEFAULT_THEME,
      layout: preset?.layout ?? DEFAULT_LAYOUT,
      content: {
        sections: ['gallery', 'contact'],
        gallery: data.business_images?.length ? data.business_images : (preset?.galleryFillers ?? [])
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
