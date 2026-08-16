# Multi Tenant Web

An Angular 19 static application for hosting many public business homepages from one Cloudflare Pages deployment.

Routes follow this format:

```text
/:code/:username
```

Demo tenants:

```text
/adq/royal-bike-wash
/k7x/grand-palace-hotel
/m2p/glow-wellness-spa
/t8r/math-with-rahul
```

## Run Locally

```bash
npm install
ng serve
```

Open `http://localhost:4200/adq/royal-bike-wash`.

## Build

```bash
ng build --configuration production
```

The build outputs to `dist/browser`.

## Cloudflare Pages

The app is a client-side SPA. `public/_redirects` contains:

```text
/* /index.html 200
```

That lets Cloudflare Pages serve deep links such as `/k7x/grand-palace-hotel` on direct open, refresh, or share.

## Architecture

Tenant data lives in `src/app/core/tenant/tenant-registry.ts`.

Core contracts live in `src/app/core/tenant/tenant.models.ts`:

- `TenantBusiness`
- `BusinessCategory`
- `TenantTheme`
- `TenantLayout`
- `TenantContent`

Lookup is isolated in `TenantService`, with short code as the stable public identifier and username as the canonical readable slug. If a code exists but the username is wrong, the app redirects to the canonical URL.

Rendering flows through `TenantHomeComponent`, which selects a category layout:

- `BikeServiceLayoutComponent`
- `HotelLayoutComponent`
- `SpaLayoutComponent`
- `TutorLayoutComponent`
- `GenericLayoutComponent`

Reusable sections are rendered by `DynamicSectionComponent` from each tenant's `content.sections` array.

## Add A New Business

Add a new object to `TENANTS` in `src/app/core/tenant/tenant-registry.ts`.

Required fields:

- `id`: internal only, not exposed in URLs
- `code`: short opaque public share code
- `username`: canonical public slug
- `businessName`
- `category`
- `services`
- `theme`
- `layout`
- `content.sections`

The frontend must not decode business meaning from the short code. Treat codes like `adq`, `x7k2`, or `h9bx` as opaque values generated elsewhere.

## Add A New Category

1. Add the category literal to `BusinessCategory` in `tenant.models.ts`.
2. Create a layout under `src/app/layouts/<category>-layout`.
3. Add the layout to the switch in `TenantHomeComponent`.
4. Add any category-specific section behavior to `DynamicSectionComponent` only when it is reusable.
5. Prefer data-driven sections, theme, and layout settings before adding one-off code.

## Replace Static Data With An API

Keep the UI unchanged and update `TenantService`.

Current static shape:

```typescript
findByCode(code: string): TenantBusiness | null
loadTenant(code: string, username: string): TenantBusiness | null
```

Future API shape can map to:

```text
GET /api/public/business/:code
```

The service should fetch by `code`, compare `username` with the returned canonical `username`, then either render or redirect.
