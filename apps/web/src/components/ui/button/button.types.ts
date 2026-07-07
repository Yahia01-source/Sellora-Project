/**
 * @file components/ui/button/button.types.ts
 * @description Sellora Button System — TypeScript Prop Interfaces
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY A SEPARATE TYPES FILE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Separating types from implementation:
 * 1. Types can be imported without importing React components (tree-shaking)
 * 2. Other components (SplitButton, DropdownButton) can reuse base types
 * 3. API documentation can be generated from types only
 * 4. Keeps the component file focused on implementation
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PROP DESIGN PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Every prop must answer YES to: "Would I use this in a real enterprise product?"
 * Exotic props add cognitive overhead. Missing props force className hacks.
 *
 * We follow the Radix/shadcn pattern:
 * - Semantic props (variant, size, loading) for design system usage
 * - Escape hatches (className, style) for edge cases
 * - asChild for polymorphism (render as <a>, <Link>, etc.)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariantProps } from './button.variants';
 
// ─── BUTTON VARIANT TYPES ─────────────────────────────────────────────────────
 
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'danger'
  | 'danger-outline'
  | 'success'
  | 'warning'
  | 'info';
 
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
 
// ─── LOADING STATE ────────────────────────────────────────────────────────────
 
export type LoadingPlacement = 'left' | 'right' | 'replace';
/**
 * LoadingPlacement:
 * - 'left':    Spinner appears on the left, text remains visible
 * - 'right':   Spinner appears on the right, text remains visible
 * - 'replace': Text is hidden, only spinner shows (preserves button width)
 *
 * WHY 'replace' mode:
 * The button width must NOT change when loading starts.
 * If the button text disappears and only a small spinner shows,
 * the button shrinks and causes layout shift (CLS).
 * 'replace' hides text with visibility:hidden (maintains space) + shows spinner.
 */
 
// ─── CORE BUTTON PROPS ────────────────────────────────────────────────────────
 
export interface ButtonBaseProps extends ButtonVariantProps {
  /**
   * The visual treatment of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
 
  /**
   * Physical size of the button.
   * Controls height, padding, font-size, and icon size.
   * @default 'md'
   */
  size?: ButtonSize;
 
  /**
   * Makes the button take the full width of its parent container.
   * @default false
   */
  fullWidth?: boolean;
 
  /**
   * Icon renders on the LEFT of the label.
   * Must be a React element (typically an SVG icon component).
   *
   * WHY ReactNode vs string:
   * Icon libraries (Lucide, Heroicons) export React components.
   * String would require a lookup table or render as text.
   */
  leftIcon?: ReactNode;
 
  /**
   * Icon renders on the RIGHT of the label.
   * Use for: external link arrows, expand/collapse chevrons, download arrows.
   */
  rightIcon?: ReactNode;
 
  /**
   * When true, renders ONLY the icon (no visible label text).
   * When iconOnly=true, an aria-label MUST be provided.
   *
   * The children prop still accepts content but it's visually hidden
   * (screen readers still read it via aria-label).
   *
   * SIZING: Icon-only buttons are square (equal width and height).
   */
  iconOnly?: boolean;
 
  /**
   * Shows a loading spinner and disables interaction.
   * The button remains visually in place (no layout shift).
   * @default false
   */
  loading?: boolean;
 
  /**
   * Text shown to screen readers while loading.
   * @default 'Loading...'
   */
  loadingText?: string;
 
  /**
   * Where to show the spinner when loading=true.
   * @default 'replace'
   */
  loadingPlacement?: LoadingPlacement;
 
  /**
   * Custom loading spinner to replace the default.
   * If not provided, the built-in SVG spinner is used.
   */
  spinner?: ReactNode;
 
  /**
   * Additional CSS classes. Merged with CVA output via tailwind-merge.
   * Allows overriding specific styles without replacing everything.
   *
   * WHY tailwind-merge: Without it, conflicting Tailwind classes produce
   * unpredictable results. tailwind-merge resolves conflicts correctly:
   * 'bg-blue-600 bg-red-600' → 'bg-red-600' (last wins, properly)
   */
  className?: string;
 
