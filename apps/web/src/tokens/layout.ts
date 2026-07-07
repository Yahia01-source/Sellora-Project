/**
 * @file tokens/layout.ts
 * @description Sellora Design Token System — Layout, Breakpoints, Grid, Motion
 *
 * LAYOUT PHILOSOPHY:
 * Sellora's layout is a classic "App Shell" pattern:
 *   [ Sidebar ] [ Top Nav ] [ Content Area ]
 *
 * The sidebar is collapsible. The content area has a max-width to prevent
 * text lines from becoming unreadable on ultra-wide monitors.
 *
 * WHY explicit layout tokens (not just Tailwind classes):
 * The sidebar width value is used in 4 places: sidebar itself, top nav offset,
 * main content margin, and mobile transition calculation.
 * A single token prevents inconsistency and makes future resizing a 1-line change.
 */
 
// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────
/**
 * WHY these specific breakpoints:
 * sm (640px): Minimum for 2-column layouts on tablet
 * md (768px): iPad — where the sidebar starts appearing
 * lg (1024px): Laptop — primary usage context for SaaS dashboards
 * xl (1280px): External monitor — where content can expand
 * 2xl (1536px): Ultra-wide — content max-width prevents line-length issues
 *
 * We follow the mobile-LAST approach for dashboard UIs — most users
 * are on desktop. Mobile is a graceful degradation, not the primary target.
 */
 
export const breakpoints = {
  /** 360px — Minimum mobile. Status bar visibility. */
  xs:  '360px',
  /** 640px — Large phone / small tablet. */
  sm:  '640px',
  /** 768px — iPad. Sidebar becomes visible. */
  md:  '768px',
  /** 1024px — Laptop. PRIMARY DESIGN TARGET. */
  lg:  '1024px',
  /** 1280px — External monitor. Dashboard expands. */
  xl:  '1280px',
  /** 1440px — Wide monitor. Layout locks at max-width. */
  '1.5xl': '1440px',
  /** 1536px — Ultra-wide. Content max-width engages. */
  '2xl': '1536px',
} as const;
 
// ─── CONTAINER WIDTHS ─────────────────────────────────────────────────────────
/**
 * WHY container tokens:
 * Without these, devs set arbitrary max-widths. This creates inconsistency
 * between pages. Named containers enforce a consistent content width system.
 *
 * Sellora uses a fluid layout with a single max-width — not multiple breakpoint
 * containers. This is the Stripe/Linear approach.
 */
 
export const container = {
  /**
   * XS — 480px
   * Use: Narrow single-column forms (login, reset password, onboarding steps).
   * WHY: Wide forms are harder to complete. Constraining to 480px keeps
   * the user's eye on a single column.
   */
  xs:   '480px',
 
  /**
   * SM — 640px
   * Use: Simple settings pages, confirmation dialogs, single-entity edit forms.
   */
  sm:   '640px',
 
  /**
   * MD — 768px
   * Use: Two-column forms, product pages with side details.
   */
  md:   '768px',
 
  /**
   * LG — 1024px
   * Use: Dashboard content with sidebar (sidebar takes 240px, content gets ~784px).
   */
  lg:   '1024px',
 
  /**
   * XL — 1280px
   * Use: Wide content pages: order lists, product catalogs, analytics.
   */
  xl:   '1280px',
 
  /**
   * DASHBOARD MAX — 1440px
   * The maximum width of dashboard content. On screens wider than this,
   * the content stays centered with auto margins.
   * WHY 1440px: This is the standard 1440×900 monitor resolution.
   * Content filling the full width of larger screens becomes hard to scan.
   */
  dashboard: '1440px',
 
  /**
   * FULL — 100%
   * Use: Full-bleed sections, edge-to-edge tables, data-heavy views.
   */
  full: '100%',
} as const;
 
// ─── SIDEBAR DIMENSIONS ───────────────────────────────────────────────────────
/**
 * WHY sidebar tokens matter:
 * The sidebar width affects:
 * 1. The sidebar's own width CSS
 * 2. The main content's left margin (or CSS transform)
 * 3. The top nav's left padding (to align with content)
 * 4. The mobile slide-out animation distance
 * 5. Any JS calculations (e.g., chart container width)
 *
 * Without a single source of truth, these 5 places drift apart.
 */
 
export const sidebar = {
  /**
   * EXPANDED — 240px
   * Full sidebar with icons + text labels.
   * WHY 240px: Industry standard. Shopify admin uses 240px. Linear uses 232px.
   * At 240px, typical navigation labels (max ~20 chars) fit without truncation.
   * Narrower than 220px and some labels start clipping. Wider than 280px and
   * too much screen space is consumed on 1024px laptops.
   */
  expanded:  '240px',
 
  /**
   * COLLAPSED — 64px
   * Icon-only sidebar. Labels hidden.
   * WHY 64px: 48px icon + 8px padding each side = 64px.
   * This is the minimum width to show a 24px icon comfortably.
   * Linear uses 48px collapsed, but 64px gives better touch targets.
   */
  collapsed: '64px',
 
  /**
   * MOBILE — 0px (hidden by default, slides in)
   * On mobile, sidebar lives in an overlay drawer.
   */
  mobile:    '280px',
} as const;
 
