
/**
 * @file tokens/visual/zindex.ts
 * @description Sellora Visual Foundation — Z-Index Scale
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * Z-INDEX PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Z-index is the most misused CSS property in web development.
 * The classic anti-pattern: z-index: 9999; z-index: 99999; z-index: 999999;
 *
 * WHY THIS HAPPENS:
 * Without a system, every developer guesses a "high enough" number.
 * Those numbers eventually clash, so the next developer uses a higher number.
 * Eventually the codebase has z-indices in the millions.
 *
 * SELLORA'S APPROACH — NAMED, INTENTIONAL LAYERS:
 * Each layer has a PURPOSE, not a number.
 * Numbers are assigned to purposes, not to elements.
 * New elements fit into an existing purpose layer.
 *
 * SCALE DESIGN:
 * We use multiples of 10 up to 700, then reserve 1000+ for system overrides.
 * The gaps allow adding sub-layers without breaking the system.
 * Example: Dropdown sub-menus use z-dropdown + 1 = 101.
 *
 * STACKING CONTEXT AWARENESS:
 * Creating a new stacking context (transform, opacity < 1, filter, will-change)
 * can make z-index ineffective. Always check parent stacking contexts.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
export const zIndex = {
 
  /**
   * BACKGROUND — -1
   *
   * Use for:
   * - Decorative background elements (gradient overlays, pattern textures)
   * - Background images positioned behind content
   * - Pseudo-element decorations
   *
   * WHY NEGATIVE: Must appear BELOW the document flow.
   * Position: relative + z-index: -1 places element behind its container.
   */
  background: -1,
 
  /**
   * BASE — 0
   *
   * Use for:
   * - Normal document flow (default)
   * - All regular page content
   * - Cards, sections, content blocks
   *
   * WHY 0: This is the "floor" — everything starts here.
   */
  base: 0,
 
  /**
   * RAISED — 10
   *
   * Use for:
   * - Sticky table headers (scrolls with table, stays above rows)
   * - Fixed column cells in horizontal scrolling tables
   * - Elements that must appear above their siblings in the same stacking context
   * - Column header with sorting active state
   *
   * WHY 10: Low enough not to conflict with any overlay system,
   * high enough to appear above siblings.
   */
  raised: 10,
 
  /**
   * SIDEBAR — 20
   *
   * Use for:
   * - Fixed/sticky sidebar navigation
   * - The sidebar container itself
   *
   * WHY its own layer: Sidebar must be above page content but below
   * all overlays. When mobile sidebar slides in, it should appear
   * above the content it's covering.
   *
   * Note: This only applies to the SIDEBAR ITSELF.
   * Dropdowns inside the sidebar use z-dropdown.
   */
  sidebar: 20,
 
  /**
   * STICKY — 50
   *
   * Use for:
   * - Sticky page header (top navigation)
   * - Sticky section headers
   * - Sticky column in data tables
   * - Floating action bars at page bottom
   *
   * WHY above sidebar: The top nav must appear above the sidebar's
   * top edge on smaller screens.
   */
  sticky: 50,
 
  /**
   * DROPDOWN — 100
   *
   * Use for:
   * - Select/combobox dropdown panels
   * - Autocomplete suggestion lists
   * - Date picker calendars
   * - Color picker panels
   * - Multi-select dropdown
   * - Navigation mega-menus
   *
   * WHY 100: Must appear above sticky headers and sidebars.
   * Dropdowns are opened by user action and MUST cover everything below.
   *
   * Sub-menus: z-index: 101 (dropdown + 1)
   */
  dropdown: 100,
 
  /**
   * POPOVER — 200
   *
   * Use for:
   * - Inline popovers (info boxes, hover cards)
   * - Rich tooltips with interactive content
   * - User profile cards
   * - Action menus that are NOT triggered by select inputs
   *
   * WHY above dropdown: Popovers inside dropdown items must appear
   * above the dropdown panel. More common: nested interactive layers.
   */
  popover: 200,
 
  /**
   * OVERLAY — 300
   *
   * Use for:
   * - Modal backdrop
   * - Drawer backdrop
   * - Dialog backdrop
   * - Any semi-transparent overlay that blocks interaction
   *
   * WHY 300: Must be above ALL page elements including sticky nav,
   * sidebar, dropdowns, and popovers. The backdrop "seals off" the page.
   */
  overlay: 300,
 
  /**
   * MODAL — 400
   *
   * Use for:
   * - Modal dialog panels
   * - Side drawer panels
   * - Alert dialog panels
   * - Any panel that appears on top of the overlay backdrop
   *
   * WHY above overlay: Modal content sits ON TOP of its backdrop.
   * overlay (300) is the darkness; modal (400) is the content.
   */
  modal: 400,
 
  /**
   * TOOLTIP — 500
   *
   * Use for:
   * - Simple text tooltips
   * - Icon tooltips (hover over icon → brief description)
   *
   * WHY above modal: Tooltips on elements INSIDE a modal must appear
   * above the modal surface. This is a common oversight.
   */
  tooltip: 500,
 
  /**
   * TOAST — 600
   *
   * Use for:
   * - Toast notifications
   * - Success/error/info feedback messages
   * - Action feedback banners
   *
   * WHY above tooltip: Toasts are system-level feedback — they must
   * ALWAYS be visible regardless of what's open. A toast "Order saved"
   * must appear even if a modal is open.
   */
  toast: 600,
 
  /**
   * COMMAND — 700
   *
   * Use for:
   * - Command palette (⌘K)
   * - Global search overlay
   * - Keyboard shortcut help overlay
   *
   * WHY highest user-facing: The command palette is the most powerful
   * user-triggered action. It must appear above EVERYTHING including
   * toasts, modals, and overlays.
   */
  command: 700,
 
  /**
   * SYSTEM — 1000+
   *
   * Reserved for system-level elements that must ALWAYS appear on top.
   * Examples: Browser extension overlays, OS-level notifications (via JS).
   *
   * RULE: Never use 1000+ for regular UI elements.
   * If you find yourself reaching for 1000+, reconsider the design.
   */
  system: 1000,
 
} as const;
 
// ─── STACKING CONTEXT GUIDE ───────────────────────────────────────────────────
 
export const stackingContextRules = {
  /**
   * CSS PROPERTIES THAT CREATE NEW STACKING CONTEXTS:
   *
   * The following CSS properties create a new stacking context,
   * which means z-index values inside them are RELATIVE to that context,
   * not to the document root.
   *
   * This is the #1 cause of "z-index not working" bugs.
   */
  contextCreators: [
    'position: fixed or sticky',
    'position + z-index (not auto)',
    'opacity < 1',
    'transform (any value)',
    'filter (any value)',
    'will-change: transform or opacity',
    'isolation: isolate',
    'mix-blend-mode (not normal)',
    'contain: layout or paint',
  ],
 
  /**
   * COMMON BUG SCENARIO:
   * A card with box-shadow (fine, no new context) gets hover:scale-105 added.
   * transform creates a new stacking context.
   * Now the dropdown inside the card can't escape the card's stacking context.
   * Solution: Move the dropdown to a portal (render at document.body level).
   */
  portalRequired: [
    'Select dropdowns (use Radix UI Portal)',
    'Modal dialogs (render at body level)',
    'Toast notifications (render at body level)',
    'Command palette (render at body level)',
    'Tooltips that appear inside transformed containers',
  ],
} as const;
 
export type ZIndex = typeof zIndex;
export type ZIndexKey = keyof typeof zIndex;
 