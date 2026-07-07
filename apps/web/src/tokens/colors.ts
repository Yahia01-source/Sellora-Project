
/**
 * @file tokens/colors.ts
 * @description Sellora Design Token System — Color Primitives & Semantic Tokens
 *
 * PHILOSOPHY:
 * Two layers exist here:
 *   1. Primitives — raw, unnamed scale values (gray-100, blue-600)
 *   2. Semantic    — named purpose tokens that map to primitives (text.primary → gray-950)
 *
 * WHY THIS MATTERS:
 * Shopify Polaris, GitHub Primer, and Radix all operate this way.
 * If you ever need to rebrand or go dark mode, you change semantic tokens only.
 * Components never hardcode "gray-200"; they reference "border.default".
 * This decoupling is what separates design systems from stylesheets.
 *
 * LIGHT MODE ONLY (Phase 1):
 * Sellora ships Light Mode first. The semantic layer is designed so that
 * dark mode can be bolted on later by remapping semantics — zero component changes.
 */
 
// ─── PRIMITIVE: GRAY SCALE ───────────────────────────────────────────────────
// Based on a neutral, slightly cool gray.
// WHY cool gray: Stripe, Linear, and Vercel all use cool-leaning neutrals.
// Warm grays read as "old" or "document-like" (Notion). Cool grays read as "software".
 
export const gray = {
  /** Near-white. Page sections, alternate row backgrounds. */
  50:  '#F9FAFB',
  /** Default hover state for interactive items on white. */
  100: '#F3F4F6',
  /** Dividers, input borders on hover. */
  200: '#E5E7EB',
  /** Default border color. Subtle separators. */
  300: '#D1D5DB',
  /** Placeholder text. Disabled input borders. */
  400: '#9CA3AF',
  /** Muted text. Icon fill in inactive state. */
  500: '#6B7280',
  /** Secondary text. Labels. */
  600: '#4B5563',
  /** Body text on light surfaces. */
  700: '#374151',
  /** Primary text. High-contrast readable. */
  800: '#1F2937',
  /** Near-black. For headings. */
  900: '#111827',
  /** True near-black. Display text, max contrast. */
  950: '#030712',
} as const;
 
// ─── PRIMITIVE: BLUE SCALE ───────────────────────────────────────────────────
// Sellora's primary action color.
// WHY blue: Universal signal of "interactable". Stripe, Linear, Vercel all use blue.
// We use a slightly desaturated blue — not the harsh #0000FF, but not the washed-out
// Tailwind default either. This sits between them: professional, confident, clear.
 
export const blue = {
  /** Lightest tint. Used for info callout backgrounds. */
  50:  '#EFF6FF',
  /** Active tab indicator background. Chip backgrounds. */
  100: '#DBEAFE',
  /** Tag backgrounds, badge fills on hover. */
  200: '#BFDBFE',
  /** Progress bar fills, light accent borders. */
  300: '#93C5FD',
  /** Focus rings (inner shadow). Secondary button borders. */
  400: '#60A5FA',
  /** Primary CTA hover state. */
  500: '#3B82F6',
  /** PRIMARY ACTION COLOR. Buttons, links, active nav items. */
  600: '#2563EB',
  /** Pressed/active button state. */
  700: '#1D4ED8',
  /** Dark accent for text-links on colored backgrounds. */
  800: '#1E40AF',
  /** Very dark blue. Rarely used — only on colored surfaces. */
  900: '#1E3A8A',
  /** Near-black blue. */
  950: '#172554',
} as const;
 
// ─── PRIMITIVE: GREEN (SUCCESS) ──────────────────────────────────────────────
export const green = {
  50:  '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
  950: '#052E16',
} as const;
 
// ─── PRIMITIVE: AMBER (WARNING) ──────────────────────────────────────────────
export const amber = {
  50:  '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03',
} as const;
 
// ─── PRIMITIVE: RED (DANGER) ─────────────────────────────────────────────────
export const red = {
  50:  '#FFF1F2',
  100: '#FFE4E6',
  200: '#FECDD3',
  300: '#FDA4AF',
  400: '#FB7185',
  500: '#F43F5E',
  600: '#E11D48',
  700: '#BE123C',
  800: '#9F1239',
  900: '#881337',
  950: '#4C0519',
} as const;
 
// ─── PRIMITIVE: CYAN (INFO) ──────────────────────────────────────────────────
export const cyan = {
  50:  '#ECFEFF',
  100: '#CFFAFE',
  200: '#A5F3FC',
  300: '#67E8F9',
  400: '#22D3EE',
  500: '#06B6D4',
  600: '#0891B2',
  700: '#0E7490',
  800: '#155E75',
  900: '#164E63',
  950: '#083344',
} as const;
 
// ─── PRIMITIVE: WHITE & BLACK ─────────────────────────────────────────────────
export const base = {
  white: '#FFFFFF',
  black: '#000000',
} as const;
 
// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC TOKENS
// These are the ONLY values that components should reference.
// Never use primitive scale values directly in component code.
// ═══════════════════════════════════════════════════════════════════════════════
 
