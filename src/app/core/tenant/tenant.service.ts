import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase-client';
import { TENANTS } from './tenant-registry';
import { BusinessCategory, TenantBusiness, TenantLayout, TenantOffer, TenantSection, TenantTheme } from './tenant.models';
import { THEME_PRESETS } from './theme-presets';
import { CATEGORY_ARCHETYPES } from './archetype-recommendations';

const DEFAULT_THEME: TenantTheme = THEME_PRESETS.ocean;

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
    theme: THEME_PRESETS.sunrise,
    layout: { navigation: 'standard', hero: 'full-image', services: 'grid', gallery: 'masonry', footer: 'detailed' },
    galleryFillers: ['Signature dish', 'Dining space', "Chef's special", 'Cozy corner']
  },
  restaurant: {
    theme: THEME_PRESETS.sunrise,
    layout: { navigation: 'standard', hero: 'full-image', services: 'grid', gallery: 'masonry', footer: 'detailed' },
    galleryFillers: ['Signature dish', 'Dining space', "Chef's special", 'Cozy corner']
  },
  shop: {
    theme: THEME_PRESETS.berry,
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Storefront', 'Best sellers', 'New arrivals', 'Customer favorites']
  },
  auto: {
    theme: THEME_PRESETS.midnight,
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Service bay', 'Diagnostics', 'Detailing', 'Workshop']
  },
  service: {
    theme: THEME_PRESETS.ocean,
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['On-site repair', 'Tools of the trade', 'Before & after', 'Certified technicians']
  },
  beauty: {
    theme: THEME_PRESETS.berry,
    layout: { navigation: 'centered', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Salon interior', 'Treatment room', 'Finishing touches', 'Relax & unwind']
  },
  health: {
    theme: THEME_PRESETS.meadow,
    layout: { navigation: 'standard', hero: 'centered', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Reception', 'Consultation room', 'Care team', 'Clean facility']
  },
  fitness: {
    theme: THEME_PRESETS.midnight,
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Training floor', 'Group sessions', 'Equipment', 'Results in progress']
  },
  learn: {
    theme: THEME_PRESETS.classic,
    layout: { navigation: 'standard', hero: 'split', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Classroom', 'One-on-one sessions', 'Study materials', 'Progress reviews']
  },
  space: {
    theme: THEME_PRESETS.classic,
    layout: { navigation: 'compact', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'minimal' },
    galleryFillers: ['Entrance', 'Interior', 'Layout', 'Natural light']
  },
  travel: {
    theme: THEME_PRESETS.ocean,
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Destination view', 'Guest experience', 'Local flavor', 'Memories made']
  },
  event: {
    theme: THEME_PRESETS.midnight,
    layout: { navigation: 'transparent', hero: 'full-image', services: 'grid', gallery: 'grid', footer: 'detailed' },
    galleryFillers: ['Setup', 'The main moment', 'Crowd favorites', 'After dark']
  },
  biz: {
    theme: THEME_PRESETS.classic,
    layout: { navigation: 'standard', hero: 'centered', services: 'grid', gallery: 'grid', footer: 'simple' },
    galleryFillers: ['Our office', 'The team at work', 'Client outcomes', 'Behind the scenes']
  }
};

@Injectable({ providedIn: 'root' })
export class TenantService {
  async loadTenant(code: string, username: string): Promise<TenantBusiness | null> {
    const staticTenant = this.findByCode(code);
    const escapedSuffix = `${code}/${username}`.replace(/[%_\\]/g, (match) => `\\${match}`);
    let { data, error } = await supabase
      .from('users')
      .select('business_name, business_category, business_phone, avatar_url, business_images, business_offers')
      .like('business_website', `%/${escapedSuffix}`)
      .maybeSingle();

    // 42703 = undefined column: the business_offers column hasn't been added to the DB yet.
    // Retry without it so tenant lookup keeps working until that migration lands.
    if (error && String(error.code) === '42703') {
      ({ data, error } = await supabase
        .from('users')
        .select('business_name, business_category, business_phone, avatar_url, business_images')
        .like('business_website', `%/${escapedSuffix}`)
        .maybeSingle());
    }

    if (error) {
      console.error('TenantService.loadTenant: Supabase query failed', error);
    }

    if (staticTenant && staticTenant.username === username) {
      if (!data) {
        return null;
      }

      const liveOffers = data.business_offers as TenantOffer[] | null;
      const offers = liveOffers?.length ? liveOffers : staticTenant.content.offers;
      const sections: TenantSection[] = offers?.length && !staticTenant.content.sections.includes('offers')
        ? [...staticTenant.content.sections, 'offers']
        : staticTenant.content.sections;

      return {
        ...staticTenant,
        businessName: data.business_name ?? staticTenant.businessName,
        phone: data.business_phone ?? staticTenant.phone,
        logo: data.avatar_url ?? staticTenant.logo,
        content: {
          ...staticTenant.content,
          sections,
          gallery: data.business_images?.length ? data.business_images : staticTenant.content.gallery,
          offers
        }
      };
    }

    if (!data) {
      return null;
    }

    const category = (data.business_category as BusinessCategory) ?? 'other';
    const preset = CATEGORY_PRESETS[category];
    const offers = (data.business_offers as TenantOffer[] | null) ?? undefined;
    const sections: TenantSection[] = offers?.length ? ['gallery', 'offers', 'contact'] : ['gallery', 'contact'];

    return {
      id: code,
      code,
      username,
      businessName: data.business_name ?? username,
      category,
      layoutStyle: CATEGORY_ARCHETYPES[category]?.default,
      phone: data.business_phone ?? undefined,
      logo: data.avatar_url ?? undefined,
      services: [],
      theme: preset?.theme ?? DEFAULT_THEME,
      layout: preset?.layout ?? DEFAULT_LAYOUT,
      content: {
        sections,
        gallery: data.business_images?.length ? data.business_images : (preset?.galleryFillers ?? []),
        offers
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
