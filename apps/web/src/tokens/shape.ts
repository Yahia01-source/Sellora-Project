
/**
 * @file tokens/shape.ts
 * @description Sellora Design Token System — Shape, Shadow, Opacity, Border, Z-Index
 *
 * SHAPE PHILOSOPHY:
 * Sellora's corner radius system is deliberately conservative.
 * Stripe uses 4-6px. Linear uses 6-8px. Vercel uses 8px.
 * We default to 6px (md) — professional without being "boxy" or "bubbly".
 * Large radius (pill/full) is reserved for badges and toggles only.
 *
 * WHY NOT fully rounded everywhere:
 * Fully rounded cards look consumer/mobile. Sellora is enterprise software.
 * The shape should feel precise, not friendly.
 */
 
// ─── BORDER RADIUS ────────────────────────────────────────────────────────────
 
export const borderRadius = {
  /**
   * NONE — 0px
   * Use: Dividers, full-width bars, progress tracks.
   * WHY: Some elements should have zero radius to feel "structural".
   */
  none: '0px',
 
  /**
   * XS — 2px
   * Use: Tags inside tables, keyboard shortcut badges, status dots.
   * WHY: Subtle rounding that distinguishes from sharp while staying micro.
   */
  xs:   '0.125rem',
 
  /**
   * SM — 4px
   * Use: Input fields, select dropdowns, small buttons, tooltips.
   * WHY: The Stripe default. Looks intentional and precise at small sizes.
   */
  sm:   '0.25rem',
 
  /**
   * MD — 6px ← DEFAULT
   * Use: Cards, panels, modals, drawers, default buttons.
   * WHY: This is THE defining radius for Sellora's identity.
   * Not as boxy as 4px, not as casual as 8px. Enterprise sweet spot.
   */
  md:   '0.375rem',
 
  /**
   * LG — 8px
   * Use: Sidebars, large cards, dropdowns with content.
   * WHY: Larger elements need proportionally larger radius to feel balanced.
   */
  lg:   '0.5rem',
 
  /**
   * XL — 12px
   * Use: Modal containers, toast notifications, command palette.
   * WHY: Modal is a "floating" element — slightly more radius reads as "elevated".
   */
  xl:   '0.75rem',
 
  /**
   * 2XL — 16px
   * Use: Full-page overlays, onboarding modals, empty state cards.
   * WHY: Generous radius for large surfaces that need to feel approachable.
   */
  '2xl': '1rem',
 
  /**
   * FULL — 9999px (pill)
   * Use: Badges, status chips, toggle switches, avatar images.
   * WHY: Pill shape is the universal signal for "label/tag/badge".
   * Never use on cards or panels — it will look like a consumer app.
   */
  full: '9999px',
} as const;
 
// ─── SHADOWS ─────────────────────────────────────────────────────────────────
/**
 * SHADOW PHILOSOPHY:
 * Sellora's shadows are extremely subtle. The background is white,
 * the cards are white — shadow is the ONLY thing creating depth.
 * Overusing large shadows makes the UI feel like a PowerPoint slide.
 *
 * Shadow anatomy: offset-x offset-y blur spread color
 *
 * WHY multiple shadow layers (not one):
 * A single box-shadow looks "stuck on". Two-layer shadows (one ambient,
 * one directional) look natural, like a real object casting light.
 * Stripe, Linear, and Vercel all use this technique.
 *
 * Base color: rgba(0, 0, 0, alpha) on white backgrounds.
 * We avoid colored shadows — they look trendy but age poorly.
 */
 
export const shadow = {
  /**
   * XS — Hairline elevation
   * Use: Table cells on hover, subtle input focus rings (combined with border).
   * Difference from none: You can barely see it — and that's the point.
   */
  xs:   '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
 
  /**
   * SM — Default card shadow
   * Use: Default cards, dropdown menus, small panels.
   * WHY this is the most-used shadow: Cards need to lift from the page just enough
   * to be perceived as interactive surfaces. Not floating, not flat.
   */
  sm:   '0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
 
  /**
   * MD — Raised card / focused element
   * Use: Hovered cards, focused date pickers, active dropdown containers.
   * WHY: Interaction increases perceived elevation — this mirrors physical reality.
   */
  md:   '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
 
  /**
   * LG — Floating elements
   * Use: Popovers, context menus, command palette, select dropdowns.
   * WHY: These elements are "above" the page — their shadow should be clearly visible.
   */
  lg:   '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
 
  /**
   * XL — Modals / Drawers
   * Use: Modal dialogs, side drawers, full overlays.
   * WHY: Modal is the highest surface in the UI — maximum shadow.
   * Still not dramatic — enterprise software shouldn't feel theatrical.
   */
  xl:   '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
 
  /**
   * 2XL — Command palette, premium overlays
   * Use: Command palette (⌘K), global search, critical alerts.
   * WHY: These are the most important surfaces. Maximum elevation.
   */
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
 
  /**
   * INNER — Inset shadow
   * Use: Input fields (subtle depth), progress bars, avatar backgrounds.
   * WHY: Inputs feel more "real" with a very slight inner shadow —
   * they look like they're recessed into the surface.
   */
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
 
  /**
   * NONE — Explicit no shadow
   * Use: Flat buttons, borderless tables, ghost elements.
   */
  none: 'none',
 
  /**
   * FOCUS — Focus ring shadow (accessibility)
   * Use: Combined with border on focused inputs, buttons, and interactive elements.
   * WHY: We use box-shadow for focus rings (not outline) to control shape
   * and allow border-radius to be respected. This is the Stripe/Radix approach.
   * 3px offset from element + blue ring = clearly visible without being jarring.
   */
  focus: '0 0 0 3px rgba(37, 99, 235, 0.20)',
 
  /**
   * FOCUS DANGER — Focus ring on error state inputs
   */
  focusDanger: '0 0 0 3px rgba(225, 29, 72, 0.20)',
} as const;
 
