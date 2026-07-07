
/**
 * @file tokens/spacing/primitives.ts
 * @description Sellora Spacing System — Primitive Scale
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE 8px GRID PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * WHY 8px AS THE BASE UNIT:
 *
 * 1. SCREEN DIVISIBILITY
 *    The most common screen widths (360, 375, 390, 414, 768, 1024, 1280, 1440,
 *    1920px) are all cleanly divisible by 8. This means components sized in
 *    multiples of 8 align to a perfect grid on every device — zero subpixel
 *    rendering artifacts.
 *
 * 2. ICON ALIGNMENT
 *    Standard icon libraries (Lucide, Heroicons, Phosphor) export at 16px, 20px,
 *    and 24px — all multiples of 8. An 8px grid means icons ALWAYS sit on the
 *    grid without adjustment hacks.
 *
 * 3. HUMAN PERCEPTION
 *    Research from Material Design and Shopify Polaris confirms that the human
 *    eye perceives spacing differences of less than 4px as identical in UI
 *    contexts. The 8px step creates perceptible visual rhythm. The sub-8 values
 *    (2, 4, 6) exist for micro-adjustments within components, not layout.
 *
 * 4. INDUSTRY STANDARD
 *    Shopify Polaris: 4px base, 8px standard step.
 *    Google Material: 8px base grid.
 *    Apple HIG: 8px spatial unit.
 *    IBM Carbon: 8px base.
 *    GitHub Primer: 8px grid.
 *    Linear, Stripe, Vercel: all 8px-aligned.
 *
 * 5. MATH SIMPLICITY
 *    Multiples of 8 in rem (at 16px base):
 *    8px = 0.5rem, 16px = 1rem, 24px = 1.5rem, 32px = 2rem
 *    These are round numbers — no 0.9375rem confusion.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE TWO-TIER SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * TIER 1 — MICRO (0-6px): Within-component adjustments.
 *   Used for: icon-to-text gap, badge internal padding, dot indicators.
 *   These values exist because some UI elements need sub-8px precision.
 *   Rule: NEVER use micro values for layout spacing between components.
 *
 * TIER 2 — MACRO (8px+): All layout, component, and section spacing.
 *   All values are multiples of 8 (with 4px allowed where 8px is too much).
 *   Rule: ALL layout gaps, margins, and padding use macro values.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * NAMING CONVENTION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Tokens are named by their pixel value.
 * WHY: When a designer says "add 16px padding", the developer writes space[16].
 * Zero mental translation. Zero lookup tables.
 *
 * This is superior to Tailwind's naming (space-4 = 16px) because:
 * - "space-4" requires memorization or documentation lookup
 * - "space[16]" is immediately obvious
 * - Designer/developer communication is faster and error-free
 */
 
// ─── SPACING PRIMITIVES ───────────────────────────────────────────────────────
 
