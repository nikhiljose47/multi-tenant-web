# Tenant media folder

Drop real photos here to replace the default placeholder for a specific tenant.
Path convention (all optional — anything missing just falls back to `placeholder.svg`):

```
public/media/<category>/<tenant-code>/cover.jpg
public/media/<category>/<tenant-code>/gallery-1.jpg
public/media/<category>/<tenant-code>/gallery-2.jpg
public/media/<category>/<tenant-code>/gallery-3.jpg
public/media/<category>/<tenant-code>/gallery-4.jpg
public/media/<category>/<tenant-code>/menu/<item-slug>.jpg   (food/restaurant menu items)
```

Example for the demo tenant `q9f` (category `food`):

```
public/media/food/q9f/cover.jpg
public/media/food/q9f/gallery-1.jpg
public/media/food/q9f/menu/6pc-crispy-bucket.jpg
```

`<category>` is the tenant's `BusinessCategory` value (e.g. `food`, `hotel`, `spa`).
`<tenant-code>` is the tenant's `code` field in `tenant-registry.ts`.
`<item-slug>` is the menu item's `name`, lowercased with spaces replaced by `-`.
