
/**
 * @file tokens/visual/opacity.ts
 * @description Sellora Visual Foundation — Opacity, Blur & Overlay System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * OPACITY PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Opacity in Sellora is used for THREE purposes:
 *
 * 1. STATE COMMUNICATION — disabled, muted, placeholder states
 * 2. OVERLAY BACKGROUNDS — backdrop behind modals, drawers, dialogs
 * 3. VISUAL HIERARCHY — de-emphasizing secondary content
 *
 * OPACITY RULE: Never use opacity to change COLOR.
 * If you want "light blue text", use a lighter blue token.
 * Use opacity ONLY to change the perceived weight/presence of an element.
 *
 * OPACITY ACCESSIBILITY WARNING:
 * Elements with opacity < 100% inherit the background color below them.
 * This means contrast ratios are calculated against BOTH the element color
 * AND the visible background. Always verify contrast after applying opacity.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
export const opacity = {
 
  /**
   * 0 — Invisible
   * Use: Hidden elements that maintain layout space (vs display:none).
   * Critical for enter/exit animations — start at 0, animate to 100.
   */
  0:    '0',
 
  /**
   * 5% — Ghost presence
   * Use: Hover backgrounds on navigation items, subtle surface tints.
   * Nearly invisible — feels like "almost nothing" which IS the point.
   */
  5:    '0.05',
 
  /**
   * 10% — Barely there
   * Use: Watermark effects, very subtle background tints on colored badges.
   * Example: A blue chip background in a white card.
   */
  10:   '0.10',
 
  /**
   * 20% — Light tint
   * Use: Image overlays for text legibility, skeleton pulse animation endpoint,
   *      decorative background elements.
   */
  20:   '0.20',
 
  /**
   * 30% — Soft overlay
   * Use: Partially obscured content (blurred/greyed out previous step in
   *      a multi-step process), shadow tints.
   */
  30:   '0.30',
 
  /**
   * 40% — DISABLED STATE ← Most important opacity value
   *
   * Use: ALL disabled UI elements — buttons, inputs, checkboxes, selects.
   *
   * WHY 40% specifically:
   * - Apple HIG recommends ~40% for disabled states
   * - Google Material uses 38% (we round to 40%)
   * - Tested across devices: at 40%, elements are CLEARLY unavailable but
   *   still readable enough to understand what they are
   * - 50% is too borderline — some users think 50% might still be clickable
   * - 30% starts to be illegible at small text sizes
   *
   * IMPLEMENTATION: Apply to the entire component container, not individual
   * elements within it. opacity:0.4 on the <button> affects everything inside.
   */
  40:   '0.40',
 
  /**
   * 50% — MODAL BACKDROP / OVERLAY ← Second most important
   *
   * Use: Modal backdrop, drawer backdrop, dialog backdrop.
   *
   * WHY 50%: The backdrop must do two things simultaneously:
   * 1. Clearly indicate the content below is "blocked/inactive"
   * 2. Allow users to still perceive what's behind (context maintenance)
   *
   * At 50% black: the background is clearly dimmed but not black.
   * At 70%: feels oppressive, users lose context of where they are.
   * At 30%: too transparent, doesn't clearly block the background.
   * 50% is the tested sweet spot.
   *
   * Combined with rgba: rgba(0, 0, 0, 0.5) — this is the standard.
   */
  50:   '0.50',
 
  /**
   * 60% — MUTED / SECONDARY EMPHASIS
   *
   * Use: Secondary icon colors, placeholder icon states, watermarks,
   *      de-emphasized content when something else is more important.
   *
   * Example: When a modal is open, the page content behind the backdrop
   * could be rendered at 60% if we weren't using rgba background.
   */
  60:   '0.60',
 
  /**
   * 70% — SOFT HIDE
   *
   * Use: Preview of "behind modal" content in page transitions,
   *      grayed-out previous wizard steps, inactive tab panel content.
   */
  70:   '0.70',
 
  /**
   * 80% — PARTIAL PRESENCE
   *
   * Use: Tooltips with slight transparency on colored backgrounds,
   *      popover backgrounds that allow slight bleed-through,
   *      frosted glass effects (combined with backdrop-filter blur).
   */
  80:   '0.80',
 
  /**
   * 90% — NEAR-COMPLETE
   *
   * Use: Loading state overlay on a page section that is refreshing,
   *      frosted glass panels (combines with blur for premium feel).
   */
  90:   '0.90',
 
  /**
   * 100% — FULL OPACITY (default)
   * Explicit full opacity — used in CSS transitions to animate FROM
   * a transparent state back to fully visible. Never "do nothing" —
   * setting opacity:1 in a transition endpoint IS doing something.
   */
  100:  '1',
 
} as const;
 
