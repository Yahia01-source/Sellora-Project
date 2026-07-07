
/**
 * @file tokens/spacing/responsive.ts
 * @description Sellora Spacing System — Responsive Spacing Rules & White Space Guidelines
 */
 
import { space } from './primitives';
 
// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSIVE SPACING RULES
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * PHILOSOPHY:
 * Spacing scales DOWN on smaller screens — not by removing space, but by
 * reducing the step multiplier. A section gap of 32px on desktop becomes
 * 24px on tablet and 16px on mobile.
 *
 * RULE: Never remove spacing entirely on small screens (except for very
 * specific layout reasons). Reduced spacing ≠ no spacing.
 *
 * RULE: Body text padding never scales below 16px on any screen.
 * RULE: Minimum touch target: 44px × 44px on all devices.
 */
 
export const responsiveSpacing = {
 
  // ── GRID GAPS ──────────────────────────────────────────────────────────────
 
  gridGap: {
    /** Desktop: 24px — comfortable spacing between cards */
    desktop: space[16],   // 16px
    /** Tablet: 16px — reduce gap to fit more columns */
    tablet:  space[12],   // 12px
    /** Mobile: 12px — single column, tight gaps */
    mobile:  space[12],   // 12px
  },
 
  // ── SECTION SPACING ────────────────────────────────────────────────────────
 
  sectionGap: {
    desktop: space[32],   // 32px
    tablet:  space[24],   // 24px
    mobile:  space[20],   // 20px
  },
 
  // ── CARD PADDING ───────────────────────────────────────────────────────────
 
  cardPadding: {
    desktop: space[24],   // 24px
    tablet:  space[20],   // 20px
    mobile:  space[16],   // 16px
  },
 
  // ── CONTAINER PADDING X ────────────────────────────────────────────────────
 
  containerPaddingX: {
    desktop: space[32],   // 32px
    tablet:  space[24],   // 24px
    mobile:  space[16],   // 16px — iOS standard safe area
  },
 
  // ── CONTAINER PADDING Y ────────────────────────────────────────────────────
 
  containerPaddingY: {
    desktop: space[32],   // 32px
    tablet:  space[24],   // 24px
    mobile:  space[16],   // 16px
  },
 
  // ── MODAL PADDING ──────────────────────────────────────────────────────────
 
  modalPadding: {
    desktop: space[24],   // 24px
    tablet:  space[20],   // 20px
    mobile:  space[16],   // 16px — mobile modals are full-screen
  },
 
  // ── FORM FIELD GAP ─────────────────────────────────────────────────────────
 
  formFieldGap: {
    desktop: space[20],   // 20px
    tablet:  space[20],   // 20px — no change
    mobile:  space[16],   // 16px
  },
 
  // ── TABLE ROW PADDING ──────────────────────────────────────────────────────
 
  tableRowPaddingX: {
    desktop: space[16],   // 16px
    tablet:  space[12],   // 12px
    mobile:  space[8],    // 8px — very compact
  },
 
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// GRID SYSTEM RULES
// ═══════════════════════════════════════════════════════════════════════════════
 
export const gridRules = {
  /**
   * COLUMN SYSTEM: 12 columns
   * WHY 12: Divisible by 2, 3, 4, 6 — maximum flexibility.
   *
   * Common patterns in Sellora:
   * ┌─────────────────────────────────────────┐
   * │ KPI Row: 3×4col or 4×3col               │
   * │ Dashboard: sidebar(3col) + content(9col) │
   * │ Form: 2×6col (two-column layout)         │
   * │ Full-width table: 12col                  │
   * │ Stats: 2×6col or 4×3col                 │
   * └─────────────────────────────────────────┘
   */
 
  columns: {
    desktop: 12,
    tablet:  8,     // 8-col grid on tablet (most things span 4 or 8)
    mobile:  4,     // 4-col grid on mobile (most things span 4 = full width)
  },
 
  gutter: {
    /** Gap between columns */
    desktop: space[16],   // 16px
    tablet:  space[12],   // 12px
    mobile:  space[12],   // 12px
  },
 
  margin: {
    /** Grid outer margin (container padding) */
    desktop: space[32],   // 32px
    tablet:  space[24],   // 24px
    mobile:  space[16],   // 16px
  },
 
  /**
   * COMMON COLUMN SPANS
   * Named for their semantic role, not arbitrary fractions.
   */
  spans: {
    full:        12,   // Full width
    half:        6,    // Two equal columns
    third:       4,    // Three equal columns
    quarter:     3,    // Four equal columns
    twoThirds:   8,    // Main content + sidebar
    oneThird:    4,    // Sidebar
    threeFourths: 9,   // Main content (wide sidebar)
    oneFourth:   3,    // Narrow sidebar
  },
 
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// FLEX GAP RULES
// ═══════════════════════════════════════════════════════════════════════════════
 
export const flexGapRules = {
  /**
   * Named flex gap patterns — use these instead of arbitrary values.
   *
   * RULE: Choose the gap based on the relationship between elements.
   * Related elements → tight gap. Unrelated elements → loose gap.
   */
 
  /**
   * TIGHT — 4px
   * Use: Icon + indicator dot, badge elements, dense tag groups.
   * Relationship: Elements are visually merged into a single unit.
   */
  tight:     space[4],    // 4px
 
  /**
   * SNUG — 6px
   * Use: Avatar + online indicator, status dot + text.
   * Relationship: Elements are tightly coupled but individually distinct.
   */
  snug:      space[6],    // 6px
 
  /**
   * COMPACT — 8px
   * Use: Icon + label (nav items, buttons, status badges).
   * Relationship: Strongly related, form a single semantic unit.
   */
  compact:   space[8],    // 8px
 
  /**
   * STANDARD — 12px
   * Use: Related action buttons, breadcrumb items, tab items.
   * Relationship: Related but individually interactive.
   */
  standard:  space[12],   // 12px
 
  /**
   * DEFAULT — 16px
   * Use: Card grids, list items with separation, toolbar items.
   * Relationship: Same page/section but distinct items.
   */
  default:   space[16],   // 16px
 
  /**
   * COMFORTABLE — 20px
   * Use: Form field rows, filter sections.
   * Relationship: Parallel items that need clear visual separation.
   */
  comfortable: space[20], // 20px
 
  /**
   * SPACIOUS — 24px
   * Use: Major UI section items, large button groups, dashboard actions.
   * Relationship: Items of similar weight that need strong separation.
   */
  spacious:  space[24],   // 24px
 
  /**
   * LOOSE — 32px
   * Use: Between very different elements in a row (logo + nav + actions in topnav).
   * Relationship: Items are contextually related but visually distinct sections.
   */
  loose:     space[32],   // 32px
 
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// MARGIN RULES
// ═══════════════════════════════════════════════════════════════════════════════
 
export const marginRules = {
  /**
   * GOLDEN RULE OF MARGINS IN SELLORA:
   * Use PADDING over margin wherever possible.
   * WHY: Padding creates visual space without the "margin collapse" footgun.
   * Margins are for flow/layout relationships between adjacent elements.
   *
   * WHEN TO USE MARGIN:
   * - Between a heading and its following content (top of section)
   * - Between a paragraph and the next element
   * - Centering a container (margin: auto)
   *
   * WHEN TO USE PADDING:
   * - Internal component spacing
   * - Card internal space
   * - Button/input internal space
   * - Container edge space
   */
 
  /**
   * MARGIN BETWEEN HEADING AND CONTENT
   * The space below a heading before its first content element.
   */
  headingBottom: {
    h1: space[24],   // 24px — page title to first section
    h2: space[16],   // 16px — section title to first card
    h3: space[12],   // 12px — card title to card body
    h4: space[8],    // 8px  — sub-section to content
    h5: space[8],    // 8px
    h6: space[4],    // 4px  — label-level heading
  },
 
  /**
   * PARAGRAPH BOTTOM MARGIN
   * Space below each paragraph before next element.
   */
  paragraphBottom: space[16],   // 16px (same as body line height × 1)
 
  /**
   * SECTION MARGIN
   * Top margin for major page sections.
   */
  sectionTop: {
    major: space[48],   // 48px — between H2-level sections
    minor: space[32],   // 32px — between H3-level groups
    micro: space[16],   // 16px — between inline elements
  },
 
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// WHITE SPACE GUIDELINES
// ═══════════════════════════════════════════════════════════════════════════════
 
export const whiteSpaceGuidelines = {
  /**
   * THE FOUR PRINCIPLES OF WHITE SPACE IN SELLORA:
   */
  principles: [
 
    /**
     * 1. PROXIMITY PRINCIPLE
     * Elements that belong together should be close. Elements that are separate
     * should have clear space between them.
     *
     * Dashboard HIERARCHY:
     *   Page sections: 32-48px between
     *   Card groups: 24px between
     *   Cards: 16px between
     *   Items within cards: 8-12px between
     *   Elements within items: 4-8px between
     *
     * This creates a visual pyramid — zoom out and you see sections,
     * zoom in and you see individual elements.
     */
    'Proximity: Related elements are close, unrelated elements are far',
 
    /**
     * 2. THE 50% RULE
     * In any given view, roughly 50% of the space should be "empty" (white space).
     * If a view is more than 70% filled with elements, it feels cluttered.
     * If it's less than 30% filled, it feels empty and broken.
     *
     * Sellora targets 45-55% content, 45-55% white space for most dashboard views.
     */
    '50% Rule: Aim for ~50% content, ~50% breathing space per view',
 
    /**
     * 3. CONSISTENT RHYTHM
     * The same types of space appear at consistent intervals.
     * If cards have 24px padding, ALL cards have 24px padding — never 20px for some
     * and 28px for others. Visual rhythm is broken by inconsistency.
     */
    'Rhythm: Same element type = same spacing, always and everywhere',
 
    /**
     * 4. INTENTIONAL DENSITY
     * Some views SHOULD be dense (order list, product catalog) because the user
     * needs to see as many items as possible. Others SHOULD be spacious (empty state,
     * onboarding) because the user needs to focus on a single action.
     * Make density a deliberate design choice, not an accident.
     */
    'Intentional Density: Dense views are a feature, not a bug — when deliberate',
  ],
 
  /**
   * ANTI-PATTERNS — what to never do
   */
  antiPatterns: [
    'Never use arbitrary pixel values not in the spacing scale',
    'Never mix margin and padding for the same spacing purpose',
    'Never add padding to every element to "fix" alignment — fix the layout instead',
    'Never use negative margin for layout (only for visual tricks like avatar stacking)',
    'Never use spacing below 4px for layout between distinct elements',
    'Never use spacing above 64px between elements in the same section',
    'Never make mobile spacing the same as desktop (always reduce proportionally)',
    'Never add spacing in only one direction inconsistently (16px top, 8px bottom)',
    'Never use fractional rem values not in the scale (no 1.3rem, use 1.25rem or 1.5rem)',
    'Never override spacing tokens in individual components — propose a scale change',
  ],
 
  /**
   * DENSITY GUIDELINES PER VIEW TYPE
   */
  viewDensity: {
    /**
     * HIGH DENSITY — maximize information
     * Views: Order lists, product catalogs, customer tables, analytics tables.
     * Target: 14px body, 12px row padding, 40-44px row height.
     */
    high: {
      rowHeight:    '40px',
      rowPaddingY:  space[8],    // 8px
      itemGap:      space[8],    // 8px
      sectionGap:   space[16],   // 16px
    },
 
    /**
     * STANDARD DENSITY — balanced
     * Views: Dashboard overview, settings, product detail, order detail.
     * Target: 14px body, 16px row padding, 48px row height.
     */
    standard: {
      rowHeight:    '48px',
      rowPaddingY:  space[12],   // 12px
      itemGap:      space[12],   // 12px
      sectionGap:   space[24],   // 24px
    },
 
    /**
     * LOW DENSITY — focus and breathe
     * Views: Onboarding, empty states, success screens, focused forms.
     * Target: 16px body, 24px+ padding, generous spacing throughout.
     */
    low: {
      rowHeight:    '60px',
      rowPaddingY:  space[20],   // 20px
      itemGap:      space[20],   // 20px
      sectionGap:   space[40],   // 40px
    },
  },
 
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES (reference object)
// ═══════════════════════════════════════════════════════════════════════════════
 
export const spacingBestPractices = {
  rules: [
    '1. Always use tokens from the spacing scale — never arbitrary pixel values',
    '2. Reference semantic context tokens (cardSpacing.paddingDefault) not primitives in component code',
    '3. Use CSS gap for flex/grid spacing — avoid margin between sibling elements',
    '4. Scale padding proportionally when scaling components (compact → default → large)',
    '5. Test all spacing at 200% zoom — WCAG 1.4.4 requires no horizontal scrolling',
    '6. Ensure minimum 44×44px touch targets on all interactive elements',
    '7. Use padding-inline and padding-block (logical properties) for RTL support',
    '8. When in doubt, use more space — it is easier to reduce than to undo cluttered design',
    '9. Document spacing exceptions (like the 10px avatar gap) with WHY comments',
    '10. Run spacing audits quarterly — drift accumulates over time',
  ],
} as const;
 
export type ResponsiveSpacing = typeof responsiveSpacing;
export type GridRules = typeof gridRules;
export type FlexGapRules = typeof flexGapRules;
export type WhiteSpaceGuidelines = typeof whiteSpaceGuidelines;
 