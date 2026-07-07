
/**
 * @file tokens/visual/radius.ts
 * @description Sellora Visual Foundation — Border Radius System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * RADIUS PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Sellora's corner radius system defines the platform's personality.
 * Radius is NOT decorative — it communicates:
 *
 *   SHARP (0-2px):   "This is structural, functional, serious."
 *   MEDIUM (4-8px):  "This is a professional tool. Precise. Reliable."
 *   ROUND (12-16px): "This is approachable. Floating. Elevated."
 *   FULL (9999px):   "This is a tag, badge, chip, or indicator."
 *
 * DESIGN DECISION — WHY 6px AS THE DEFAULT:
 *
 * Shopify Polaris: 4px cards, 8px buttons
 * Stripe Dashboard: 6px cards, 4px inputs
 * Linear: 8px everywhere
 * Vercel: 8px cards, 6px inputs
 * Notion: 4px
 *
 * Sellora targets the Stripe aesthetic — precise and professional.
 * 6px (radius-md) is the primary radius. It signals "enterprise software"
 * without feeling boxy (4px) or consumer-app casual (12px+).
 *
 * RADIUS CONSTRAINT RULE:
 * Inner radius = outer radius - padding
 * Example: Card (radius-md = 6px) + 24px padding → inner elements use radius-sm (4px)
 * This prevents the "too much rounding inside a rounded container" problem.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
export const radius = {
 
  /**
   * NONE — 0px
   *
   * Use for:
   * - Horizontal rule dividers (hr)
   * - Full-width progress bars (spanning card edge to edge)
   * - Table rows (the row has no radius — the card containing it has radius)
   * - Skeleton loaders that are rectangular by design
   * - Code blocks in full-bleed contexts
   *
   * WHY NOT to default here: Zero radius is a deliberate statement.
   * Use it intentionally, not by forgetting to add a radius.
   */
  none: '0px',
 
  /**
   * XS — 2px
   *
   * Use for:
   * - Inline code snippets (within text)
   * - Keyboard shortcut badges (⌘K, Ctrl+S)
   * - Status dot indicators (active, offline, away)
   * - The inner track of a progress bar
   * - Tooltip arrows
   * - Very small decorative elements
   *
   * WHY 2px: Just enough to remove the harsh corner without making it look
   * like a "pill" or "badge". Signals "small, precise, technical".
   */
  xs: '0.125rem',   // 2px
 
  /**
   * SM — 4px
   *
   * Use for:
   * - Input fields (text inputs, selects, textareas)
   * - Small buttons (compact/ghost variants)
   * - Table cell focus rings
   * - Tags and chips (when not using full pill shape)
   * - Dropdown container
   * - Select options on hover
   * - Checkboxes (4px matches most OS native checkbox radius)
   * - Switch/toggle inner thumb
   *
   * WHY 4px: The most common radius in professional desktop software.
   * Stripe uses 4px for all inputs. It's precise without being sharp.
   * Inner elements inside radius-md containers use radius-sm (constraint rule).
   */
  sm: '0.25rem',    // 4px
 
  /**
   * MD — 6px ← THE SELLORA DEFAULT
   *
   * Use for:
   * - Cards (the primary surface in Sellora)
   * - Panels and sections
   * - Default buttons (primary, secondary, outline)
   * - Context menus
   * - Alert/callout boxes
   * - Banner notifications
   * - Side drawer containers
   * - Hover backgrounds on list items
   *
   * WHY 6px: The Sellora signature. Not as sharp as Notion (4px) but not
   * as casual as Linear (8px). Perfectly balanced for enterprise SaaS.
   * When in doubt, this is the radius to use.
   */
  md: '0.375rem',   // 6px ← DEFAULT
 
  /**
   * LG — 8px
   *
   * Use for:
   * - Modal dialogs (elevated surfaces feel more rounded)
   * - Drawer panels (side panels that "float" over the UI)
   * - Command palette container
   * - Large notification cards
   * - Feature highlight panels
   * - Tooltips (larger, content-rich tooltips)
   *
   * WHY 8px: Elevated/floating surfaces get more rounding.
   * Elevation and radius are correlated — higher up = softer corners.
   * This makes "floating" elements feel genuinely elevated.
   */
  lg: '0.5rem',     // 8px
 
  /**
   * XL — 12px
   *
   * Use for:
   * - Large modal dialogs (confirm, alert dialogs)
   * - Onboarding cards (full-screen step cards)
   * - Empty state illustration containers
   * - Feature tour overlay cards
   * - "Floating" section cards with strong elevation
   *
   * WHY 12px: Used sparingly for maximum perceived elevation.
   * A 12px radius on a white card with a large shadow communicates
   * "this is very elevated, very important".
   */
  xl: '0.75rem',    // 12px
 
  /**
   * 2XL — 16px
   *
   * Use for:
   * - Welcome/splash screens within the app
   * - Pricing plan cards in upgrade modals
   * - Large feature preview cards
   * - Image thumbnails and media cards
   * - Avatar containers in profile pages
   *
   * WHY 16px: At this level, radius is making a strong design statement.
   * Use only for high-level marketing-style moments within the product.
   */
  '2xl': '1rem',    // 16px
 
  /**
   * 3XL — 24px
   *
   * Use for:
   * - Hero illustration containers
   * - Large image/media display areas
   * - Premium plan highlight cards
   * - Decorative container elements
   *
   * WHY 24px: Maximum practical radius before approaching "pill".
   * At this point, you're making a deliberate visual statement.
   * Rarely needed in operational dashboard contexts.
   */
  '3xl': '1.5rem',  // 24px
 
  /**
   * FULL — 9999px (pill)
   *
   * Use for:
   * - Status badges ("Active", "Pending", "Delivered")
   * - Count badges on nav items (notification dots)
   * - Toggle switches (the track)
   * - Avatar images (circular)
   * - Search input (when pill-shaped design is used)
   * - Tag/label chips
   * - "New" feature markers
   *
   * NEVER use for:
   * - Cards, panels, or containers with significant content
   * - Buttons (use radius-md for buttons — pill buttons look consumer/mobile)
   * - Tables or data containers
   *
   * WHY 9999px: Using 50% would create oval shapes on rectangular elements.
   * 9999px ensures a perfect pill regardless of element dimensions.
   */
  full: '9999px',
 
} as const;
 