// ─── BLUR TOKENS ──────────────────────────────────────────────────────────────
/**
 * BLUR PHILOSOPHY:
 * Blur is used sparingly in Sellora — it's a premium effect that signals
 * depth and layering. Overuse makes the UI feel "trying too hard".
 *
 * Primary use: backdrop-filter: blur() on overlay panels.
 * Secondary use: Frosted glass effects on floating panels.
 *
 * PERFORMANCE NOTE: backdrop-filter is GPU-accelerated but can still
 * impact performance on low-end devices. Only use blur on elements
 * that are rarely visible (modals, not cards).
 */
 
export const blur = {
 
  /**
   * NONE — No blur
   * Default state — no filter applied.
   */
  none: '0',
 
  /**
   * XS — 4px
   * Use: Extremely subtle frost effect, barely perceptible blur.
   * Most users won't notice this is blur — it just makes the edge softer.
   */
  xs:   '4px',
 
  /**
   * SM — 8px
   * Use: Subtle frosted glass on sidebar, tooltip background on busy page.
   * Slight content bleed-through creates depth without losing legibility.
   */
  sm:   '8px',
 
  /**
   * MD — 12px
   * Use: Standard frosted glass modals (when using glassmorphism effect),
   *      blurred loading placeholder (skeleton alternative).
   */
  md:   '12px',
 
  /**
   * LG — 16px
   * Use: Modal backdrops that use blur instead of dark overlay.
   *      Creates "macOS frosted glass" effect.
   */
  lg:   '16px',
 
  /**
   * XL — 24px
   * Use: Full-page overlay blur (when content is "locked"),
   *      security blur (sensitive data hidden but visible as blur).
   */
  xl:   '24px',
 
  /**
   * 2XL — 40px
   * Use: Maximum blur for accessibility "hide sensitive data" features,
   *      dramatic enter animations for command palette.
   */
  '2xl': '40px',
 
} as const;
 
// ─── OVERLAY TOKENS ───────────────────────────────────────────────────────────
/**
 * Overlay backgrounds for UI surfaces that appear above page content.
 * Each overlay type has a specific visual treatment.
 */
 
export const overlay = {
 
  /**
   * MODAL BACKDROP
   *
   * Standard dark semi-transparent backdrop behind modals.
   * Applied to the full viewport with fixed positioning.
   *
   * WHY rgba not hex+opacity: rgba allows the backdrop to adapt to
   * system dark mode and maintains transparency without opacity inheritance issues.
   */
  modal: {
    background: 'rgba(3, 7, 18, 0.50)',    // gray-950 at 50%
    backdropFilter: 'none',                  // no blur by default
    zIndex: 300,
  },
 
  /**
   * DIALOG BACKDROP (confirmation dialogs)
   *
   * Slightly less opaque than modal — dialogs are smaller and less "heavy".
   * The slight difference signals "less serious interruption".
   */
  dialog: {
    background: 'rgba(3, 7, 18, 0.40)',    // gray-950 at 40%
    backdropFilter: 'none',
    zIndex: 300,
  },
 
  /**
   * DRAWER BACKDROP
   *
   * Drawers slide in from the side — their backdrop is lighter because
   * the drawer itself is visually prominent.
   */
  drawer: {
    background: 'rgba(3, 7, 18, 0.40)',    // gray-950 at 40%
    backdropFilter: 'none',
    zIndex: 300,
  },
 
  /**
   * POPOVER BACKDROP
   *
   * Popovers don't use a full-page backdrop — they use a click-outside
   * handler instead. This token exists for edge cases where a backdrop
   * is needed for a popover on mobile.
   */
  popover: {
    background: 'rgba(3, 7, 18, 0.20)',    // gray-950 at 20%
    backdropFilter: 'none',
    zIndex: 200,
  },
 
  /**
   * FROSTED GLASS BACKDROP (premium alternative to dark overlay)
   *
   * Use on: Command palette, premium modal variants.
   * Creates a macOS-style frosted glass effect.
   *
   * BROWSER SUPPORT: backdrop-filter is supported in all modern browsers.
   * Provide the dark overlay as fallback for browsers without support.
   */
  frosted: {
    background: 'rgba(255, 255, 255, 0.70)',
    backdropFilter: `blur(${blur.lg})`,    // blur(16px)
    zIndex: 300,
  },
 
  /**
   * LOADING OVERLAY
   *
   * Applied over a section that is loading/refreshing data.
   * Semi-transparent to keep context while signaling "updating".
   */
  loading: {
    background: 'rgba(255, 255, 255, 0.80)',
    backdropFilter: 'none',
    zIndex: 10,
  },
 
  /**
   * SECURITY OVERLAY
   *
   * Blurs sensitive content (e.g., API keys, financial totals in screenshots).
   * User can click to reveal.
   */
  security: {
    background: 'transparent',
    backdropFilter: `blur(${blur.xl})`,    // blur(24px)
    zIndex: 1,
  },
 
} as const;
 
export type OpacityKey = keyof typeof opacity;
export type BlurKey = keyof typeof blur;
export type OverlayKey = keyof typeof overlay;
 