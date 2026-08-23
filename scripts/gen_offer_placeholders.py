"""
Generates the offer placeholder artwork:
  public/media/placeholders/offers/<category>.svg                 (23 files)
  public/media/placeholders/offers/<category>/<offerType>.svg     (23 x 9 = 207 files)

Design system (v9 — three rotating styles): each category is assigned ONE of
three background styles, interleaved so the same style never runs twice in a
row, in a fixed ~30/35/35 split across the 23 categories:

  - "banner"   (~30%, 7 categories)  — solid saturated color + soft blob +
                motion-line accents, modeled on a "Black Friday 30% OFF" banner.
  - "sunburst" (~35%, 8 categories)  — bright radial burst + comb rays +
                confetti, modeled on a "Super Sale" poster, rotating yellow/
                orange/sky-blue.
  - "ribbon"   (~35%, 8 categories)  — white background + faint grey sunburst
                + folded navy ribbon banner, modeled on a "Special Offer
                50% Off" ribbon tag, rotating 6 accent colors.

None of the three bake in any tag/title/price text or icon glyph on the main
canvas — the real offer.tag/title/code render as live HTML on top of the
image (see .offer-tag-chip / .offer-pill in styles.scss). Tier-2 files add a
small colored icon badge in the top-RIGHT corner (every style, since the real
UI always renders its own tag chip top-left, regardless of background style).
"""
import os
import re
import math
import random

REPO_ROOT = r"C:/tmp/multi-tenant-web"
ICONS_DIR = os.path.join(REPO_ROOT, "node_modules/lucide-static/icons")
OUT_DIR = os.path.join(REPO_ROOT, "public/media/placeholders/offers")
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 800, 500


def load_icon(name):
    with open(os.path.join(ICONS_DIR, f"{name}.svg"), encoding="utf-8") as f:
        text = f.read()
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    return re.search(r"<svg[^>]*>(.*)</svg>", text, re.S).group(1).strip()


DEFS = """
    <filter id="blurLg" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
    <filter id="blurSm" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <filter id="blurRays" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
"""

CATEGORIES = [
    "bike-wash", "car-wash", "hotel", "spa", "salon", "home-tuition", "restaurant", "gym",
    "clinic", "retail", "service", "food", "shop", "beauty", "health", "fitness", "learn",
    "auto", "space", "travel", "event", "biz", "other",
]

# fixed interleaved assignment: 8 sunburst / 8 ribbon / 7 banner, never two
# alike in a row — "S R B" repeated, with a trailing "S R" to hit the counts.
STYLE_CYCLE = ["sunburst", "ribbon", "banner"]
STYLE_FOR_CATEGORY = {
    category: STYLE_CYCLE[idx % 3] if idx < 21 else ["sunburst", "ribbon"][idx - 21]
    for idx, category in enumerate(CATEGORIES)
}

# ---------------------------------------------------------------------------
# style 1: "banner" — solid color + soft blob + motion lines
# ---------------------------------------------------------------------------

BANNER_PALETTES = [
    dict(base="#1c1fd6", blob="#2f31e0", accent="#ffcc00"),   # royal blue / gold
    dict(base="#7c1fa8", blob="#8f2fbe", accent="#ffd23f"),   # violet / gold
    dict(base="#0f7a4d", blob="#189a63", accent="#ffe27a"),   # emerald / pale gold
    dict(base="#c81e4a", blob="#e0325f", accent="#ffcf5c"),   # crimson / gold
    dict(base="#0c6e7a", blob="#158c99", accent="#7fe8ef"),   # teal / cyan
    dict(base="#4a2fb8", blob="#5d3fd0", accent="#ffb85c"),   # indigo / amber
]


