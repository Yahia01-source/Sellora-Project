
/**
 * @file tokens/visual/focus.ts
 * @description Sellora Visual Foundation — Focus Ring System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * FOCUS RING PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * The focus ring is the MOST IMPORTANT visual accessibility element in Sellora.
 *
 * WHY FOCUS RINGS MATTER:
 * Keyboard navigation is required for users who:
 * - Have motor disabilities (cannot use a mouse)
 * - Are power users (navigating via keyboard is faster than mouse in dashboards)
 * - Use screen readers (which navigate via keyboard)
 * - Are using voice control software
 *
 * In a commerce platform like Sellora, keyboard navigation through orders,
 * products, and settings is COMMON, not edge case. Merchants use Tab extensively.
 *
 * WCAG REQUIREMENTS:
 * - WCAG 2.4.7 (Level AA): Focus indicators MUST be visible
 * - WCAG 2.4.11 (Level AA, 2.2): Enhanced Focus Appearance
 *   - The focus indicator must have 3:1 contrast against adjacent colors
 *   - The focus area must be at least as large as a 2px perimeter around the component
 * - WCAG 2.4.12 (Level AAA): Focus Not Obscured
 *   - The focused component must not be entirely hidden by sticky headers/sidebars
 *
 * OUR APPROACH — THE TWO-LAYER RING TECHNIQUE:
 *
 * Layer 1: WHITE GAP (2px offset from element)
 *   Creates visual separation between the element and the focus ring.
 *   This white "halo" ensures the ring is visible on ANY background color —
 *   even if the element IS blue or red.
 *
 * Layer 2: BLUE RING (2px more offset = 4px total from element)
 *   The actual visible focus indicator.
 *   2px wide blue ring at 4px offset.
 *
 * Implementation: Two box-shadow values:
 *   box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB
 *
 * WHY box-shadow NOT outline:
 * 1. outline ignores border-radius in some browsers (Safari)
 * 2. outline can't be layered (no white gap technique)
 * 3. box-shadow can be combined with existing elevation shadows
 * 4. box-shadow respects the element's border-radius perfectly
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
export const focusRing = {
 
  // ── COLORS ─────────────────────────────────────────────────────────────────
 
  color: {
    /** Primary focus color — blue-600 */
    primary:   '#2563EB',
    /** Error state focus color — red-500 */
    error:     '#EF4444',
    /** Warning state focus color */
    warning:   '#F59E0B',
    /** Success state focus color */
    success:   '#22C55E',
    /** White gap color — white on light backgrounds */
    gap:       '#FFFFFF',
    /** Dark gap color — for focus rings on dark backgrounds */
    gapDark:   '#1F2937',
  },
 
  // ── WIDTHS ─────────────────────────────────────────────────────────────────
 
  width: {
    /**
     * RING WIDTH — 2px
     * The actual visible ring is 2px thick.
     * WCAG 2.4.11: 2px minimum for focus indicators. We meet this exactly.
     */
    ring:  '2px',
 
    /**
     * GAP WIDTH — 2px
     * The white "halo" between element edge and the ring.
     * Total offset from element = gap (2px) + ring (2px) = 4px
     */
    gap:   '2px',
  },
 
  // ── OFFSET ─────────────────────────────────────────────────────────────────
 
  offset: {
    /**
     * STANDARD OFFSET — 4px total (2px gap + 2px ring)
     * box-shadow: 0 0 0 2px white, 0 0 0 4px blue
     */
    standard: '4px',
 
    /**
     * TIGHT OFFSET — 2px total (no gap, direct ring)
     * Used when the element is very small and the white gap would look odd.
     * Example: tiny icon buttons, small checkboxes.
     */
    tight:    '2px',
 
    /**
     * INSET — negative offset (focus ring inside the element)
     * Used when the element is at the edge of a clipping container.
     * Example: first/last items in a scrollable list.
     */
    inset:    '-2px',
  },
 
  // ── COMPLETE FOCUS SHADOWS ─────────────────────────────────────────────────
 
  shadows: {
    /**
     * DEFAULT — The standard focus ring for all interactive elements.
     * Buttons, links, nav items, checkboxes, radios, selects.
     */
    default:     '0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB',
 
    /**
     * ON_PRIMARY — Focus ring on blue/colored backgrounds.
     * The white gap becomes 40% transparent white instead of solid white.
     * Adapts to the colored surface while remaining visible.
     */
    onPrimary:   '0 0 0 2px rgba(255, 255, 255, 0.40), 0 0 0 4px #2563EB',
 
    /**
     * ON_DARK — Focus ring for dark mode elements (future use).
     * White gap becomes the dark surface color. Ring remains blue.
     */
    onDark:      '0 0 0 2px #1F2937, 0 0 0 4px #60A5FA',
 
    /**
     * ERROR — Focus ring in error state.
     * Input field with validation error AND keyboard focus.
     */
    error:       '0 0 0 2px #FFFFFF, 0 0 0 4px #EF4444',
 
    /**
     * WARNING — Focus ring in warning state.
     */
    warning:     '0 0 0 2px #FFFFFF, 0 0 0 4px #F59E0B',
 
    /**
     * SUCCESS — Focus ring in success state.
     */
    success:     '0 0 0 2px #FFFFFF, 0 0 0 4px #22C55E',
 
    /**
     * INSET — Focus ring inside element boundaries.
     * For table cells, list items in overflow-hidden containers.
     */
    inset:       'inset 0 0 0 2px #2563EB',
 
    /**
     * COMBINED WITH SHADOW — For inputs that also have shadow-inner.
     * Appends focus ring to existing inner shadow.
     */
    withInner:   'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB',
 
    /**
     * NONE — Explicitly removes focus ring.
     * ACCESSIBILITY WARNING: Only use this when you've implemented a CUSTOM
     * focus indicator through other means (background color change, border change, etc.)
     * NEVER use this without providing an alternative focus indicator.
     */
    none:        'none',
  },
 
} as const;
 
