
/**
 * @file tokens/typography.ts
 * @description Sellora Design Token System — Typography
 *
 * FONT STRATEGY:
 * ─────────────────────────────────────────────────────────────────
 * Interface Font: "Inter" (variable)
 *   WHY: Inter is the de-facto standard for SaaS dashboards (Linear, Vercel,
 *   Stripe, Notion). It has exceptional legibility at 12-14px (critical for
 *   data-dense UIs), a large glyph set, and ships as a variable font reducing
 *   HTTP requests. The tabular number feature (tnum) is essential for financial
 *   data in COD platforms.
 *
 * Mono Font: "JetBrains Mono" (variable)
 *   WHY: Used for order numbers, IDs, codes, API keys. Mono ensures columns
 *   align correctly in tables — not possible with proportional fonts.
 *
 * WHY NOT a display serif:
 *   Sellora is a Commerce Operating System, not a marketing site.
 *   A serif would feel editorial/warm, not operational/precise.
 *   Shopify's admin, Stripe's dashboard, and Linear all use pure sans-serif.
 *
 * TYPE SCALE RATIONALE:
 *   We use a modular scale at ~1.25 ratio (Major Third), not arbitrary pixel values.
 *   This creates visual harmony across all text sizes — each step is proportionally
 *   larger, not randomly chosen. Stripe uses this exact approach.
 */
 
// ─── FONT FAMILIES ────────────────────────────────────────────────────────────
 