def banner_blob_svg(color, seed):
    rng = random.Random(f"blob:{seed}")
    cx = rng.randint(int(W * 0.55), int(W * 0.85))
    cy = rng.randint(int(H * 0.25), int(H * 0.75))
    rx, ry = rng.randint(220, 300), rng.randint(150, 220)
    rot = rng.randint(-25, 25)
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{color}" fill-opacity="0.55" ' \
           f'filter="url(#blurLg)" transform="rotate({rot} {cx} {cy})"/>'


def banner_motion_lines_svg(accent):
    lines = []
    for (x, y, w) in [(26, 40, 70), (46, 52, 40), (26, 452, 70), (46, 440, 40)]:
        x2 = x + w
        lines.append(f'<line x1="{x}" y1="{y}" x2="{x2}" y2="{y - 14}" stroke="{accent}" '
                      f'stroke-opacity="0.8" stroke-width="5" stroke-linecap="round"/>')
    return "\n    ".join(lines)


def render_banner(seed, index):
    palette = BANNER_PALETTES[index % len(BANNER_PALETTES)]
    return f"""
    <rect width="{W}" height="{H}" fill="{palette['base']}"/>
    {banner_blob_svg(palette['blob'], seed)}
    {banner_motion_lines_svg(palette['accent'])}
    """


# ---------------------------------------------------------------------------
# style 2: "sunburst" — bright radial burst + comb rays + confetti
# ---------------------------------------------------------------------------

SUNBURST_PALETTES = {
    "yellow": dict(center="#fffbe0", mid="#ffd23f", edge="#f5a300",
                    confetti=["#ec4899", "#06b6d4", "#ffffff", "#7c3aed"]),
    "orange": dict(center="#fff3df", mid="#ff9a3c", edge="#e8590c",
                    confetti=["#ffffff", "#06b6d4", "#ffe27a", "#d6336c"]),
    "blue":   dict(center="#eaf9ff", mid="#4fc3f7", edge="#0288d1",
                    confetti=["#ffffff", "#ffd23f", "#ec4899", "#a5f3fc"]),
}
SUNBURST_ORDER = ["yellow", "orange", "blue"]
SUN_CX, SUN_CY = W * 0.5, H * 0.48


def sunburst_rays_svg(colors):
    n = 20
    half_deg = 3.4
    spikes = []
    for i in range(n):
        angle = (360 / n) * i
        length = 520 if i % 2 == 0 else 380
        color = "#ffffff" if i % 4 != 2 else colors[i % len(colors)]
        opacity = 0.5 if color == "#ffffff" else 0.32
        a0 = math.radians(angle - half_deg)
        a1 = math.radians(angle + half_deg)
        x1, y1 = SUN_CX + length * math.cos(a0), SUN_CY + length * math.sin(a0)
        x2, y2 = SUN_CX + length * math.cos(a1), SUN_CY + length * math.sin(a1)
        spikes.append(f'<polygon points="{SUN_CX},{SUN_CY} {x1:.0f},{y1:.0f} {x2:.0f},{y2:.0f}" fill="{color}" fill-opacity="{opacity}"/>')
    return "\n    ".join(spikes)


def sunburst_confetti_svg(colors, seed):
    rng = random.Random(f"confetti:{seed}")
    dots = []
    for i in range(16):
        while True:
            x = rng.randint(30, W - 30)
            y = rng.randint(24, H - 24)
            if math.hypot(x - SUN_CX, y - SUN_CY) > 190:
                break
        r = rng.choice([4, 5, 6, 7, 9])
        color = rng.choice(colors)
        op = round(rng.uniform(0.7, 1.0), 2)
        dots.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}" fill-opacity="{op}"/>')
    return "\n    ".join(dots)


def render_sunburst(seed, index):
    palette = SUNBURST_PALETTES[SUNBURST_ORDER[index % len(SUNBURST_ORDER)]]
    grad_id = f"burst-{seed}"
    return f"""
    <radialGradient id="{grad_id}" cx="50%" cy="46%" r="72%">
      <stop offset="0%" stop-color="{palette['center']}"/>
      <stop offset="55%" stop-color="{palette['mid']}"/>
      <stop offset="100%" stop-color="{palette['edge']}"/>
    </radialGradient>
    <rect width="{W}" height="{H}" fill="url(#{grad_id})"/>
    {sunburst_rays_svg(palette['confetti'])}
    {sunburst_confetti_svg(palette['confetti'], seed)}
    """