  /**
   * When true, the Button component renders its child element
   * instead of a <button> tag, merging all button props onto it.
   *
   * Use cases:
   * - <Button asChild><Link href="/orders">View Orders</Link></Button>
   * - <Button asChild><a href="https://...">External Link</a></Button>
   *
   * WHY asChild vs `as` prop:
   * The `as` prop approach requires TypeScript gymnastics and loses
   * type safety for the target element. Radix's asChild pattern via
   * the Slot primitive is simpler and fully type-safe.
   *
   * Powered by @radix-ui/react-slot.
   */
  asChild?: boolean;
 
  /**
   * Disables the button. Overrides loading state if both are true.
   * Applies pointer-events-none and opacity-40 via CSS.
   */
  disabled?: boolean;
 
  /**
   * Whether the button is in a "selected" state.
   * Used for toggle buttons, button groups with active selection.
   * Applies a visual indicator (ring/border) without changing variant.
   */
  selected?: boolean;
 
  /**
   * Tooltip text shown on hover (desktop) / long-press (mobile).
   * Requires the button to be wrapped in a Tooltip provider.
   * When iconOnly=true, this doubles as the accessible label display.
   */
  tooltip?: string;
 
  /**
   * Button content. For standard buttons: a text string.
   * For icon-only buttons: visually hidden but accessible via aria-label.
   */
  children?: ReactNode;
}
 
/**
 * Complete Button props — extends HTML button attributes.
 *
 * WHY OMIT type:
 * We re-define 'type' with a stricter type (only valid button types).
 * HTMLButtonElement's type is just 'string'.
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>,
    ButtonBaseProps {
  /**
   * HTML button type attribute.
   * @default 'button'
   *
   * WHY DEFAULT 'button' NOT 'submit':
   * Inside a <form>, the default HTML button type is 'submit'.
   * This causes accidental form submissions when clicking action buttons
   * that happen to be inside a form element.
   * We always default to 'button' — explicit 'submit' when needed.
   */
  type?: 'button' | 'submit' | 'reset';
 
  /**
   * Disabled state. Separated from HTML attribute for clarity.
   * In the implementation, this sets both the HTML disabled attribute
   * AND aria-disabled for full accessibility coverage.
   */
  disabled?: boolean;
}
 
// ─── SPLIT BUTTON TYPES ───────────────────────────────────────────────────────
 
export interface SplitButtonAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
}
 
export interface SplitButtonProps extends Omit<ButtonProps, 'rightIcon'> {
  /**
   * Actions shown in the dropdown part of the split button.
   * The first action in the array is the primary action (left button).
   */
  actions: SplitButtonAction[];
  /**
   * Whether the dropdown is currently open.
   */
  dropdownOpen?: boolean;
  /**
   * Callback when dropdown toggle is clicked.
   */
  onDropdownToggle?: () => void;
}
 
// ─── FLOATING ACTION BUTTON TYPES ────────────────────────────────────────────
 
export interface FABProps extends ButtonProps {
  /**
   * Position of the FAB relative to the viewport.
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * Offset from edges in pixels.
   * @default { bottom: 24, right: 24 }
   */
  offset?: { top?: number; right?: number; bottom?: number; left?: number };
  /**
   * Extended FAB shows icon + text.
   * Compact FAB shows icon only.
   * @default false (compact)
   */
  extended?: boolean;
  /**
   * Label shown when extended=true.
   */
  label?: string;
}
 
// ─── ASYNC BUTTON TYPES ───────────────────────────────────────────────────────
 
export type AsyncButtonState = 'idle' | 'loading' | 'success' | 'error';
 
export interface AsyncButtonProps extends Omit<ButtonProps, 'onClick' | 'loading'> {
  /**
   * Async handler. Button shows loading during execution,
   * then success or error state based on outcome.
   */
  onClick: () => Promise<void>;
  /**
   * Duration to show success state before returning to idle (ms).
   * @default 2000
   */
  successDuration?: number;
  /**
   * Duration to show error state before returning to idle (ms).
   * @default 3000
   */
  errorDuration?: number;
  /**
   * Text shown during success state.
   */
  successText?: string;
  /**
   * Text shown during error state.
   */
  errorText?: string;
}
 