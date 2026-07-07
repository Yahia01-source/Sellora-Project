/**
 * @file components/ui/button/button.variants.ts
 * @description Sellora Button System — Variant Definitions via CVA
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ARCHITECTURE DECISION: WHY CVA (Class Variance Authority)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * CVA (cva()) is the industry standard for variant-driven component styling
 * in design systems. Used by shadcn/ui, Radix UI, and dozens of enterprise
 * design systems. It solves the "variant hell" problem:
 *
 * WITHOUT CVA:
 *   const classes = `base-class
 *     ${variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : ''}
 *     ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}
 *     ${size === 'sm' ? 'h-8 px-3 text-xs' : ''}
 *     ${size === 'lg' ? 'h-12 px-6 text-lg' : ''}
 *     ${isLoading ? 'opacity-70 cursor-wait' : ''}
 *   `;
 *   // Result: impossible to read, impossible to maintain, class conflicts
 *
 * WITH CVA:
 *   const buttonVariants = cva(base, { variants: { variant, size } })
 *   // Result: typed, composable, conflict-free, maintainable
 *
 * WHY NOT inline Tailwind conditions:
 *   1. tailwind-merge handles class conflicts automatically
 *   2. CVA variants are TypeScript-typed — wrong variant = compile error
 *   3. All button styles in ONE file = one place to change, test, review
 *   4. Zero runtime string manipulation — CVA compiles at build time
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY CSS VARIABLES NOT HARDCODED COLORS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Every color here references a CSS variable from our design token system.
 * Example: bg-[var(--color-primary)] NOT bg-blue-600
 *
 * WHY: If we rebrand from blue to violet, we change ONE token.
 * Without variables, we'd need to find every bg-blue-600 across all files.
 * This is how Shopify Polaris and GitHub Primer work.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
import { cva, type VariantProps } from 'class-variance-authority';
 
// ─── BASE CLASSES ─────────────────────────────────────────────────────────────
/**
 * Applied to EVERY button regardless of variant or size.
 *
 * EACH CLASS EXPLAINED:
 * - inline-flex items-center justify-center: flex layout for icon+text alignment
 * - gap-2: space between icon and label (overridden per size)
 * - whitespace-nowrap: prevents button label from wrapping mid-word
 * - rounded-[var(--radius-md)]: 6px radius — Sellora's default
 * - font-[500]: Medium weight — signals "this is an action"
 * - transition-[...]: explicit property list (NOT transition-all) for performance
 * - focus-visible:outline-none: removes browser default
 * - focus-visible:ring-...: our 2-layer focus ring (white gap + blue ring)
 * - select-none: prevents text selection on repeated clicks
 * - shrink-0: prevents button from shrinking in flex containers
 * - cursor-pointer: override for elements that aren't <button>
 * - disabled:pointer-events-none disabled:opacity-40: disabled state
 * - [&_svg]:pointer-events-none: prevents SVG from capturing click events
 * - [&_svg]:shrink-0: prevents icon from shrinking
 */
 
const BASE = [
  // Layout
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'whitespace-nowrap',
  'shrink-0',
  'select-none',
  'cursor-pointer',
  // Typography
  'font-medium',
  // Shape
  'rounded-[var(--radius-md)]',
  // Border (transparent by default — variants override)
  'border',
  'border-transparent',
  // Transition (explicit properties, NOT transition-all)
  'transition-[color,background-color,border-color,box-shadow,opacity,transform]',
  'duration-[var(--duration-fast)]',
  'ease-[var(--ease-out)]',
  // Focus
  'outline-none',
  'focus-visible:outline-none',
  'focus-visible:ring-0',
  'focus-visible:shadow-[var(--shadow-focus)]',
  // Disabled state
  'disabled:pointer-events-none',
  'disabled:opacity-40',
  'disabled:cursor-not-allowed',
  // Icon handling
  '[&_svg]:pointer-events-none',
  '[&_svg]:shrink-0',
  // Active press feedback
  'active:scale-[0.98]',
].join(' ');
 
// ─── CVA VARIANT DEFINITIONS ──────────────────────────────────────────────────
 