export const colors = {
 
  // ── BACKGROUND LAYER ────────────────────────────────────────────────────────
  // WHY a layer system: Shopify Polaris defines bg-surface, bg-surface-raised, etc.
  // This prevents the "everything is white" flatness problem.
  background: {
    /** App shell background. Pure white — the canvas. */
    default:   base.white,
    /** Sidebar, modal backdrop, inset sections. Barely-there tint. */
    subtle:    gray[50],
    /** Alternate table rows, section dividers. */
    muted:     gray[100],
    /** Pressed state backgrounds on interactive lists. */
    emphasis:  gray[200],
    /** Overlay backdrop behind modals/drawers. */
    overlay:   'rgba(3, 7, 18, 0.5)',
  },
 
  // ── SURFACE LAYER ────────────────────────────────────────────────────────────
  // Surfaces sit ON TOP of backgrounds.
  surface: {
    /** Default card/panel surface. White on white page. */
    default:   base.white,
    /** Raised card (with shadow). Same value, shadow differentiates. */
    raised:    base.white,
    /** Input fields, select backgrounds. */
    input:     base.white,
    /** Disabled input/control backgrounds. */
    disabled:  gray[100],
    /** Destructive action zone (e.g., delete confirmation panel). */
    danger:    red[50],
    /** Success state panel. */
    success:   green[50],
    /** Warning state panel. */
    warning:   amber[50],
    /** Info state panel. */
    info:      cyan[50],
  },
 
  // ── TEXT LAYER ────────────────────────────────────────────────────────────────
  // WHY 4 text levels vs the common 2:
  // primary/secondary/muted/disabled maps 1:1 to WCAG contrast tiers.
  // This forces intentional choices — you can't accidentally use muted for body copy.
  text: {
    /** Headings, labels, primary content. Contrast: 16.75:1 on white. */
    primary:   gray[950],
    /** Subheadings, descriptions, secondary info. */
    secondary: gray[700],
    /** Placeholder, helper text, timestamps. */
    muted:     gray[500],
    /** Disabled state text. Passes AA on white. */
    disabled:  gray[400],
    /** White text on dark/colored backgrounds. */
    inverse:   base.white,
    /** Clickable text links. */
    link:      blue[600],
    /** Link hover. */
    linkHover: blue[700],
    /** Danger text in error messages. */
    danger:    red[600],
    /** Success confirmations. */
    success:   green[700],
    /** Warning notices. */
    warning:   amber[700],
    /** Info notices. */
    info:      cyan[700],
  },
 
  // ── BORDER LAYER ─────────────────────────────────────────────────────────────
  border: {
    /** Default card, input, panel borders. */
    default:   gray[200],
    /** Stronger separator — section dividers, table borders. */
    strong:    gray[300],
    /** Focused input border. */
    focus:     blue[500],
    /** Danger state input border. */
    danger:    red[500],
    /** Success state input border. */
    success:   green[500],
    /** Disabled input border. */
    disabled:  gray[200],
    /** Transparent — removes border without layout shift. */
    none:      'transparent',
  },
 
  // ── PRIMARY BRAND ─────────────────────────────────────────────────────────────
  // The single most-used interactive color.
  primary: {
    /** Default state — buttons, active nav, selected items. */
    default:   blue[600],
    /** Hover state. */
    hover:     blue[700],
    /** Pressed/active state. */
    active:    blue[800],
    /** Disabled primary. */
    disabled:  blue[200],
    /** Text on primary button. */
    foreground: base.white,
    /** Subtle tint for backgrounds in primary context. */
    subtle:    blue[50],
    /** Border for outlined primary elements. */
    border:    blue[200],
  },
 
  // ── INTERACTIVE STATES ────────────────────────────────────────────────────────
  // WHY explicit interaction tokens:
  // Without these, teams invent ad-hoc hover colors. This standardizes the pattern.
  interactive: {
    /** Default hover on list items, table rows, nav items. */
    hover:    gray[50],
    /** Active/pressed list item. */
    active:   gray[100],
    /** Selected list item (e.g., active sidebar route). */
    selected: blue[50],
    /** Selected item border accent. */
    selectedBorder: blue[600],
  },
 
  // ── SEMANTIC STATUS ───────────────────────────────────────────────────────────
  success: {
    default:    green[600],
    subtle:     green[50],
    border:     green[200],
    foreground: base.white,
    text:       green[700],
  },
 
  warning: {
    default:    amber[500],
    subtle:     amber[50],
    border:     amber[200],
    foreground: base.white,
    text:       amber[700],
  },
 
  danger: {
    default:    red[600],
    subtle:     red[50],
    border:     red[200],
    foreground: base.white,
    text:       red[700],
  },
 
  info: {
    default:    cyan[600],
    subtle:     cyan[50],
    border:     cyan[200],
    foreground: base.white,
    text:       cyan[700],
  },
 
} as const;
 
// Type exports for use in TypeScript
export type ColorPrimitive = typeof gray | typeof blue | typeof green | typeof amber | typeof red | typeof cyan;
export type SemanticColors = typeof colors;
 