// ─── KEYBOARD NAVIGATION RULES ────────────────────────────────────────────────
 
export const keyboardNavigation = {
  /**
   * FOCUS VISIBLE APPROACH:
   * Sellora uses :focus-visible (not :focus) for all custom focus styles.
   *
   * :focus — fires for BOTH mouse click AND keyboard navigation
   * :focus-visible — fires ONLY for keyboard navigation
   *
   * WHY :focus-visible:
   * When a user clicks a button with a mouse, showing a focus ring is unexpected
   * and visually jarring. Keyboard users NEED the ring — mouse users don't.
   * :focus-visible intelligently shows rings only for keyboard navigation.
   *
   * BROWSER SUPPORT: All modern browsers. IE11 is not supported by Sellora.
   *
   * IMPLEMENTATION:
   * outline: 2px solid transparent;
   * outline-offset: 2px;
   * &:focus-visible { box-shadow: var(--focus-ring-default); }
   */
  usesFocusVisible: true,
 
  /**
   * TAB ORDER:
   * Interactive elements must follow a logical visual reading order.
   * Default DOM order is usually correct — only override tabIndex when necessary.
   *
   * RULES:
   * - Never use tabIndex > 0 (this breaks natural tab order)
   * - tabIndex="0" = naturally focusable (use for div/span that need focus)
   * - tabIndex="-1" = focusable via JS only (not in tab flow)
   */
  tabIndex: {
    natural:     0,
    skipFromTab: -1,
    NEVER_USE:   1,  // tabIndex > 0 breaks tab order — never use
  },
 
  /**
   * SKIP LINK:
   * A "Skip to main content" link must be the FIRST focusable element.
   * It's hidden until focused, then appears at the top.
   * Required for WCAG 2.4.1 (Bypass Blocks).
   */
  skipLink: {
    text:  'Skip to main content',
    style: 'position: absolute; transform: translateY(-100%); &:focus { transform: translateY(0); }',
  },
 
  /**
   * FOCUS TRAP:
   * Modal dialogs, drawers, and the command palette must TRAP focus.
   * Users should not be able to tab to elements behind an open modal.
   * Implement using:
   * - The HTML dialog element (native focus trap)
   * - The @radix-ui/react-focus-scope package (used by shadcn/ui)
   * - A manual implementation checking Tab + Shift+Tab
   */
  focusTrap: {
    required: ['modal', 'dialog', 'drawer', 'commandPalette'],
    NOT_required: ['tooltip', 'popover', 'dropdown'],
  },
 
  /**
   * ESCAPE KEY:
   * Any element that opens (modal, dropdown, popover, command palette, drawer)
   * MUST close when the user presses Escape.
   * Focus must return to the trigger element that opened it.
   */
  escapeKey: {
    closes:       ['modal', 'dialog', 'drawer', 'dropdown', 'popover', 'commandPalette'],
    returnsFocus: true,
  },
 
} as const;
 
// ─── ACCESSIBILITY RULES ──────────────────────────────────────────────────────
 
export const focusAccessibility = {
  rules: [
    'All interactive elements (a, button, input, select, textarea) must be keyboard-focusable',
    'Custom interactive elements (div, span with onClick) must have tabIndex="0" and role',
    'Focus ring must be visible at all zoom levels (100% through 400%)',
    'Focus ring must have 3:1 contrast ratio against adjacent colors (WCAG 2.4.11)',
    'Focus must not be obscured by sticky headers — use scroll-margin-top to compensate',
    'Modal/dialog open → focus moves to first focusable element inside',
    'Modal/dialog close → focus returns to the trigger element',
    'Escape key closes all temporary overlay surfaces',
    'Arrow keys navigate within components (menu items, radio groups, tabs)',
    'Tab key navigates between components (not within)',
    'Enter/Space activates focused elements',
    'Never remove outline without providing equivalent focus indicator',
    'Test keyboard navigation for every new interactive component before shipping',
  ],
} as const;
 
export type FocusRing = typeof focusRing;
 