export const space = {
  // ── MICRO TIER (within-component precision) ──────────────────────────────
 
  /** 0px — Explicit zero. Removes default spacing from reset styles. */
  0:   '0px',
 
  /** 2px — Hairline gaps. Icon dot position, badge border adjustments.
   *  Use: Decorative spacing, indicator offsets. Never for layout. */
  2:   '0.125rem',
 
  /** 4px — Tight internal spacing. Icon-to-label, tag internal padding.
   *  Use: Within micro-components only (chips, badges, keyboard shortcuts). */
  4:   '0.25rem',
 
  /** 6px — Between 4 and 8. Small badge padding, compact tag spacing.
   *  Use: When 4px is too tight and 8px is too loose for a micro-element. */
  6:   '0.375rem',
 
  // ── MACRO TIER (layout, component, section spacing) ──────────────────────
 
  /** 8px — BASE MACRO UNIT. The minimum meaningful layout space.
   *  Use: Input vertical padding, list item vertical padding, compact table cells,
   *       gap between inline elements, icon button padding. */
  8:   '0.5rem',
 
  /** 12px — Between 8 and 16. Tight component padding.
   *  Use: Button vertical padding (default size), compact card padding,
   *       form field internal gaps, sidebar item padding (vertical). */
  12:  '0.75rem',
 
  /** 16px — 2× BASE. The most used spacing value in the entire system.
   *  Use: Card padding (compact), input horizontal padding, section item gaps,
   *       default button padding (horizontal), mobile container padding. */
  16:  '1rem',
 
  /** 20px — Between 16 and 24.
   *  Use: Medium card internal gaps, comfortable list item padding,
   *       spacing between form fields in mobile contexts. */
  20:  '1.25rem',
 
  /** 24px — 3× BASE. The primary layout spacing unit.
   *  Use: Card padding (standard), grid gutter, form field gap (vertical),
   *       sidebar navigation item gap, modal header padding, tablet container padding. */
  24:  '1.5rem',
 
  /** 28px — Between 24 and 32.
   *  Use: Generous card padding, comfortable modal body padding,
   *       spacing between related card groups. */
  28:  '1.75rem',
 
  /** 32px — 4× BASE. Section-level spacing within a page.
   *  Use: Vertical gap between card groups on a page, space below page header,
   *       large form section gaps, sidebar section spacing. */
  32:  '2rem',
 
  /** 40px — 5× BASE.
   *  Use: Gap between major sections on a dashboard, top/bottom padding of
   *       primary content cards, empty state vertical padding. */
  40:  '2.5rem',
 
  /** 48px — 6× BASE. Page-level breathing room.
   *  Use: Page header bottom margin, top padding of content area on desktop,
   *       vertical padding of section headers. */
  48:  '3rem',
 
  /** 56px — 7× BASE.
   *  Use: Spacious page top padding, hero section padding, generous modal height. */
  56:  '3.5rem',
 
  /** 64px — 8× BASE. Major visual separation.
   *  Use: Between major page sections (e.g., "Overview" and "Analytics"),
   *       full-bleed section padding (horizontal on wide screens). */
  64:  '4rem',
 
  /** 72px — 9× BASE.
   *  Use: Generous hero section spacing, empty state vertical centering padding. */
  72:  '4.5rem',
 
  /** 80px — 10× BASE.
   *  Use: Landing-level page section padding, maximum content top padding. */
  80:  '5rem',
 
  /** 96px — 12× BASE. Architectural spacing.
   *  Use: Full-page section vertical padding, empty state page centering,
   *       maximum gap between unrelated page sections. */
  96:  '6rem',
 
  /** 112px — 14× BASE.
   *  Use: Hero section minimum height padding, major marketing-style sections
   *       within the app (onboarding completion screens). */
  112: '7rem',
 
  /** 128px — 16× BASE.
   *  Use: Maximum section top/bottom padding, empty state illustration spacing. */
  128: '8rem',
 
  /** 144px — 18× BASE.
   *  Use: Full-page loading states, maximum vertical centering depth. */
  144: '9rem',
 
  /** 160px — 20× BASE.
   *  Use: Extra-large empty state layouts, welcome screens. */
  160: '10rem',
 
  /** 192px — 24× BASE.
   *  Use: Page-level illustration vertical spacing. Rarely needed in product UI. */
  192: '12rem',
 
  /** 224px — 28× BASE.
   *  Use: Full-page empty state centering. Extreme case only. */
  224: '14rem',
 
  /** 256px — 32× BASE. Maximum defined spacing.
   *  Use: Full-viewport centering calculations. Edge of the scale. */
  256: '16rem',
 
} as const;
 
// Type for type-safe access
export type SpaceKey = keyof typeof space;
export type SpaceValue = typeof space[SpaceKey];
 
// ─── SEMANTIC ALIASES ─────────────────────────────────────────────────────────
/**
 * Semantic aliases map intent to primitive values.
 * These are used in the semantic context tokens below.
 *
 * WHY aliases: "gap between form fields = formFieldGap" is more
 * communicable in code review than "gap between form fields = 20px".
 * The semantic layer insulates components from future grid changes.
 */
 
export const spaceAliases = {
  // Micro
  hairline:       space[2],    // Decorative only
  tight:          space[4],    // Within micro-components
  snug:           space[6],    // Tight internal padding
  // Macro
  xs:             space[8],    // Minimum layout space
  sm:             space[12],   // Compact layout space
  md:             space[16],   // Standard layout space ← most used
  lg:             space[24],   // Generous layout space
  xl:             space[32],   // Section-level
  '2xl':          space[48],   // Page-level
  '3xl':          space[64],   // Architectural
  '4xl':          space[96],   // Maximum practical
} as const;
 
export type SpaceAlias = keyof typeof spaceAliases;
 