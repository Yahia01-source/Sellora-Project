
/**
 * @file tokens/visual/borders.ts
 * @description Sellora Visual Foundation — Border System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * BORDER PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Borders in Sellora serve THREE purposes:
 *
 * 1. SEPARATION — Dividing content areas without shadow (flat UI zones)
 * 2. CONTAINMENT — Defining the edges of interactive elements (inputs, cards)
 * 3. STATE COMMUNICATION — Color communicates focus, error, success, disabled
 *
 * BORDER RULE #1: 1px is the enterprise standard.
 * 2px borders feel "old web" or "developer tool". 1px is Stripe, Linear, Vercel.
 * The only exceptions: focus rings (2px) and active/selected indicators (2px left-border).
 *
 * BORDER RULE #2: Border color is always from the gray scale.
 * Blue borders = focus only. Red borders = error only. Green = success only.
 * Never use colored borders for decoration.
 *
 * BORDER RULE #3: Most cards use border + shadow together.
 * Border provides the containment definition.
 * Shadow provides the elevation perception.
 * Together: the element feels both "present" and "elevated".
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
// ─── BORDER WIDTHS ────────────────────────────────────────────────────────────
 
export const borderWidth = {
  /**
   * NONE — 0px
   * Use: Ghost elements, borderless table cells, focus-only interactive elements.
   * Removing border without layout shift: set to 0 with transparent color,
   * NOT display:none. This prevents layout recalculation on hover.
   */
  0:    '0px',
 
  /**
   * DEFAULT — 1px ← THE ONLY WIDTH YOU SHOULD COMMONLY USE
   *
   * Use: ALL cards, inputs, selects, dividers, table borders,
   *      outlined buttons, dropdown containers, badges.
   *
   * WHY 1px: One pixel is the minimum visible border. At 1px:
   * - Looks native and precise (not drawn, but structural)
   * - Doesn't compete with content
   * - Matches Stripe, Linear, GitHub, Vercel
   * Any wider and borders start to feel "heavy" in a data-dense dashboard.
   */
  1:    '1px',
 
  /**
   * MEDIUM — 2px
   *
   * Use: Focus rings, active/selected state left-border indicators,
   *      active tab underline, progress bar fill indicator.
   *
   * WHY 2px: Needs to be clearly visible above 1px borders without
   * being heavy. 2px focus rings pass WCAG 2.4.11 (Enhanced Focus).
   */
  2:    '2px',
 
  /**
   * ACCENT — 4px
   *
   * Use: Left-border accent on feature highlight cards, critical warning
   *      indicators, "you are here" sidebar indicators.
   *
   * WHY 4px: Thick enough to be unmistakably intentional as a design accent,
   * not confused with a default or focus border.
   */
  4:    '4px',
 
} as const;
 
// ─── BORDER STYLES ────────────────────────────────────────────────────────────
 
export const borderStyle = {
  /** Default solid — all structural borders */
  solid:  'solid',
  /** Dashed — drag-and-drop targets, optional upload zones, placeholder areas */
  dashed: 'dashed',
  /** Dotted — rarely used; keyboard shortcut indicators, technical callouts */
  dotted: 'dotted',
  /** None — explicitly removes border (vs transparent which keeps space) */
  none:   'none',
} as const;
 
// ─── BORDER COLOR PRIMITIVES ──────────────────────────────────────────────────
// Reference the gray and semantic color scales
 