export const fontFamily = {
  /**
   * PRIMARY: All UI text — labels, body, headings.
   * Fallback chain ensures font-matched rendering on all OS.
   */
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
    '"Noto Sans"',
    'sans-serif',
  ].join(', '),
 
  /**
   * MONO: Order numbers, IDs, API keys, code snippets, prices.
   * Tabular numbers (tnum) for financial data alignment.
   */
  mono: [
    '"JetBrains Mono"',
    '"Fira Code"',
    '"Cascadia Code"',
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
 
// ─── FONT SIZE SCALE ──────────────────────────────────────────────────────────
// Major Third scale (×1.25): 10 → 12 → 14 → 16 → 20 → 24 → 30 → 36 → 48 → 60
// Expressed in rem for accessibility (respects browser font-size preference).
 
export const fontSize = {
  /** 10px — tiny labels, keyboard shortcuts, version numbers. */
  '2xs': '0.625rem',
  /** 12px — captions, timestamps, metadata, table column headers. */
  xs:    '0.75rem',
  /** 13px — dense UI labels, sidebar navigation items. (Inter-specific sweet spot) */
  sm:    '0.8125rem',
  /** 14px — default body text. Optimal for dashboard reading. */
  base:  '0.875rem',
  /** 16px — body large, card descriptions, modal body. */
  lg:    '1rem',
  /** 20px — H4, section subheadings. */
  xl:    '1.25rem',
  /** 24px — H3, card titles, page subsection headers. */
  '2xl': '1.5rem',
  /** 30px — H2, page section titles. */
  '3xl': '1.875rem',
  /** 36px — H1, page-level titles. */
  '4xl': '2.25rem',
  /** 48px — Display, hero numbers, KPI metrics. */
  '5xl': '3rem',
  /** 60px — Display XL, landing/marketing moments inside the app. */
  '6xl': '3.75rem',
} as const;
 
// ─── FONT WEIGHT ──────────────────────────────────────────────────────────────
// WHY named weights not numbers:
// "font-semibold" in code is more semantic than "font-600".
// Inter variable font supports all weights smoothly.
 
export const fontWeight = {
  /** 400 — Default body copy. Most legible weight for long text. */
  normal:   '400',
  /** 450 — Inter has a beautiful 450 weight for UI labels (variable only). */
  ui:       '450',
  /** 500 — Slightly emphasized. Active nav item labels, form labels. */
  medium:   '500',
  /** 600 — Section headings, button labels, important data points. */
  semibold: '600',
  /** 700 — Page titles, strong emphasis, H1-H2. */
  bold:     '700',
} as const;
 
// ─── LINE HEIGHT ──────────────────────────────────────────────────────────────
// WHY specific named values:
// "tight" for headlines (we don't want gap above/below letters in large type).
// "normal" for single-line UI elements.
// "relaxed" for body paragraphs where reading comfort matters.
 
export const lineHeight = {
  /** 1 — Display numbers, single-line badges. No extra space. */
  none:     '1',
  /** 1.25 — H1, H2. Tight but readable for large text. */
  tight:    '1.25',
  /** 1.375 — H3, H4. Comfortable for medium headings. */
  snug:     '1.375',
  /** 1.5 — Body text. Optimal reading line height (WCAG 1.4.8). */
  normal:   '1.5',
  /** 1.625 — Long-form content, descriptions with multiple paragraphs. */
  relaxed:  '1.625',
  /** 2 — Spaced-out content, verbose descriptions. Rarely used in dashboards. */
  loose:    '2',
} as const;
 
// ─── LETTER SPACING ──────────────────────────────────────────────────────────
// WHY tracking tokens:
// Large display text needs negative tracking to look "set" not "floating".
// Small caps labels (ACTIVE, NEW) need positive tracking to be readable.
 
export const letterSpacing = {
  /** -0.05em — Display headings. Prevents large text from feeling loose. */
  tighter:  '-0.05em',
  /** -0.025em — H1, H2. Subtle tightening for professional density. */
  tight:    '-0.025em',
  /** 0em — Default. Body text, labels, UI elements. */
  normal:   '0em',
  /** 0.025em — Small labels, fine print. */
  wide:     '0.025em',
  /** 0.05em — UPPERCASE status labels, table headers. Improves legibility. */
  wider:    '0.05em',
  /** 0.1em — Extreme case: keyboard shortcuts, monospace tags. */
  widest:   '0.1em',
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSITE TYPOGRAPHY TOKENS
// These are the 1:1 mapping between design spec and implementation.
// Each token is a complete text style — designer says "H2", dev uses typeScale.h2.
// ═══════════════════════════════════════════════════════════════════════════════
 
export const typeScale = {
 
  /**
   * DISPLAY
   * Use: Dashboard KPIs (total revenue: ¥2.4M), onboarding hero numbers.
   * WHY: Numbers at this size must be scannable in < 1 second.
   * The negative tracking tightens what would otherwise feel like a parade of digits.
   */
  display: {
    fontSize:      fontSize['5xl'],    // 48px
    fontWeight:    fontWeight.bold,    // 700
    lineHeight:    lineHeight.tight,   // 1.25
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * H1 — Page Title
   * Use: "Orders", "Products", "Settings". One per page.
   * WHY: Tells users exactly where they are. Must be scannable from 2m away on a monitor.
   */
  h1: {
    fontSize:      fontSize['4xl'],    // 36px
    fontWeight:    fontWeight.bold,    // 700
    lineHeight:    lineHeight.tight,   // 1.25
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * H2 — Section Title
   * Use: "Recent Orders", "Top Products", section headers in settings pages.
   * WHY: Visual break between page sections. Heavier than H3 to create hierarchy.
   */
  h2: {
    fontSize:      fontSize['3xl'],    // 30px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.tight,   // 1.25
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * H3 — Subsection / Card Title
   * Use: Card headings, drawer titles, modal headings, sidebar section labels.
   * WHY: The most-used heading in dashboard UIs. Must be prominent without dominating.
   */
  h3: {
    fontSize:      fontSize['2xl'],    // 24px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.snug,    // 1.375
    letterSpacing: letterSpacing.tight, // -0.025em
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * H4 — Component Title
   * Use: Stat card labels ("Total Revenue"), form section headers, table titles.
   * WHY: Needed to differentiate from body text without being as heavy as H3.
   */
  h4: {
    fontSize:      fontSize.xl,        // 20px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.snug,    // 1.375
    letterSpacing: letterSpacing.normal, // 0
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * BODY LARGE
   * Use: Card descriptions, modal body text, onboarding explanations.
   * WHY: Slightly larger than body for readability in important long-form contexts.
   */
  bodyLarge: {
    fontSize:      fontSize.lg,        // 16px
    fontWeight:    fontWeight.normal,  // 400
    lineHeight:    lineHeight.relaxed, // 1.625
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * BODY — DEFAULT UI TEXT
   * Use: Table cell content, list items, form field values, general content.
   * WHY: 14px is the sweet spot for dashboard data density. 16px wastes vertical
   * space in data tables. 13px starts to strain without Inter's optical adjustments.
   * This is the single most-used text style in the entire product.
   */
  body: {
    fontSize:      fontSize.base,      // 14px
    fontWeight:    fontWeight.normal,  // 400
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * BODY MEDIUM — Emphasized body
   * Use: Form labels, important values, selected state text.
   */
  bodyMedium: {
    fontSize:      fontSize.base,      // 14px
    fontWeight:    fontWeight.medium,  // 500
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * SMALL
   * Use: Input helper text, character counts, secondary metadata.
   * WHY: Differentiated from body without being illegible. Passes AA at gray-500.
   */
  small: {
    fontSize:      fontSize.sm,        // 13px
    fontWeight:    fontWeight.normal,  // 400
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * CAPTION
   * Use: Timestamps ("2 hours ago"), image captions, footnotes, table column headers.
   * WHY: Needs to be readable but should never compete with body content.
   */
  caption: {
    fontSize:      fontSize.xs,        // 12px
    fontWeight:    fontWeight.normal,  // 400
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.wide, // 0.025em — helps legibility at small sizes
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * LABEL
   * Use: Form field labels, status badges, tag text, navigation item text.
   * WHY: Medium weight at small size = "important, but not dominant".
   * This is distinct from Caption (metadata) — Labels describe UI controls.
   */
  label: {
    fontSize:      fontSize.xs,        // 12px
    fontWeight:    fontWeight.medium,  // 500
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.wider, // 0.05em — standard for small caps labels
    fontFamily:    fontFamily.sans,
  },
 
  /**
   * OVERLINE / STATUS LABEL (uppercase category)
   * Use: Table header columns ("ORDER STATUS", "DATE"), section eyebrows.
   * WHY: Uppercase + wide tracking is the visual pattern for "category label" vs "content".
   * Users scan differently when they see uppercase — it signals "this is structure, not content".
   */
  overline: {
    fontSize:      fontSize.xs,        // 12px
    fontWeight:    fontWeight.semibold, // 600
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.widest, // 0.1em
    fontFamily:    fontFamily.sans,
    textTransform: 'uppercase' as const,
  },
 
  /**
   * CODE / MONO
   * Use: Order IDs (#ORD-10421), API keys, tracking numbers, SKUs.
   * WHY: Monospace ensures consistent character width — critical when users
   * are visually comparing two IDs side by side.
   */
  code: {
    fontSize:      fontSize.sm,        // 13px
    fontWeight:    fontWeight.normal,  // 400
    lineHeight:    lineHeight.normal,  // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamily.mono,
  },
 
} as const;
 
export type TypeScale = typeof typeScale;
export type TypeScaleKey = keyof TypeScale;
 