// ─── RADIUS CONSTRAINT HELPERS ────────────────────────────────────────────────
 
/**
 * getInnerRadius(outerRadius, padding)
 *
 * Calculates the correct inner element radius based on outer container radius
 * and the padding between them.
 *
 * FORMULA: innerRadius = max(0, outerRadius - padding)
 *
 * This prevents the "outer is rounded, inner square corner pokes out" bug.
 *
 * Usage:
 *   // Card has 6px radius, 24px padding
 *   // Inner button should have max(0, 6 - 24) = 0px... that can't be right
 *   // Actually this formula is for SAME-LEVEL nesting:
 *   // Container: 6px, inline nested element: 4px (one step smaller)
 *
 * In practice, use the "one step down" rule:
 *   Container (md=6px) → inner elements use sm (4px)
 *   Container (lg=8px) → inner elements use md (6px)
 */
export function getInnerRadius(outerKey: keyof typeof radius): keyof typeof radius {
  const downgrade: Record<keyof typeof radius, keyof typeof radius> = {
    none: 'none',
    xs:   'none',
    sm:   'xs',
    md:   'sm',
    lg:   'md',
    xl:   'lg',
    '2xl': 'xl',
    '3xl': '2xl',
    full: 'full',
  };
  return downgrade[outerKey];
}
 
export type RadiusKey = keyof typeof radius;
export type Radius = typeof radius;
 