export const borderColors = {
 
  // ── DEFAULT STATE ──────────────────────────────────────────────────────────
 
  /**
   * DEFAULT — gray-200 (#E5E7EB)
   *
   * The standard border for all cards, inputs, panels, and dividers.
   * At rest state — not hovered, not focused, not in error.
   *
   * WHY gray-200: Dark enough to be visible on white (#FFFFFF background)
   * while remaining extremely subtle. The contrast ratio of gray-200 on white
   * is ~1.4:1 — below WCAG for text but borders don't need text contrast.
   * Visible enough to define edges; invisible enough to not distract.
   */
  default:    '#E5E7EB',   // gray-200
 
  /**
   * STRONG — gray-300 (#D1D5DB)
   *
   * Use for: Table header separators, section dividers between major areas,
   *          sidebar main border, top nav bottom border.
   *
   * Slightly darker than default — used where the border needs more weight
   * to anchor a visual separation.
   */
  strong:     '#D1D5DB',   // gray-300
 
  /**
   * SUBTLE — gray-100 (#F3F4F6)
   *
   * Use for: Table row separators (between data rows), very light dividers
   *          inside cards, section separators within a panel.
   *
   * Near-invisible — for structure without visual weight.
   */
  subtle:     '#F3F4F6',   // gray-100
 
  // ── INTERACTIVE STATES ──────────────────────────────────────────────────────
 
  /**
   * HOVER — gray-300 (#D1D5DB)
   *
   * Applied to inputs, cards, and interactive containers on mouse hover.
   * Provides subtle feedback that the element is interactive without focus.
   *
   * WHY a distinct hover: Users need confirmation that hovering has registered.
   * gray-300 (one step darker) gives feedback without shouting.
   */
  hover:      '#D1D5DB',   // gray-300
 
  /**
   * ACTIVE — gray-400 (#9CA3AF)
   *
   * Applied during pointer down (mousedown). Brief visual confirmation of click.
   * Rarely seen but important for physical interaction feedback.
   */
  active:     '#9CA3AF',   // gray-400
 
  // ── SEMANTIC STATES ────────────────────────────────────────────────────────
 
  /**
   * FOCUS — blue-500 (#3B82F6)
   *
   * Applied to the border of focused input fields.
   * Combined with the focus ring (shadow), this creates a two-layer focus indicator.
   *
   * WHY blue: Universal "active/selected" signal. Blue focus is expected by users
   * across web and native interfaces. Deviating from blue for focus causes
   * accessibility confusion.
   *
   * WCAG: Focus border alone doesn't pass 2.4.11. COMBINE with focus ring shadow.
   */
  focus:      '#3B82F6',   // blue-500
 
  /**
   * ERROR — red-500 (#EF4444)
   *
   * Applied when a form field contains invalid input.
   * Combined with error message text and icon for multi-modal communication
   * (not relying on color alone — satisfies WCAG 1.4.1).
   */
  error:      '#EF4444',   // red-500
 
  /**
   * ERROR STRONG — red-600 (#DC2626)
   *
   * Use for the focus border on an error-state input.
   * When the field is BOTH invalid AND focused — stronger red to maintain
   * visibility alongside the focus ring.
   */
  errorStrong: '#DC2626',  // red-600
 
  /**
   * SUCCESS — green-500 (#22C55E)
   *
   * Applied to validated/confirmed inputs (e.g., coupon code accepted,
   * email verified, password meets requirements).
   */
  success:    '#22C55E',   // green-500
 
  /**
   * WARNING — amber-500 (#F59E0B)
   *
   * Applied to fields with warnings (not errors) — e.g., "This email
   * is already registered" (informational, not blocking).
   */
  warning:    '#F59E0B',   // amber-500
 
  /**
   * DISABLED — gray-200 (#E5E7EB)
   *
   * Disabled inputs use the SAME border color as default but with 40% opacity
   * applied to the entire component. The border color itself doesn't change —
   * the opacity communicates the disabled state.
   *
   * WHY same color + opacity: Maintains visual structure while clearly
   * communicating unavailability. Changing border color for disabled would
   * require special handling — opacity is simpler and more maintainable.
   */
  disabled:   '#E5E7EB',   // gray-200 (used with opacity-40)
 
  // ── ACCENT BORDERS ─────────────────────────────────────────────────────────
 
  /**
   * PRIMARY — blue-600 (#2563EB)
   *
   * Used for: Selected item left-border indicator in lists and sidebars,
   *           active tab underline, progress fill borders.
   *
   * This IS the brand color — used intentionally, not by default.
   */
  primary:    '#2563EB',   // blue-600
 
  /**
   * TRANSPARENT — completely invisible
   * Used to maintain element dimensions without showing a border.
   * Critical for hover states where adding a border would cause layout shift.
   * Always set border: 1px solid transparent as the "no border" state
   * rather than border: none.
   */
  transparent: 'transparent',
 
} as const;
 
// ─── SEMANTIC BORDER COMBINATIONS ─────────────────────────────────────────────
/**
 * Complete border definitions for common component states.
 * Use these in component implementations rather than combining
 * width + style + color manually.
 */
 
export const borderTokens = {
 
  // ── CARD BORDERS ───────────────────────────────────────────────────────────
  card: {
    default: `${borderWidth[1]} ${borderStyle.solid} ${borderColors.default}`,
    hover:   `${borderWidth[1]} ${borderStyle.solid} ${borderColors.hover}`,
  },
 
  // ── INPUT BORDERS ──────────────────────────────────────────────────────────
  input: {
    default:  `${borderWidth[1]} ${borderStyle.solid} ${borderColors.default}`,
    hover:    `${borderWidth[1]} ${borderStyle.solid} ${borderColors.hover}`,
    focus:    `${borderWidth[1]} ${borderStyle.solid} ${borderColors.focus}`,
    error:    `${borderWidth[1]} ${borderStyle.solid} ${borderColors.error}`,
    errorFocus: `${borderWidth[1]} ${borderStyle.solid} ${borderColors.errorStrong}`,
    success:  `${borderWidth[1]} ${borderStyle.solid} ${borderColors.success}`,
    warning:  `${borderWidth[1]} ${borderStyle.solid} ${borderColors.warning}`,
    disabled: `${borderWidth[1]} ${borderStyle.solid} ${borderColors.disabled}`,
  },
 
  // ── DIVIDER ────────────────────────────────────────────────────────────────
  divider: {
    default: `${borderWidth[1]} ${borderStyle.solid} ${borderColors.default}`,
    strong:  `${borderWidth[1]} ${borderStyle.solid} ${borderColors.strong}`,
    subtle:  `${borderWidth[1]} ${borderStyle.solid} ${borderColors.subtle}`,
  },
 
  // ── SELECTED / ACTIVE INDICATOR ────────────────────────────────────────────
  indicator: {
    active:   `${borderWidth[2]} ${borderStyle.solid} ${borderColors.primary}`,
    error:    `${borderWidth[4]} ${borderStyle.solid} ${borderColors.error}`,
    warning:  `${borderWidth[4]} ${borderStyle.solid} ${borderColors.warning}`,
    success:  `${borderWidth[4]} ${borderStyle.solid} ${borderColors.success}`,
  },
 
  // ── DROP ZONE ──────────────────────────────────────────────────────────────
  dropzone: {
    default: `${borderWidth[2]} ${borderStyle.dashed} ${borderColors.default}`,
    active:  `${borderWidth[2]} ${borderStyle.dashed} ${borderColors.primary}`,
    accept:  `${borderWidth[2]} ${borderStyle.dashed} ${borderColors.success}`,
    reject:  `${borderWidth[2]} ${borderStyle.dashed} ${borderColors.error}`,
  },
 
} as const;
 
export type BorderWidth = typeof borderWidth;
export type BorderColor = typeof borderColors;
export type BorderKey = keyof typeof borderColors;
 