
/**
 * @file lib/tokens/use-tokens.ts
 * @description Sellora Design Token System — React utilities
 *
 * PURPOSE:
 * When CSS classes aren't enough (inline styles, canvas rendering, chart colors,
 * dynamic style calculations), components need to access token values in JS.
 *
 * This file provides:
 * 1. A typed token accessor hook
 * 2. CSS variable reader (runtime token resolution)
 * 3. cn() — the standard Tailwind class merger (clsx + tailwind-merge)
 */
 
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { tokens } from '@/tokens';
 
// ─── cn() — Standard class name merger ───────────────────────────────────────
/**
 * cn() merges Tailwind classes correctly, resolving conflicts.
 * Without tailwind-merge, `cn('p-4', 'p-6')` would produce "p-4 p-6" (broken).
 * With it, it produces "p-6" (correct — later class wins).
 *
 * This is the ONLY way to merge conditional Tailwind classes in Sellora.
 * Do not use template literals for conditional classes.
 *
 * Usage:
 *   cn('text-sm', isActive && 'text-blue-600', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
 
// ─── CSS Variable Reader ──────────────────────────────────────────────────────
/**
 * getCSSVar — Reads a CSS custom property value at runtime.
 *
 * Use when you need a token value in JavaScript (e.g., passing a color
 * to a chart library, canvas context, or dynamic style calculation).
 *
 * Usage:
 *   const primaryColor = getCSSVar('--color-primary-default');
 *   // Returns: "#2563EB"
 *
 * WHY runtime reading (not importing from tokens.ts):
 * The TypeScript token values are static. CSS variables can be overridden
 * by the cascade (e.g., a component-level theme override). Reading from
 * CSS gives you the actually-applied value, not just the default.
 */
export function getCSSVar(property: string, element?: Element): string {
  const target = element ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(property).trim();
}
 
// ─── Typed Token Accessor ─────────────────────────────────────────────────────
/**
 * useTokens — Returns the full token object with TypeScript completion.
 *
 * Use in:
 * - Recharts color props: fill={useTokens().colors.primary.default}
 * - Motion values: duration={parseInt(useTokens().motion.duration.fast)}
 * - Dynamic inline styles where CSS classes aren't available
 *
 * This is NOT a React hook (no useEffect/useState). It's named "use" by
 * convention since it's consumed in components. No rules of hooks apply.
 */
export function useTokens() {
  return tokens;
}
 
// ─── Chart Color Palette ──────────────────────────────────────────────────────
/**
 * CHART_COLORS — Ordered color list for data visualizations.
 *
 * WHY a separate list:
 * Charts need ordered colors for multiple data series.
 * The semantic tokens (primary, success, etc.) don't define order.
 * This list is purpose-built for sequential series coloring.
 *
 * Rule: Colors must be distinguishable by colorblind users.
 * We avoid red/green pairs as the first two colors.
 */
export const CHART_COLORS = [
  '#2563EB', // blue-600     — Series 1
  '#0891B2', // cyan-600     — Series 2
  '#16A34A', // green-600    — Series 3
  '#D97706', // amber-600    — Series 4
  '#9333EA', // purple-600   — Series 5
  '#DB2777', // pink-600     — Series 6
  '#EA580C', // orange-600   — Series 7
  '#0D9488', // teal-600     — Series 8
] as const;
 
/**
 * STATUS_COLORS — Semantic status to color mapping for charts and indicators.
 * Consistent with the design token system.
 */
export const STATUS_COLORS = {
  success:  '#16A34A',
  warning:  '#D97706',
  danger:   '#E11D48',
  info:     '#0891B2',
  neutral:  '#6B7280',
  pending:  '#9333EA',
} as const;
 
export type StatusColor = keyof typeof STATUS_COLORS;
 