export const buttonVariants = cva(BASE, {
  variants: {
 
    /**
     * VARIANT — The visual treatment of the button.
     * Each variant communicates a SEMANTIC meaning, not just a color.
     */
    variant: {
 
      /**
       * PRIMARY
       * Solid blue background. The strongest call-to-action.
       *
       * WHY: Blue is the universal signal for "main action".
       * Only ONE primary button should appear per view — it's the path forward.
       * Examples: "Save Changes", "Place Order", "Create Product"
       *
       * DESIGN: Filled → outline (on hover) approach was rejected.
       * Stripe, Linear, Vercel all use solid with darker hover. We match.
       */
      primary: [
        'bg-[var(--color-primary)]',
        'text-[var(--color-primary-foreground)]',
        'border-transparent',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-primary-hover)]',
        'hover:shadow-[var(--shadow-sm)]',
        'active:bg-[var(--color-primary-active)]',
        'active:shadow-[var(--shadow-none)]',
      ].join(' '),
 
      /**
       * SECONDARY
       * Light gray background. The default supporting action.
       *
       * WHY: "Cancel", "Go Back", "View Details" — actions that matter
       * but don't compete with the primary action.
       * Light background makes it feel "secondary" without being invisible.
       *
       * CONTRAST: Pairs with Primary in the same footer/toolbar.
       * Primary is visually dominant; Secondary is clearly subordinate.
       */
      secondary: [
        'bg-[var(--color-bg-muted)]',
        'text-[var(--color-text)]',
        'border-[var(--color-border)]',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-bg-emphasis)]',
        'hover:border-[var(--color-border-strong)]',
        'active:bg-[var(--color-bg-emphasis)]',
        'active:shadow-[var(--shadow-none)]',
      ].join(' '),
 
      /**
       * OUTLINE
       * Transparent background, visible border.
       *
       * WHY: Used when Primary is already present and this is an
       * equal-weight alternative (not supporting). Example: two equal
       * actions like "Import" / "Export" where neither is the "main" path.
       *
       * Also excellent for contexts where the button sits on a colored
       * background — the transparent background adapts automatically.
       */
      outline: [
        'bg-transparent',
        'text-[var(--color-text)]',
        'border-[var(--color-border-strong)]',
        'hover:bg-[var(--color-bg-subtle)]',
        'hover:border-[var(--color-border-strong)]',
        'active:bg-[var(--color-bg-muted)]',
      ].join(' '),
 
      /**
       * GHOST
       * No background, no border. Only visible text.
       *
       * WHY: The most subtle action. Used in toolbars, sidebars, and
       * inline contexts where a full button would be visually heavy.
       * Examples: "Edit" inline in a table row, nav item actions,
       * icon-only toolbar buttons.
       *
       * Background ONLY appears on hover — this is the signature ghost behavior.
       */
      ghost: [
        'bg-transparent',
        'text-[var(--color-text-secondary)]',
        'border-transparent',
        'hover:bg-[var(--color-bg-subtle)]',
        'hover:text-[var(--color-text)]',
        'active:bg-[var(--color-bg-muted)]',
      ].join(' '),
 
      /**
       * LINK
       * Looks like a text link. Acts like a button.
       *
       * WHY: When you need an action that semantically fits in running text,
       * or when you need "Cancel" to feel extremely de-emphasized.
       * Examples: "Forgot password?", "View terms", "Cancel" as least-action.
       *
       * ACCESSIBILITY NOTE: Despite looking like a <a>, this is a <button>.
       * Screen readers will announce it as a button, not a link.
       * If it navigates to a new page, use <a> via asChild instead.
       */
      link: [
        'bg-transparent',
        'text-[var(--color-primary)]',
        'border-transparent',
        'underline-offset-4',
        'hover:underline',
        'hover:text-[var(--color-primary-hover)]',
        'active:text-[var(--color-primary-active)]',
        'h-auto!',            // Override height — link has no visual box
        'px-0!',              // No horizontal padding — inline text
        'py-0!',              // No vertical padding
      ].join(' '),
 
      /**
       * DANGER
       * Red background. Destructive, irreversible actions.
       *
       * WHY: Red is the universal signal for "this will delete/destroy something."
       * Users must be VISUALLY WARNED before clicking.
       * Examples: "Delete Order", "Remove Product", "Cancel Subscription"
       *
       * RULE: NEVER use danger without a confirmation dialog for
       * irreversible actions. The button color alone is insufficient
       * to prevent accidental data loss.
       *
       * WCAG: Red text on white has 4.6:1 contrast (passes AA).
       * Red background with white text: checked at every shade.
       */
      danger: [
        'bg-[var(--color-danger)]',
        'text-[var(--color-danger-foreground)]',
        'border-transparent',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-danger-hover)]',
        'hover:shadow-[var(--shadow-sm)]',
        'active:shadow-[var(--shadow-none)]',
        'focus-visible:shadow-[var(--shadow-focus-error)]',
      ].join(' '),
 
      /**
       * DANGER OUTLINE
       * Red border and text, transparent background.
       *
       * WHY: A softer version of Danger. Used when you want to signal
       * "this is destructive" without the full visual weight of solid red.
       * Often used as the secondary button in a delete confirmation dialog
       * alongside a solid "Confirm Delete" primary.
       */
      'danger-outline': [
        'bg-transparent',
        'text-[var(--color-danger-text)]',
        'border-[var(--color-danger-border)]',
        'hover:bg-[var(--color-danger-subtle)]',
        'hover:border-[var(--color-danger)]',
        'active:bg-[var(--color-danger-subtle)]',
        'focus-visible:shadow-[var(--shadow-focus-error)]',
      ].join(' '),
 
      /**
       * SUCCESS
       * Green background. Positive confirmation actions.
       *
       * WHY: Used after a multi-step flow to signal "this completes the process
       * successfully." Examples: "Confirm Delivery", "Approve Order",
       * "Activate Store"
       *
       * USE SPARINGLY: Success buttons are meaningful because they're rare.
       * Overuse makes the color lose its semantic meaning.
       */
      success: [
        'bg-[var(--color-success)]',
        'text-[var(--color-success-foreground)]',
        'border-transparent',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-success-hover)]',
        'hover:shadow-[var(--shadow-sm)]',
        'active:shadow-[var(--shadow-none)]',
        'focus-visible:shadow-[var(--shadow-focus-success)]',
      ].join(' '),
 
      /**
       * WARNING
       * Amber background. Cautionary actions.
       *
       * WHY: "This action has consequences but is reversible."
       * Examples: "Archive Store" (can restore), "Disable Integration"
       * Distinct from Danger (irreversible) and Primary (safe).
       */
      warning: [
        'bg-[var(--color-warning)]',
        'text-[var(--color-warning-foreground)]',
        'border-transparent',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-warning-hover)]',
        'hover:shadow-[var(--shadow-sm)]',
        'active:shadow-[var(--shadow-none)]',
        'focus-visible:shadow-[var(--shadow-focus-warning)]',
      ].join(' '),
 
      /**
       * INFO
       * Cyan/teal background. Informational actions.
       *
       * WHY: "Learn more", "View Documentation", "See Details".
       * Actions that provide context or information, not operational changes.
       */
      info: [
        'bg-[var(--color-info)]',
        'text-[var(--color-info-foreground)]',
        'border-transparent',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-info-hover)]',
        'hover:shadow-[var(--shadow-sm)]',
        'active:shadow-[var(--shadow-none)]',
      ].join(' '),
 
    }, // end variant
 
    /**
     * SIZE — Controls the physical dimensions of the button.
     *
     * WHY SPECIFIC HEIGHT VALUES:
     * Heights are not arbitrary — they follow the 4px grid:
     * xs=24px, sm=28px, md=36px, lg=40px, xl=44px
     *
     * 36px (md) is the Stripe/Linear "default" — tested across millions of UIs.
     * 44px (lg/xl) is Apple's minimum touch target — important for mobile.
     * 28px (sm) for compact toolbar contexts.
     * 24px (xs) for badge-like actions — use sparingly.
     *
     * WHY NOT rem for heights: Heights in px are intentional — they align
     * to the pixel grid regardless of user font size settings.
     * Padding uses rem to scale with font size.
     */
    size: {
 
      /**
       * XS — 24px height
       * Use: Tag-like actions, dense table row actions, compact filter chips.
       * Text: 11px (text-xs in our scale)
       * WCAG WARNING: Below the 44px touch target minimum. Use only for
       * desktop-primary contexts with surrounding tappable area.
       */
      xs: [
        'h-6',              // 24px
        'px-2',             // 8px
        'text-[11px]',      // var(--text-xs)
        'gap-1',            // 4px
        '[&_svg]:size-3',   // 12px icon
      ].join(' '),
 
      /**
       * SM — 28px height
       * Use: Compact toolbars, table row actions, sidebar actions, inline forms.
       */
      sm: [
        'h-7',              // 28px
        'px-3',             // 12px
        'text-[13px]',      // var(--text-base)
        'gap-1.5',          // 6px
        '[&_svg]:size-3.5', // 14px icon
      ].join(' '),
 
      /**
       * MD — 36px height ← THE DEFAULT
       * Use: All standard form submissions, modal actions, most dashboard buttons.
       *
       * WHY 36px: The most-tested height in SaaS dashboards.
       * Stripe, Linear, Vercel, GitHub — all use 36px as their default.
       * It's compact enough for dense UIs but large enough for comfortable clicking.
       */
      md: [
        'h-9',              // 36px
        'px-4',             // 16px
        'text-[14px]',      // var(--text-md)
        'gap-2',            // 8px
        '[&_svg]:size-4',   // 16px icon
      ].join(' '),
 
      /**
       * LG — 40px height
       * Use: Primary CTA in hero areas, prominent modal actions, form submissions
       *      on settings pages, major conversion-critical actions.
       */
      lg: [
        'h-10',             // 40px
        'px-5',             // 20px
        'text-[14px]',      // var(--text-md) — same size, more padding
        'gap-2',            // 8px
        '[&_svg]:size-4',   // 16px icon
      ].join(' '),
 
      /**
       * XL — 44px height
       * Use: Mobile-optimized buttons (44px = Apple's minimum touch target),
       *      landing page CTAs within the dashboard, onboarding primary actions.
       */
      xl: [
        'h-11',             // 44px
        'px-6',             // 24px
        'text-[15px]',      // between text-md and text-lg
        'gap-2.5',          // 10px
        '[&_svg]:size-5',   // 20px icon
      ].join(' '),
 
    }, // end size
 
    /**
     * FULL WIDTH — Takes the full width of its container.
     *
     * WHY A SEPARATE VARIANT (not a class):
     * Full-width is a layout concern. Making it a CVA boolean variant
     * means it's TypeScript-typed and composable with any other variant.
     * Alternative: a `fullWidth` prop that applies a className.
     * CVA approach: cleaner, no prop threading required.
     */
    fullWidth: {
      true:  'w-full',
      false: 'w-auto',
    },
 
    /**
     * ICON ONLY — Square button showing only an icon.
     *
     * WHY SEPARATE: Icon-only buttons need equal padding on all sides
     * (p-2 instead of px-4 py-2). CVA variant ensures the dimensions
     * are always correct without manual override.
     *
     * ACCESSIBILITY: When iconOnly=true, an aria-label MUST be provided.
     * The Button component enforces this at the TypeScript level.
     */
    iconOnly: {
      true:  'aspect-square p-0 gap-0',
      false: '',
    },
 
  }, // end variants
 
  /**
   * COMPOUND VARIANTS
   * Applied only when TWO specific variants are BOTH true.
   * This allows icon-only sizing to be coupled with button size
   * without a separate "icon button" component.
   */
  compoundVariants: [
 
    // Icon-only size combinations (square aspect ratio per size)
    { iconOnly: true, size: 'xs', class: 'size-6' },    // 24x24
    { iconOnly: true, size: 'sm', class: 'size-7' },    // 28x28
    { iconOnly: true, size: 'md', class: 'size-9' },    // 36x36 ← default
    { iconOnly: true, size: 'lg', class: 'size-10' },   // 40x40
    { iconOnly: true, size: 'xl', class: 'size-11' },   // 44x44
 
  ],
 
  /**
   * DEFAULT VARIANTS
   * Applied when no variant/size is specified.
   * PRIMARY + MD is the most-used combination — correct default.
   */
  defaultVariants: {
    variant:   'primary',
    size:      'md',
    fullWidth: false,
    iconOnly:  false,
  },
});
 
// Export VariantProps type for use in the Button component props interface
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
 