// ─── CONTENT AREA ─────────────────────────────────────────────────────────────
 
export const contentArea = {
  /**
   * DEFAULT PADDING — 24px
   * The horizontal padding applied to the main content area.
   * WHY 24px: Matches card padding for visual alignment. Content edge aligns
   * with card edge = cleaner visual grid.
   */
  paddingX: '1.5rem',
 
  /**
   * TOP PADDING — 24px
   * Space between top nav and first content element.
   */
  paddingY: '1.5rem',
 
  /**
   * MAX WIDTH
   * Referenced from container.dashboard.
   */
  maxWidth: '1440px',
 
  /**
   * TOP NAV HEIGHT — 56px
   * WHY 56px: 24px top/bottom padding + 20px icon = 56px (naturally).
   * Also: 56px is the Material Design "Dense App Bar" spec — tested across
   * millions of UIs for usability. Short enough to not eat vertical space
   * but tall enough for comfortable touch targets.
   */
  topNavHeight: '3.5rem',
} as const;
 
// ─── GRID SYSTEM ──────────────────────────────────────────────────────────────
/**
 * WHY a 12-column grid:
 * 12 is divisible by 2, 3, 4, and 6.
 * This means we can have:
 * - 2-col layout: 6 + 6
 * - 3-col layout: 4 + 4 + 4
 * - 4-col layout: 3 + 3 + 3 + 3
 * - Sidebar + content: 3 + 9
 * - Wide sidebar + content: 4 + 8
 */
 
export const grid = {
  /** Total columns in the layout grid. */
  columns: 12,
 
  /**
   * GUTTER — 24px
   * Gap between grid columns.
   * WHY 24px: Matches card padding. Columns and cards share the same spacing
   * cadence — they feel like they're "breathing together".
   */
  gutter: '1.5rem',
 
  /**
   * MARGIN — 24px
   * Grid edge margin (padding on the container).
   * Same as gutter for visual consistency.
   */
  margin: '1.5rem',
} as const;
 
// ─── CARD SIZES ───────────────────────────────────────────────────────────────
 
export const cardSizes = {
  /**
   * COMPACT — Stat cards, KPI tiles, quick metrics.
   * Use: "Total Orders: 1,204" summary tiles at the top of the dashboard.
   */
  compact: {
    minWidth:  '180px',
    padding:   '1rem',     // spacing[4]
    minHeight: '80px',
  },
 
  /**
   * DEFAULT — Standard content cards.
   * Use: Product cards, order cards, customer cards.
   */
  default: {
    minWidth:  '280px',
    padding:   '1.5rem',   // spacing[6]
    minHeight: '120px',
  },
 
  /**
   * LARGE — Full-feature cards with charts or complex content.
   * Use: Revenue chart, order pipeline, activity feed.
   */
  large: {
    minWidth:  '360px',
    padding:   '1.5rem',   // spacing[6]
    minHeight: '200px',
  },
 
  /**
   * FULL — Edge-to-edge card, full container width.
   * Use: Data tables, bulk list views.
   */
  full: {
    width:   '100%',
    padding: '0',
    minHeight: '400px',
  },
} as const;
 
// ─── ICON SIZES ───────────────────────────────────────────────────────────────
/**
 * WHY named icon sizes:
 * Without this, devs use w-4 h-4, w-5 h-5, w-6 h-6 inconsistently.
 * Named sizes map to specific use cases — "icon next to a button label" is
 * always the same size across the entire product.
 */
 
export const iconSize = {
  /**
   * XS — 12px
   * Use: Inline status indicators, tiny decorative icons in dense tables.
   */
  xs:  '0.75rem',
 
  /**
   * SM — 16px
   * Use: Icons inside compact buttons, inline table cell icons.
   */
  sm:  '1rem',
 
  /**
   * MD — 20px ← DEFAULT
   * Use: Navigation icons, button icons, form field icons, action icons.
   * WHY 20px: The Lucide/Heroicons default export size. Designed for 20px.
   * Looks correct in most button and list contexts.
   */
  md:  '1.25rem',
 
  /**
   * LG — 24px
   * Use: Standalone action icons, empty state illustrations (simplified).
   */
  lg:  '1.5rem',
 
  /**
   * XL — 32px
   * Use: Feature highlight icons, large action icons in empty states.
   */
  xl:  '2rem',
 
  /**
   * 2XL — 48px
   * Use: Empty state hero icons, onboarding step icons.
   */
  '2xl': '3rem',
 
  /**
   * 3XL — 64px
   * Use: Illustration-level icons, full empty state centerpieces.
   */
  '3xl': '4rem',
} as const;
 
