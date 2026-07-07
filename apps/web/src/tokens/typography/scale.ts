
/**
 * @file tokens/typography/scale.ts
 * @description Sellora Typography System — Complete Type Scale
 *
 * ═══════════════════════════════════════════════════════════════════
 * FONT SELECTION RATIONALE
 * ═══════════════════════════════════════════════════════════════════
 *
 * PRIMARY: Inter (Variable)
 * ─────────────────────────
 * WHY Inter over alternatives:
 *
 * vs. Geist (Vercel): Beautiful but too geometric for Arabic-adjacent
 *   markets. Inter has better coverage for Latin + extended characters.
 *
 * vs. Plus Jakarta Sans: Warmer, more rounded — reads as "startup/consumer".
 *   Sellora needs "enterprise/operational". Inter reads as software.
 *
 * vs. DM Sans: Too friendly. Works for B2C. Wrong for B2B SaaS.
 *
 * vs. Figtree: Newer, gaining traction, but less battle-tested at small sizes.
 *
 * Inter wins because:
 * 1. Designed specifically for screen readability (not adapted from print)
 * 2. Exceptional at 11-14px — critical for data-dense dashboard tables
 * 3. Tabular figures (tnum) — columns of numbers align perfectly
 * 4. Variable font — one file covers 100-900 weight, reducing HTTP requests
 * 5. Trusted by Linear, Vercel, Stripe, Notion, GitHub — proven at enterprise scale
 * 6. Open source, Google Fonts CDN, ZERO licensing risk
 * 7. The slightly compressed letterforms give more content per line on dashboards
 *
 * MONOSPACE: JetBrains Mono (Variable)
 * ──────────────────────────────────────
 * WHY JetBrains Mono:
 * 1. Wider characters than Fira Code — more legible at 12px for order IDs
 * 2. Distinctive ligatures help users recognize patterns in codes (optional via font-feature-settings)
 * 3. Variable font — covers 100-800 weight
 * 4. Explicitly designed for developer/data contexts (not just code editors)
 * 5. Better Arabic numeral rendering than Cascadia Code or Courier
 *
 * Used for: Order numbers (#ORD-10421), SKUs, API keys, tracking codes,
 *           financial amounts in tables, phone numbers, dates in data tables
 *
 * ═══════════════════════════════════════════════════════════════════
 * SCALE RATIONALE
 * ═══════════════════════════════════════════════════════════════════
 *
 * We use a HYBRID scale — not pure modular ratio, not arbitrary.
 * Reason: Pure 1.25 ratio gives values like 15.26px, 19.07px — awkward.
 * We snap to the nearest even pixel that maintains visual harmony.
 *
 * Scale: 10 → 11 → 12 → 13 → 14 → 16 → 18 → 20 → 24 → 28 → 32 → 36 → 40 → 48 → 56 → 64
 *
 * The jump from 14→16 is intentional: 14px is the dashboard default,
 * 16px is the comfortable reading default. There's a clear visual break.
 */
 
// ─── FONT FAMILIES ────────────────────────────────────────────────────────────
 
export const fontFamily = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(', '),
 
  mono: [
    '"JetBrains Mono"',
    '"Fira Code"',
    'ui-monospace',
    '"SFMono-Regular"',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(', '),
} as const;
 
// ─── RAW SCALE VALUES ─────────────────────────────────────────────────────────
 
export const fontSize = {
  '2xs':  '0.625rem',   // 10px
  'xs':   '0.6875rem',  // 11px
  'sm':   '0.75rem',    // 12px
  'md':   '0.8125rem',  // 13px
  'base': '0.875rem',   // 14px  ← dashboard default
  'lg':   '1rem',       // 16px  ← comfortable reading
  'xl':   '1.125rem',   // 18px
  '2xl':  '1.25rem',    // 20px
  '3xl':  '1.5rem',     // 24px
  '4xl':  '1.75rem',    // 28px
  '5xl':  '2rem',       // 32px
  '6xl':  '2.25rem',    // 36px
  '7xl':  '2.5rem',     // 40px
  '8xl':  '3rem',       // 48px
  '9xl':  '3.5rem',     // 56px
  '10xl': '4rem',       // 64px
} as const;
 
export const fontWeight = {
  thin:       '100',
  extralight: '200',
  light:      '300',
  normal:     '400',
  ui:         '450',  // Inter variable — ideal for UI labels
  medium:     '500',
  semibold:   '600',
  bold:       '700',
  extrabold:  '800',
  black:      '900',
} as const;
 
export const lineHeight = {
  none:     '1',
  tightest: '1.1',
  tighter:  '1.2',
  tight:    '1.25',
  snug:     '1.375',
  normal:   '1.5',
  relaxed:  '1.625',
  loose:    '1.75',
  looser:   '2',
} as const;
 
