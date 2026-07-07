
/**
 * @file tokens/visual/shadows.ts
 * @description Sellora Visual Foundation — Shadow & Elevation System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * SHADOW PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Shadows in Sellora simulate PHYSICAL LIGHT from above-and-slightly-forward.
 * This follows the same model as Material Design and Apple's Human Interface
 * Guidelines — a virtual light source at roughly 12 o'clock, slightly elevated.
 *
 * THE TWO-LAYER SHADOW TECHNIQUE:
 * Every shadow in Sellora uses TWO box-shadow values:
 *
 *   Layer 1: AMBIENT SHADOW — the soft, diffuse glow from environment light
 *     (large blur, low opacity, small or no offset)
 *   Layer 2: DIRECTIONAL SHADOW — the crisp shadow cast by the direct light source
 *     (small blur, slightly higher opacity, downward offset)
 *
 * WHY TWO LAYERS:
 * A single box-shadow looks like a "glued on" Photoshop drop shadow — flat and
 * artificial. Two layers mimic how real objects cast shadows: a sharp crisp
 * shadow close to the object, and a soft ambient glow further out.
 * Stripe, Linear, and Vercel all use this technique.
 *
 * SHADOW SCALE PHILOSOPHY:
 * Shadows are SPARING in Sellora. Not every card needs a shadow.
 * The default card uses shadow-sm — barely noticeable.
 * The scale escalates for elements that are genuinely "floating" above the page.
 *
 * ════════════════════════════════════════════════════════════════════════════════
 * ELEVATION HIERARCHY
 * ════════════════════════════════════════════════════════════════════════════════
 *
 * LEVEL 0 — Page Background (no shadow)
 * LEVEL 1 — Cards, Panels, Tables (shadow-sm)
 * LEVEL 2 — Dropdowns, Floating Toolbars (shadow-md)
 * LEVEL 3 — Drawers, Popovers (shadow-lg)
 * LEVEL 4 — Modals, Dialogs (shadow-xl)
 * LEVEL 5 — Command Palette, Critical Alerts (shadow-2xl)
 * LEVEL 6 — Maximum emphasis (shadow-3xl — rare)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
export const shadow = {
 
  /**
   * NONE — No shadow
   *
   * Use for:
   * - Flat buttons (ghost, borderless)
   * - Table rows (the containing card has the shadow)
   * - Sidebar background (sidebar border provides edge definition)
   * - Elements that are explicitly flat by design
   * - Removing shadow from interactive states (when pressing a button)
   *
   * ELEVATION: 0 — On the page surface
   */
  none: 'none',
 
  /**
   * XS — Hairline elevation
   *
   * Use for:
   * - Button hover state (adds very subtle lift)
   * - Input field focus (combined with focus border)
   * - Hovered table rows
   * - Small floating indicators
   * - Active state on icon buttons
   *
   * ANATOMY: 1px down, 1px blur, 5% opacity
   * ELEVATION: 0.5 — Just barely lifting from the surface
   *
   * WHY SO SUBTLE: XS shadow is used for micro-interactions.
   * The change from none→xs is what matters (the transition), not the end state.
   */
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
 
  /**
   * SM — Default card shadow
   *
   * Use for:
   * - ALL default cards (the most-used shadow in Sellora)
   * - Stat/metric widgets
   * - Panel sections
   * - Default state of all surface-level cards
   * - Navigation breadcrumb containers
   *
   * ANATOMY:
   *   Layer 1: 0 1px 3px 0 rgba(0,0,0,0.10) — directional
   *   Layer 2: 0 1px 2px -1px rgba(0,0,0,0.06) — ambient
   * ELEVATION: 1 — Resting on the page
   *
   * WHY THIS VALUE: At shadow-sm, cards are clearly defined but don't "float".
   * The page feels flat and organized. Shadow-sm says "here is a container"
   * without screaming "this is elevated and special".
   */
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
 
  /**
   * MD — Raised card / interactive hover
   *
   * Use for:
   * - Cards on hover (lifted hover state)
   * - Floating toolbars and action bars
   * - "Pinned" elements (sticky elements that need visual separation)
   * - Active/selected cards
   * - Date picker containers
   * - Color picker containers
   *
   * ANATOMY:
   *   Layer 1: 0 4px 6px -1px rgba(0,0,0,0.08) — directional
   *   Layer 2: 0 2px 4px -2px rgba(0,0,0,0.05) — ambient
   * ELEVATION: 2 — Slightly raised above the page
   */
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
 
  /**
   * LG — Floating elements
   *
   * Use for:
   * - Dropdown menus (select, combobox)
   * - Context menus (right-click)
   * - Autocomplete suggestion lists
   * - Floating action button
   * - Notification toasts
   * - Sidebar on mobile (slides over content)
   *
   * ANATOMY:
   *   Layer 1: 0 10px 15px -3px rgba(0,0,0,0.08) — directional
   *   Layer 2: 0 4px 6px -4px rgba(0,0,0,0.05) — ambient
   * ELEVATION: 3 — Floating above the page content
   */
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
 
  /**
   * XL — Modal and drawer level
   *
   * Use for:
   * - Modal dialogs
   * - Drawer panels (side sheets)
   * - Alert dialogs
   * - Large popovers with complex content
   * - Rich tooltip panels (with actions)
   *
   * ANATOMY:
   *   Layer 1: 0 20px 25px -5px rgba(0,0,0,0.10) — directional
   *   Layer 2: 0 8px 10px -6px rgba(0,0,0,0.05) — ambient
   * ELEVATION: 4 — Significantly above content
   */
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
 
  /**
   * 2XL — Command palette and critical surfaces
   *
   * Use for:
   * - Command palette (⌘K) — the highest user-triggered surface
   * - Critical confirmation dialogs (destructive actions)
   * - Global search overlay
   * - Announcement modals
   *
   * ANATOMY: 0 25px 50px -12px rgba(0,0,0,0.20)
   * ELEVATION: 5 — Maximum user-facing elevation
   *
   * WHY SINGLE LAYER: At this level, the shadow is so large that two-layer
   * complexity becomes imperceptible. One strong shadow reads correctly.
   */
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.20)',
 
  /**
   * 3XL — Maximum elevation (system-critical only)
   *
   * Use for:
   * - System alerts (requires immediate action)
   * - Emergency banners
   * - Session expiry warning
   * - Critical error states that overlay everything
   *
   * WHY IT EXISTS: Even above command palette, some system-level messages
   * need to feel absolutely above everything. This is that level.
   * NEVER use for regular UI elements.
   *
   * ANATOMY: 0 35px 60px -15px rgba(0,0,0,0.30)
   * ELEVATION: 6 — Absolute maximum
   */
  '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.30)',
 
  // ── SPECIAL-PURPOSE SHADOWS ────────────────────────────────────────────────
 
  /**
   * INNER — Inset shadow
   *
   * Use for:
   * - Text input fields (subtle depth signals "type here")
   * - Progress track (the unfilled background)
   * - Pressed/active button state
   * - Switch track background
   * - Checkbox when checked (prevents "floating" check appearance)
   *
   * WHY INSET: Inputs are recessed INTO the page. Regular box-shadow
   * would make them appear to float, which is the wrong mental model.
   * Inset shadow says "this is a container you put things into".
   */
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
 
  /**
   * INNER STRONG — Deeper inset for pressed states
   *
   * Use for: Button active/pressed state, toggle pressed state.
   */
  innerStrong: 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.12)',
 
} as const;
 
