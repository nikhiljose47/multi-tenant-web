# Offer placeholder gradients

Generic, category-branded gradient artwork used as the fallback image for an
offer card when a tenant hasn't uploaded a real photo yet (`offer.image` unset
and `public/media/<category>/<tenant-code>/offer-N.jpg` missing).

## Design — "sunburst" (v6, no icons)

Bright poster-style sale-graphic backgrounds modeled on classic "Super Sale"
promo art: a radial burst (bright center fading to a richer edge), alternating
comb rays, and scattered confetti dots. Every file rotates across 3 light
palettes — **yellow / orange / sky-blue** — so nothing is ever dark or grey.
No icon or illustration of any kind is rendered; it's pure background art, on
the theory that the offer's own title/description/tag/code (rendered
separately as real text from the DB/content, on top of this image by the app)
is the only "subject" that belongs on the card.

## Two tiers

**1. Category only** — one SVG per `BusinessCategory` (see `tenant.models.ts`),
at the top level of this folder: `<category>.svg`, e.g. `food.svg`, `spa.svg`,
`hotel.svg`. Palette (yellow/orange/blue) and confetti layout are assigned
per category so adjacent categories don't repeat the same look.

**2. Category x offer type (sub-category)** — one SVG per `(category, OfferType)`
pair, in `<category>/<offerType>.svg`, e.g. `food/bogo.svg`, `spa/seasonal.svg`.
Same sunburst background as tier 1, plus a small plain colored corner circle
(no icon) that reads as the *kind* of offer regardless of category — the
badge color is consistent across every category (e.g. `bogo` is always the
same rose-pink circle, whether it's `food/bogo.svg` or `salon/bogo.svg`).

`OfferType` values (`tenant.models.ts`): `discount`, `bogo`, `combo`,
`flash-sale`, `new`, `seasonal`, `membership`, `clearance`, `freebie`.

## Fallback order

For an offer image (see `offerImage()` / `onImgError()` / `onOfferImgError()`
in `tenant-offers.component.ts` and `dynamic-section.component.ts`):

1. `offer.image` (explicit URL/path from content)
2. `public/media/<category>/<tenant-code>/offer-N.jpg` (real tenant photo)
3. `public/media/placeholders/offers/<category>/<offerType>.svg` — only if
   `offer.offerType` is set
4. `public/media/placeholders/offers/<category>.svg` (category only)
5. `public/media/placeholder.svg` (flat last-resort fallback)

Set `offerType` on an offer in content to opt into tier 3; leave it unset to
stay at the plain category gradient (tier 4).

## Regenerating

23 category files + 207 category x offer-type files (23 x 9 types) = 230 SVGs.
No extra dependencies needed (pure Python stdlib). Edit a palette/ray/confetti/
badge setting in `scripts/gen_offer_placeholders.py` and re-run:

```
python scripts/gen_offer_placeholders.py
```

To visually spot-check output after editing the generator (don't ship changes
unseen), render samples to PNG with headless Chromium and open them:

```
npm install --no-save playwright-chromium   # one-time, not saved to package.json
node scripts/render_previews.js             # writes .preview-out/*.png
```