# ---------------------------------------------------------------------------
# style 3: "ribbon" — white bg + faint grey rays + folded navy ribbon tag
# ---------------------------------------------------------------------------

NAVY = "#1b2350"
NAVY_FOLD = "#12173a"
RIBBON_ACCENTS = ["#ffcc00", "#06b6d4", "#ff5a5f", "#8b5cf6", "#22c55e", "#ec4899"]
RIB_CX, RIB_CY = W * 0.5, H * 0.5


def ribbon_rays_svg():
    n = 28
    half_deg = 2.0
    spikes = []
    for i in range(n):
        angle = (360 / n) * i
        length = 560
        a0 = math.radians(angle - half_deg)
        a1 = math.radians(angle + half_deg)
        x1, y1 = RIB_CX + length * math.cos(a0), RIB_CY + length * math.sin(a0)
        x2, y2 = RIB_CX + length * math.cos(a1), RIB_CY + length * math.sin(a1)
        spikes.append(f'<polygon points="{RIB_CX},{RIB_CY} {x1:.0f},{y1:.0f} {x2:.0f},{y2:.0f}" fill="#94a3b8" fill-opacity="0.10"/>')
    return "\n    ".join(spikes)


def ribbon_plus_svg(x, y, size, color, opacity):
    s = size
    return (f'<g stroke="{color}" stroke-opacity="{opacity}" stroke-width="{max(2, s * 0.22):.1f}" stroke-linecap="round">'
            f'<line x1="{x - s}" y1="{y}" x2="{x + s}" y2="{y}"/>'
            f'<line x1="{x}" y1="{y - s}" x2="{x}" y2="{y + s}"/>'
            f'</g>')


def ribbon_decor_svg(seed, accent):
    rng = random.Random(f"decor:{seed}")
    items = []
    colors = [NAVY, accent, "#cbd5e1"]
    for _ in range(5):
        while True:
            x = rng.randint(40, W - 40)
            y = rng.randint(40, H - 40)
            if math.hypot(x - RIB_CX, y - RIB_CY) > 230:
                break
        items.append(ribbon_plus_svg(x, y, rng.choice([9, 11, 13]), rng.choice(colors), round(rng.uniform(0.35, 0.6), 2)))
    for _ in range(6):
        while True:
            x = rng.randint(40, W - 40)
            y = rng.randint(40, H - 40)
            if math.hypot(x - RIB_CX, y - RIB_CY) > 220:
                break
        r = rng.choice([4, 5, 6])
        color = rng.choice(colors)
        items.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}" fill-opacity="{round(rng.uniform(0.4, 0.75), 2)}"/>')
    return "\n    ".join(items)


def ribbon_shape_svg(accent, rot=-6):
    return f"""
    <ellipse cx="{RIB_CX}" cy="{RIB_CY + 78}" rx="260" ry="34" fill="#0f172a" fill-opacity="0.16" filter="url(#blurSm)"/>
    <g transform="translate({RIB_CX},{RIB_CY}) rotate({rot})">
      <polygon points="-255,-58 215,-58 275,0 215,58 -255,58" fill="{NAVY}"/>
      <polygon points="-255,58 -292,92 -222,58" fill="{NAVY_FOLD}"/>
      <polygon points="-270,-96 -55,-96 -95,-30 -300,-30" fill="{accent}"/>
      <line x1="-255" y1="-58" x2="215" y2="-58" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>
    </g>
    <polygon points="{RIB_CX + 250},{RIB_CY - 150} {RIB_CX + 300},{RIB_CY - 122} {RIB_CX + 244},{RIB_CY - 96}" fill="#ef4444"/>
    """


