
/**
 * @file components/ui/button/Spinner.tsx
 * @description Sellora Button System — Loading Spinner
 *
 * WHY A SEPARATE SPINNER COMPONENT:
 * 1. Used in multiple places (buttons, table loading states, page loaders)
 * 2. Adapts to button variant (white spinner on solid, blue spinner on outline)
 * 3. Adapts to button size (proportionally sized icon)
 * 4. Can be used standalone: <Spinner size="md" />
 *
 * WHY SVG NOT CSS ANIMATION:
 * CSS animations (border-spinner) jank at low frame rates.
 * SVG stroke-dashoffset animation is GPU-accelerated and smoother.
 * Stripe, Linear, GitHub all use SVG-based spinners.
 *
 * WHY CUSTOM SVG NOT A LIBRARY:
 * No dependency added. Full control over appearance.
 * The spinner color matches the button variant automatically via currentColor.
 */
 
import React from 'react';
import { cn } from '@/lib/tokens/use-tokens';
import type { ButtonSize, ButtonVariant } from './button.types';
 
interface SpinnerProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}
 
// Icon size per button size — matches [&_svg]:size-* in CVA
const SPINNER_SIZE: Record<ButtonSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 16,
  xl: 20,
};
 
/**
 * Spinner color strategy:
 *
 * SOLID variants (primary, danger, success, warning, info):
 *   Spinner is WHITE — button text is white, spinner should match.
 *
 * TRANSPARENT variants (outline, ghost, secondary, link, danger-outline):
 *   Spinner uses currentColor — inherits the text color of the button.
 *
 * WHY currentColor for transparent:
 *   We don't know the text color statically (it depends on the variant token).
 *   currentColor inherits whatever color CSS is currently applied.
 *   Result: ghost button (gray text) → gray spinner. Outline (dark text) → dark spinner.
 */
const SOLID_VARIANTS: ButtonVariant[] = ['primary', 'danger', 'success', 'warning', 'info'];
 
export function Spinner({ size = 'md', variant = 'primary', className }: SpinnerProps) {
  const px = SPINNER_SIZE[size];
  const isSolid = SOLID_VARIANTS.includes(variant);
  const color = isSolid ? '#FFFFFF' : 'currentColor';
 
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin shrink-0', className)}
      aria-hidden="true"
      role="presentation"
    >
      {/*
        ANATOMY:
        - Background circle track (20% opacity) — shows the full circle path
        - Foreground arc (the moving part) — 270° arc, rotated by CSS animation
        The strokeLinecap="round" ends make it look polished (not a harsh cut).
      */}
      {/* Track */}
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke={color}
        strokeWidth="1.75"
        strokeOpacity="0.25"
      />
      {/* Arc */}
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
 