// ─── MOTION TOKENS ────────────────────────────────────────────────────────────
/**
 * MOTION PHILOSOPHY:
 * Sellora moves fast — animations must never feel like they slow the UI down.
 * The rule: interactions feel instant, state changes have subtle confirmation.
 *
 * Duration: shorter than you think is correct. Linear uses 100-150ms for
 * most interactions. Only page-level transitions warrant 200-300ms.
 *
 * Easing: "ease-out" for things entering the screen (they decelerate to rest).
 * "ease-in" for things leaving (they accelerate away). "ease-in-out" for
 * elements moving within the UI.
 *
 * WHY explicit easing strings (not Tailwind class names):
 * Tailwind's transition classes don't expose custom cubic-bezier curves.
 * These curves are tuned specifically for the interface feel we want.
 */
 
export const duration = {
  /**
   * INSTANT — 0ms
   * Use: Visibility toggles, content swaps where animation would feel laggy.
   */
  instant:  '0ms',
 
  /**
   * FAST — 100ms
   * Use: Hover state color changes, focus rings appearing, checkbox check.
   * WHY: Users expect hover feedback to be near-instantaneous.
   * 100ms is the threshold below which humans perceive something as "instant".
   */
  fast:     '100ms',
 
  /**
   * DEFAULT — 150ms
   * Use: Button press states, dropdown opening, tab switching.
   * WHY: The "default" animation length. Fast enough to feel snappy,
   * long enough to confirm the interaction happened.
   */
  default:  '150ms',
 
  /**
   * MEDIUM — 200ms
   * Use: Sidebar expand/collapse, card hover lift, modal fade-in.
   */
  medium:   '200ms',
 
  /**
   * SLOW — 300ms
   * Use: Page transitions, drawer slide-in, skeleton loading reveal.
   */
  slow:     '300ms',
 
  /**
   * SLOWER — 400ms
   * Use: Welcome animations, onboarding step transitions, progress bars.
   */
  slower:   '400ms',
} as const;
 
export const easing = {
  /**
   * LINEAR — No easing
   * Use: Progress bars, loading indicators, timed animations.
   * WHY: Progress should feel consistent, not ease-in and ease-out.
   */
  linear:    'linear',
 
  /**
   * EASE-IN — Accelerate then stop
   * Use: Elements leaving the screen (modals closing, toasts dismissing).
   * WHY: Physical objects accelerate as they leave — feels natural.
   */
  in:        'cubic-bezier(0.4, 0, 1, 1)',
 
  /**
   * EASE-OUT — Start fast, decelerate to rest ← MOST USED
   * Use: Elements entering the screen (dropdowns, modals appearing, toasts showing).
   * WHY: Physical objects decelerate as they arrive — feels natural and precise.
   * This is the "default" easing for any element that appears.
   */
  out:       'cubic-bezier(0, 0, 0.2, 1)',
 
  /**
   * EASE-IN-OUT — Slow, fast, slow
   * Use: Sidebar expanding/collapsing, tab indicators moving, page transitions.
   * WHY: For elements moving within the UI (not appearing/disappearing),
   * ease-in-out provides the most natural feeling motion arc.
   */
  inOut:     'cubic-bezier(0.4, 0, 0.2, 1)',
 
  /**
   * SPRING — Slight overshoot
   * Use: Success confirmations, checkmarks appearing, modal enter.
   * WHY: A subtle overshoot makes UI feel alive without being "bouncy".
   * Used sparingly — only for positive feedback moments.
   */
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
 
// ─── FOCUS RING ───────────────────────────────────────────────────────────────
/**
 * WHY focus ring tokens:
 * Keyboard accessibility requires visible focus. The focus ring must be:
 * - Visible enough to satisfy WCAG 2.4.11 (Enhanced Focus Appearance)
 * - Not so large that it disrupts the visual design
 * - Consistent across ALL interactive elements (inputs, buttons, links, selects)
 *
 * We use box-shadow (not outline) because:
 * 1. Box-shadow respects border-radius
 * 2. Box-shadow can be layered with existing shadows
 * 3. outline on non-rectangular elements looks broken in Safari
 */
 
export const focusRing = {
  /**
   * DEFAULT FOCUS RING
   * Applied to: all interactive elements on keyboard focus
   * Visual: 3px blue ring offset 1px from element edge
   */
  default: {
    outline:      '2px solid transparent',
    outlineOffset: '2px',
    boxShadow:    '0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB',
  },
 
  /**
   * DANGER FOCUS RING
   * Applied to: inputs in error state when focused
   */
  danger: {
    outline:      '2px solid transparent',
    outlineOffset: '2px',
    boxShadow:    '0 0 0 2px #FFFFFF, 0 0 0 4px #E11D48',
  },
 
  /**
   * INSET FOCUS RING
   * Applied to: elements where the outer ring would be clipped (table cells, modals)
   */
  inset: {
    outline:      '2px solid #2563EB',
    outlineOffset: '-2px',
  },
} as const;
 
export type Breakpoints = typeof breakpoints;
export type Container = typeof container;
export type Sidebar = typeof sidebar;
export type Grid = typeof grid;
export type CardSizes = typeof cardSizes;
export type IconSize = typeof iconSize;
export type Duration = typeof duration;
export type Easing = typeof easing;
export type FocusRing = typeof focusRing;
 