export const letterSpacing = {
  tightest: '-0.06em',
  tighter:  '-0.04em',
  tight:    '-0.025em',
  snug:     '-0.015em',
  normal:   '0em',
  wide:     '0.01em',
  wider:    '0.025em',
  widest:   '0.05em',
  ultra:    '0.1em',
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETE TYPE SCALE — All 16 styles
// ═══════════════════════════════════════════════════════════════════════════════
 
export const typeScale = {
 
  // ── DISPLAY ────────────────────────────────────────────────────────────────
 
  /**
   * DISPLAY XL — 64px / Bold / -0.04em
   *
   * USAGE: Hero KPI numbers ("$2.4M Revenue"), onboarding splash metrics,
   *        major success moments ("Your store is live!"), large counters.
   *
   * WHY THIS SIZE: At 64px, a number fills the visual center of a dashboard card.
   * Designed to be scannable from across the room on a mounted monitor.
   *
   * DESKTOP: 64px | TABLET: 48px | MOBILE: 36px
   * USE MAX: 1-2 instances per page. Never in tables or lists.
   */
  displayXl: {
    fontSize:      fontSize['10xl'],    // 64px
    fontWeight:    fontWeight.bold,     // 700
    lineHeight:    lineHeight.none,     // 1 — numbers don't need line height
    letterSpacing: letterSpacing.tighter, // -0.04em
    fontFamily:    fontFamily.sans,
    usage: 'Hero KPI metrics, splash numbers, major achievement moments',
  },
 
  /**
   * DISPLAY L — 56px / Bold / -0.04em
   *
   * USAGE: Dashboard hero metrics ("1,204 Orders Today"), chart headline numbers,
   *        revenue summaries, key performance indicators.
   *
   * DESKTOP: 56px | TABLET: 40px | MOBILE: 32px
   */
  displayL: {
    fontSize:      fontSize['9xl'],     // 56px
    fontWeight:    fontWeight.bold,     // 700
    lineHeight:    lineHeight.none,     // 1
    letterSpacing: letterSpacing.tighter, // -0.04em
    fontFamily:    fontFamily.sans,
    usage: 'Primary dashboard KPIs, chart headline values',
  },
 
  /**
   * DISPLAY M — 48px / Bold / -0.025em
   *
   * USAGE: Section-level metrics, stat card primary numbers, conversion rates.
   *
   * DESKTOP: 48px | TABLET: 36px | MOBILE: 28px
   */
  displayM: {
    fontSize:      fontSize['8xl'],     // 48px
    fontWeight:    fontWeight.bold,     // 700
    lineHeight:    lineHeight.tightest, // 1.1
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
    usage: 'Stat card numbers, section KPIs, percentage metrics',
  },
 
  // ── HEADINGS ───────────────────────────────────────────────────────────────
 
  /**
   * H1 — 36px / Bold / -0.025em
   *
   * USAGE: Page title. ONE per page. The single most important heading.
   * Examples: "Orders", "Products", "Customers", "Settings", "Analytics"
   *
   * RULE: Never use H1 inside a card. H1 lives at the page level only.
   * RULE: Always paired with a breadcrumb or page context indicator above it.
   *
   * DESKTOP: 36px | TABLET: 30px | MOBILE: 24px
   */
  h1: {
    fontSize:      fontSize['6xl'],     // 36px
    fontWeight:    fontWeight.bold,     // 700
    lineHeight:    lineHeight.tight,    // 1.25
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
    usage: 'Page title — one per page, never inside cards',
  },
 
  /**
   * H2 — 28px / SemiBold / -0.02em
   *
   * USAGE: Major page sections. "Recent Orders", "Top Products", "Analytics Overview".
   * Used when a page has multiple major content areas separated by visual breaks.
   *
   * RULE: At least 48px of space above H2. Preceded by a divider or large gap.
   * RULE: Never more than 3 H2s per page in a dashboard context.
   *
   * DESKTOP: 28px | TABLET: 24px | MOBILE: 20px
   */
  h2: {
    fontSize:      fontSize['4xl'],     // 28px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.tight,    // 1.25
    letterSpacing: letterSpacing.snug,  // -0.015em
    fontFamily:    fontFamily.sans,
    usage: 'Major page sections, dashboard widget groups',
  },
 
  /**
   * H3 — 24px / SemiBold / -0.015em
   *
   * USAGE: Card titles, drawer headers, modal headings, panel section headers,
   *        sidebar group labels when expanded.
   *
   * THE MOST USED heading in Sellora's UI.
   * Almost every card in the dashboard starts with an H3.
   *
   * DESKTOP: 24px | TABLET: 20px | MOBILE: 18px
   */
  h3: {
    fontSize:      fontSize['3xl'],     // 24px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.snug,     // 1.375
    letterSpacing: letterSpacing.snug,  // -0.015em
    fontFamily:    fontFamily.sans,
    usage: 'Card titles, modal headings, drawer headers — most common heading',
  },
 
  /**
   * H4 — 20px / SemiBold / -0.01em
   *
   * USAGE: Sub-sections within cards, form section headers ("Shipping Information",
   *        "Payment Details"), settings group titles, tab panel headings.
   *
   * DESKTOP: 20px | TABLET: 18px | MOBILE: 16px
   */
  h4: {
    fontSize:      fontSize['2xl'],     // 20px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.snug,     // 1.375
    letterSpacing: letterSpacing.snug,  // -0.015em
    fontFamily:    fontFamily.sans,
    usage: 'Form section headers, settings groups, card sub-sections',
  },
 
  /**
   * H5 — 16px / SemiBold / 0em
   *
   * USAGE: Small card headings, widget titles in compact mode, sidebar section
   *        category labels, inline panel headers, feature list headings.
   *
   * DESKTOP: 16px | TABLET: 16px | MOBILE: 15px
   */
  h5: {
    fontSize:      fontSize.lg,         // 16px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.snug,     // 1.375
    letterSpacing: letterSpacing.normal, // 0em
    fontFamily:    fontFamily.sans,
    usage: 'Compact widget titles, sidebar section labels, inline headers',
  },
 
  /**
   * H6 — 13px / SemiBold / 0.025em (uppercase recommended)
   *
   * USAGE: Table column headers (when styled as headings), form field group labels,
   *        sub-navigation category labels, filter section headers.
   *
   * NOTE: H6 often renders with letter-spacing: wider and text-transform: uppercase
   * in dashboard contexts to visually distinguish from body text.
   *
   * DESKTOP: 13px | TABLET: 13px | MOBILE: 12px
   */
  h6: {
    fontSize:      fontSize.md,         // 13px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.wider, // 0.025em
    fontFamily:    fontFamily.sans,
    usage: 'Table headers, filter labels, form group labels — often uppercase',
  },
 
  // ── BODY TEXT ──────────────────────────────────────────────────────────────
 
  /**
   * BODY XL — 18px / Normal / 0em
   *
   * USAGE: Onboarding explanations, empty state descriptions, modal lead text,
   *        feature descriptions in settings pages, announcement banners.
   *
   * WHY: When you need to make something feel "important but relaxed" — not
   * as heavy as a heading but clearly more significant than body text.
   *
   * DESKTOP: 18px | TABLET: 16px | MOBILE: 16px
   */
  bodyXl: {
    fontSize:      fontSize.xl,         // 18px
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.relaxed,  // 1.625
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
    usage: 'Onboarding text, empty states, modal lead text, feature descriptions',
  },
 
  /**
   * BODY LARGE — 16px / Normal / 0em
   *
   * USAGE: Card descriptions, notification body text, sidebar footer text,
   *        comment text, product descriptions (first paragraph).
   *
   * DESKTOP: 16px | TABLET: 16px | MOBILE: 15px
   */
  bodyLarge: {
    fontSize:      fontSize.lg,         // 16px
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.relaxed,  // 1.625
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
    usage: 'Card descriptions, notification body, product descriptions',
  },
 
  /**
   * BODY — 14px / Normal / 0em ← THE DEFAULT
   *
   * USAGE: Everything. Table cells, list items, form values, navigation items,
   *        dropdown options, tooltip content, activity feed text.
   *
   * WHY 14px not 16px: At 14px, a standard 1440px dashboard can show
   * ~30% more content per row vs 16px. Every table column header, every
   * data cell, every sidebar nav label defaults to 14px.
   * This is the Inter "sweet spot" for dashboard density.
   *
   * THIS IS THE MOST IMPORTANT STYLE IN THE ENTIRE SYSTEM.
   *
   * DESKTOP: 14px | TABLET: 14px | MOBILE: 14px (never goes smaller)
   */
  body: {
    fontSize:      fontSize.base,       // 14px ← DO NOT CHANGE
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
    usage: 'EVERYTHING. The universal default. Table cells, lists, nav, inputs',
  },
 
  /**
   * BODY MEDIUM — 14px / Medium / 0em
   *
   * USAGE: Active navigation labels, selected dropdown option, form labels
   *        that need slight emphasis, column header in default (not uppercase) tables.
   */
  bodyMedium: {
    fontSize:      fontSize.base,       // 14px
    fontWeight:    fontWeight.medium,   // 500
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
    usage: 'Active nav items, selected states, emphasized body text',
  },
 
  /**
   * BODY SMALL — 13px / Normal / 0em
   *
   * USAGE: Secondary table cell content, helper text below inputs, timestamp
   *        detail, file size, character count, secondary metadata.
   *
   * DESKTOP: 13px | TABLET: 13px | MOBILE: 12px
   */
  bodySmall: {
    fontSize:      fontSize.md,         // 13px
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
    usage: 'Helper text, secondary metadata, file info, character counts',
  },
 
  // ── MICRO TEXT ─────────────────────────────────────────────────────────────
 
  /**
   * CAPTION — 12px / Normal / 0.01em
   *
   * USAGE: Image captions, chart axis labels, footnotes, legal text at bottom of page,
   *        tooltip fine print, "Last updated: 2 minutes ago" timestamps.
   *
   * ACCESSIBILITY: Caption on gray-500 background FAILS AA. Always use on white
   * or pair with gray-600+ text color.
   *
   * MINIMUM: Never go below 12px in any context. 11px is only for print.
   *
   * DESKTOP: 12px | TABLET: 12px | MOBILE: 12px (fixed — never scales down)
   */
  caption: {
    fontSize:      fontSize.sm,         // 12px
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.wide,  // 0.01em — improves legibility at small size
    fontFamily:    fontFamily.sans,
    usage: 'Timestamps, footnotes, chart labels, fine print',
  },
 
  /**
   * LABEL — 12px / Medium / 0.025em
   *
   * USAGE: Form field labels above inputs, status badge text, tag text,
   *        button label text in compact contexts, chip/pill content.
   *
   * VISUAL RULE: Labels in Sellora are always Medium weight to visually
   * distinguish from Caption (which is Normal weight).
   * SAME size — different weight = different visual purpose.
   *
   * DESKTOP: 12px | TABLET: 12px | MOBILE: 12px
   */
  label: {
    fontSize:      fontSize.sm,         // 12px
    fontWeight:    fontWeight.medium,   // 500
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.wider, // 0.025em
    fontFamily:    fontFamily.sans,
    usage: 'Form labels, badge text, tag content, chip labels',
  },
 
  /**
   * OVERLINE — 11px / SemiBold / 0.08em / UPPERCASE
   *
   * USAGE: Table column headers (ORDER STATUS, CUSTOMER, DATE),
   *        section category eyebrows ("RECENT ACTIVITY"),
   *        filter group labels ("SORT BY"), metric card section labels.
   *
   * WHY UPPERCASE: The uppercase + wide tracking combination is the universal
   * signal for "this is a category/header, not content". Users scan differently
   * when they see all-caps — it signals structural information, not readable text.
   *
   * WHY 11px not 12px: At uppercase with wide tracking, 11px reads as legibly
   * as 12px normal case. The tracking compensates for the smaller size.
   *
   * DESKTOP: 11px | TABLET: 11px | MOBILE: 10px
   */
  overline: {
    fontSize:      fontSize.xs,         // 11px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.ultra, // 0.1em — CRITICAL for uppercase legibility
    fontFamily:    fontFamily.sans,
    textTransform: 'uppercase' as const,
    usage: 'Table headers, section eyebrows, filter labels — ALWAYS UPPERCASE',
  },
 
  // ── SPECIAL PURPOSE ────────────────────────────────────────────────────────
 
  /**
   * CODE / MONO — 13px / Normal / 0em (JetBrains Mono)
   *
   * USAGE: Order IDs (#ORD-10421), API keys, tracking numbers, SKU codes,
   *        phone numbers in data tables, IP addresses, version numbers.
   *
   * ACCESSIBILITY: Monospace signals "this is an identifier, not prose".
   * Users expect to be able to copy mono text.
   */
  code: {
    fontSize:      fontSize.md,         // 13px
    fontWeight:    fontWeight.normal,   // 400
    lineHeight:    lineHeight.normal,   // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.mono,
    usage: 'Order IDs, API keys, SKUs, codes, technical identifiers',
  },
 
  /**
   * NUMERIC / TABULAR — 14px / Medium / -0.01em (Inter tnum)
   *
   * USAGE: Prices in tables, order quantities, financial data, percentage values.
   * The font-feature-settings enables tabular numbers — all digits same width.
   * This ensures columns of numbers align perfectly vertically.
   *
   * WHY NOT regular body: Regular Inter uses proportional numbers — "1" is
   * narrower than "0". In a table column, this causes numbers to misalign.
   * tnum makes every digit the same width. Essential for financial data.
   */
  numeric: {
    fontSize:        fontSize.base,       // 14px
    fontWeight:      fontWeight.medium,   // 500
    lineHeight:      lineHeight.normal,   // 1.5
    letterSpacing:   letterSpacing.snug,  // -0.015em
    fontFamily:      fontFamily.sans,
    fontFeatureSettings: '"tnum" 1',      // TABULAR NUMBERS — the whole point
    usage: 'Prices, quantities, financial data, percentage columns in tables',
  },
 
} as const;
 
export type TypeScaleKey = keyof typeof typeScale;
export type TypeScale = typeof typeScale;
 