// ─── FOCUS RING SHADOWS ───────────────────────────────────────────────────────
// Defined separately because focus rings are technically shadows (box-shadow)
// but serve the accessibility system, not the elevation system.
// See focus.ts for the complete focus ring system.
 
export const focusShadow = {
  /**
   * Default focus ring — used on most interactive elements.
   * Two-layer: white gap + blue ring. Creates a "floating" ring effect.
   */
  default:     '0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB',
 
  /**
   * Focus ring on colored backgrounds (where white gap is invisible).
   * Use on primary buttons, colored surfaces.
   */
  onColor:     '0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 0 4px #2563EB',
 
  /**
   * Error state focus ring — red instead of blue.
   */
  error:       '0 0 0 2px #FFFFFF, 0 0 0 4px #EF4444',
 
  /**
   * Warning state focus ring.
   */
  warning:     '0 0 0 2px #FFFFFF, 0 0 0 4px #F59E0B',
 
  /**
   * Success state focus ring.
   */
  success:     '0 0 0 2px #FFFFFF, 0 0 0 4px #22C55E',
 
  /**
   * Inset focus ring — for elements where outer ring would be clipped.
   * Use in table cells, embedded controls, overlapping elements.
   */
  inset:       'inset 0 0 0 2px #2563EB',
 
} as const;
 
// ─── ELEMENT-SPECIFIC SHADOW MAPPING ─────────────────────────────────────────
/**
 * Component-level shadow assignment.
 * ALWAYS reference these instead of choosing from the scale directly.
 * This way, changing "all dropdown shadows" is a 1-line change.
 */
 
export const componentShadows = {
  card:           shadow.sm,
  cardHover:      shadow.md,
  dropdown:       shadow.lg,
  contextMenu:    shadow.lg,
  sidebar:        shadow.lg,
  popover:        shadow.lg,
  tooltip:        shadow.md,
  modal:          shadow.xl,
  drawer:         shadow.xl,
  dialog:         shadow.xl,
  commandPalette: shadow['2xl'],
  toast:          shadow.lg,
  floatingPanel:  shadow.xl,
  button:         shadow.none,
  buttonHover:    shadow.xs,
  input:          shadow.inner,
  inputFocus:     `${shadow.inner}, ${focusShadow.default}`,
} as const;
 
export type ShadowKey = keyof typeof shadow;
export type Shadow = typeof shadow;
 