// ─── OPACITY ─────────────────────────────────────────────────────────────────
 
export const opacity = {
  /**
   * DISABLED — 40%
   * Use: Any element in a disabled state.
   * WHY 40% not 50%: At 50%, disabled elements still look clickable.
   * 40% is the value used by Apple HIG and Google Material — tested against
   * users who associate this level with "unavailable".
   */
  disabled: '0.4',
 
  /**
   * MUTED — 60%
   * Use: Secondary icons, decorative elements, watermarks.
   * WHY: Visually de-emphasizes without fully hiding. Used for non-interactive
   * items that provide context but shouldn't draw attention.
   */
  muted:    '0.6',
 
  /**
   * OVERLAY — 50%
   * Use: Modal backdrop, drawer backdrop.
   * WHY: Dark enough to signal "background is blocked" but not so dark that
   * the UI feels oppressive. Stripe uses 50% with a slight blur.
   */
  overlay:  '0.5',
 
  /**
   * FULL — 100%
   * Explicit for cases where opacity needs to be reset (animation, JS classes).
   */
  full:     '1',
} as const;
 
// ─── BORDER WIDTH ─────────────────────────────────────────────────────────────
 
export const borderWidth = {
  /**
   * 0 — No border
   * Use: Ghost buttons, borderless tables, clean backgrounds.
   */
  0:    '0px',
 
  /**
   * DEFAULT — 1px
   * Use: All cards, inputs, dividers, buttons (outlined variant).
   * WHY 1px not 2px: Enterprise software prefers thin borders.
   * 2px borders feel "old web" or "mobile app". 1px is razor-precise.
   */
  1:    '1px',
 
  /**
   * 2px — Accent borders, active state indicators, focus borders.
   * Use: Selected sidebar item left-border, active tab underline, focus input.
   * WHY: 2px is thick enough to be unmistakably intentional, thin enough to be elegant.
   */
  2:    '2px',
 
  /**
   * 4px — Strong accent, error borders on prominent inputs.
   * Use: Feature highlight cards, critical error states.
   */
  4:    '4px',
} as const;
 
// ─── Z-INDEX ─────────────────────────────────────────────────────────────────
/**
 * Z-INDEX PHILOSOPHY:
 * Named z-indices prevent the "z-index: 9999999" arms race.
 * Each layer has a defined purpose. Anything above overlay is a system-level element.
 *
 * WHY gaps of 10:
 * Leaves room for sub-layers (e.g., z.dropdown + 1 for sub-menus).
 * Still keeps values human-readable (not 9999).
 */
 
export const zIndex = {
  /**
   * BASE — 0
   * Normal document flow. Cards, content, page sections.
   */
  base:     0,
 
  /**
   * RAISED — 10
   * Slightly above normal. Sticky table headers, fixed column cells.
   * Use when an element needs to be above siblings in the same stacking context.
   */
  raised:   10,
 
  /**
   * DROPDOWN — 100
   * Select menus, date pickers, comboboxes.
   * WHY 100: Needs to be well above page content but below overlays.
   */
  dropdown: 100,
 
  /**
   * STICKY — 200
   * Sticky sidebar, sticky page header/top nav, sticky table header.
   * WHY above dropdown: Sticky headers must appear above open dropdowns.
   */
  sticky:   200,
 
  /**
   * OVERLAY — 300
   * Modal/drawer backdrop. Sits above all page content.
   */
  overlay:  300,
 
  /**
   * MODAL — 400
   * Modal/drawer content. Above its own backdrop.
   */
  modal:    400,
 
  /**
   * POPOVER — 500
   * Tooltips, popovers inside modals. Must be above modal.
   * WHY: A date picker inside a modal must be above the modal surface.
   */
  popover:  500,
 
  /**
   * TOAST — 600
   * Toast notifications. Must appear above everything.
   * WHY highest non-system: Toasts are feedback — they must never be hidden.
   */
  toast:    600,
 
  /**
   * COMMAND — 700
   * Command palette (⌘K). Highest user-accessible surface.
   */
  command:  700,
} as const;
 
export type BorderRadius = typeof borderRadius;
export type Shadow = typeof shadow;
export type Opacity = typeof opacity;
export type BorderWidth = typeof borderWidth;
export type ZIndex = typeof zIndex;
 