def render_ribbon(seed, index):
    accent = RIBBON_ACCENTS[index % len(RIBBON_ACCENTS)]
    return f"""
    <rect width="{W}" height="{H}" fill="#f8fafc"/>
    {ribbon_rays_svg()}
    {ribbon_decor_svg(seed, accent).strip()}
    {ribbon_shape_svg(accent).strip()}
    """


# ---------------------------------------------------------------------------
# dispatch + generation
# ---------------------------------------------------------------------------

RENDERERS = {"banner": render_banner, "sunburst": render_sunburst, "ribbon": render_ribbon}


def background_for(category, style_index):
    style = STYLE_FOR_CATEGORY[category]
    return style, RENDERERS[style](category, style_index).strip()


TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{category} offer">
  <defs>{defs}</defs>
  {background}
</svg>
"""

_style_counters = {"banner": 0, "sunburst": 0, "ribbon": 0}
category_background = {}
for category in CATEGORIES:
    style = STYLE_FOR_CATEGORY[category]
    style_index = _style_counters[style]
    _style_counters[style] += 1
    _, bg = background_for(category, style_index)
    category_background[category] = bg
    svg = TEMPLATE.format(w=W, h=H, category=category, defs=DEFS, background=bg)
    with open(os.path.join(OUT_DIR, f"{category}.svg"), "w", encoding="utf-8") as f:
        f.write(svg)

counts = {s: list(STYLE_FOR_CATEGORY.values()).count(s) for s in RENDERERS}
print("done:", len(CATEGORIES), "category placeholders —", counts)

# ---------------------------------------------------------------------------
# offer-type badges (sub-category, independent of business category) — always
# top-RIGHT, since the real UI always renders its own tag chip top-left.
# ---------------------------------------------------------------------------

OFFER_TYPES = {
    "discount":   ("#b45309", "badge-percent"),
    "bogo":       ("#be185d", "tags"),
    "combo":      ("#6d28d9", "package"),
    "flash-sale": ("#b91c1c", "zap"),
    "new":        ("#047857", "sparkle"),
    "seasonal":   ("#c2410c", "leaf"),
    "membership": ("#a16207", "crown"),
    "clearance":  ("#334155", "tag"),
    "freebie":    ("#0e7490", "gift"),
}

BADGE_CX, BADGE_CY, BADGE_R = W - 90, 90, 44

TEMPLATE_TYPE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{category} {offer_type} offer">
  <defs>{defs}</defs>
  {background}
  <ellipse cx="{badge_cx2}" cy="{badge_cy2}" rx="48" ry="44" fill="#000" fill-opacity="0.18" filter="url(#blurSm)"/>
  <circle cx="{badge_cx}" cy="{badge_cy}" r="{badge_r}" fill="{badge_color}"/>
  <circle cx="{badge_cx}" cy="{badge_cy}" r="{badge_r}" fill="none" stroke="#ffffff" stroke-width="3.5"/>
  <g transform="translate({badge_cx},{badge_cy}) scale(1.85) translate(-12,-12)" fill="none" stroke="#ffffff" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" color="#ffffff">
    {badge_icon}
  </g>
</svg>
"""

type_count = 0
for category in CATEGORIES:
    cat_dir = os.path.join(OUT_DIR, category)
    os.makedirs(cat_dir, exist_ok=True)
    background = category_background[category]
    for offer_type, (badge_color, badge_icon_name) in OFFER_TYPES.items():
        svg = TEMPLATE_TYPE.format(
            w=W, h=H, category=category, offer_type=offer_type, defs=DEFS, background=background,
            badge_cx=BADGE_CX, badge_cy=BADGE_CY, badge_r=BADGE_R,
            badge_cx2=BADGE_CX + 2, badge_cy2=BADGE_CY + 6,
            badge_color=badge_color, badge_icon=load_icon(badge_icon_name)
        )
        with open(os.path.join(cat_dir, f"{offer_type}.svg"), "w", encoding="utf-8") as f:
            f.write(svg)
        type_count += 1

print("done:", type_count, "category x offer-type placeholders")
