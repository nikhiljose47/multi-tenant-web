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

The app is a client-side SPA. `wrangler.jsonc` sets `not_found_handling: "single-page-application"`, which lets Cloudflare serve deep links such as `/k7x/grand-palace-hotel` on direct open, refresh, or share.

## Architecture

Tenant data lives in `src/app/core/tenant/tenant-registry.ts`.

Core contracts live in `src/app/core/tenant/tenant.models.ts`:

- `TenantBusiness`
- `BusinessCategory`
- `TenantTheme`
- `TenantLayout`
- `TenantContent`

Lookup is isolated in `TenantService`, with short code as the stable public identifier and username as the canonical readable slug. If a code exists but the username is wrong, the app redirects to the canonical URL.

Rendering flows through `TenantHomeComponent`, which renders every tenant with the single `ArchetypeLayoutComponent` (`src/app/layouts/archetype-layout/`). Category and visual layout are two independent axes:

- **Category** (`food`, `hotel`, `spa`, ...) drives content defaults (theme preset, section list) via `CATEGORY_PRESETS` / `CATEGORY_ARCHETYPES` in `tenant.service.ts` / `archetype-recommendations.ts`.
- **Layout archetype** (`tenant.layoutStyle`, one of 12: `simple`, `modern`, `classic`, `minimal`, `bold`, `elegant`, `friendly`, `editorial`, `dynamic`, `compact`, `immersive`, `organic`) drives structure — hero shape, spacing, typography scale, motion. Token definitions live in `archetype-tokens.ts` (`src/app/core/tenant/`); a tenant can use any archetype regardless of category. If `layoutStyle` is unset, it falls back to `CATEGORY_ARCHETYPES[category].default`.
- **Composition** (`tenant.composition`, one of 6: `balanced`, `story`, `catalog`, `conversion`, `showcase`, `directory`) reorders — never hides — the tenant's `content.sections`. `balanced` (the default when unset) leaves the author's order untouched; the other 5 each carry a priority list in `COMPOSITION_ORDER` (`composition-tokens.ts`) that sections are sorted by, with any section not named in the list keeping its original relative position at the end. Applied once in `ArchetypeLayoutComponent.orderedSections` and threaded down to `SiteShellComponent` so the nav links match the same order.

A tenant is fully described by four independent things: category, archetype, composition, and theme (`TenantTheme`, see `theme-presets.ts`) — plus its `content.sections` list, which the composition reorders but never edits.

Reusable sections are rendered by `DynamicSectionComponent` from each tenant's `content.sections` array. Most section markup is archetype-agnostic; a couple (`testimonials`, `offers`) additionally pick a visual variant from `SECTION_VARIANTS` (`section-variants.ts`) based on the tenant's archetype — same class-suffix pattern already used for `tenant.layout.gallery`/`services`, just archetype-driven instead of tenant-authored. Extend that file (and the matching CSS) when another section type needs its own per-archetype look.

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
2. Add a `CATEGORY_PRESETS` entry in `tenant.service.ts` (theme + section defaults) and a `CATEGORY_ARCHETYPES` entry in `archetype-recommendations.ts` (default + recommended archetypes). No new layout component needed — every category renders through `ArchetypeLayoutComponent`.
3. Add any category-specific section behavior to `DynamicSectionComponent` only when it is reusable.
4. Prefer data-driven sections, theme, and archetype settings before adding one-off code.

## Add A New Layout Archetype

1. Add the id to `ArchetypeId` in `archetype.models.ts`.
2. Add a token bundle to `ARCHETYPE_TOKENS` in `archetype-tokens.ts` (spacing/typography/surfaces/motion — no colors, those come from `theme-presets.ts`).
3. If it needs concrete CSS values not already covered, extend the scale maps in `archetype-css.ts`.
4. Reference it from `CATEGORY_ARCHETYPES` where it fits.

## Add A New Composition

1. Add the id to `CompositionId` in `composition.models.ts`.
2. Add a priority list to `COMPOSITION_ORDER` and a label to `COMPOSITION_DISPLAY_NAME` in `composition-tokens.ts`. List only the section types you want pulled forward — sections you don't list keep their original order at the end. Never remove a section outright; that's a content decision for the tenant author, not the composition.

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
