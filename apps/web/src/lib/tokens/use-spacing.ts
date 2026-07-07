
/**
 * @file lib/spacing/use-spacing.ts
 * @description Sellora Spacing System — TypeScript Utilities
 *
 * Provides type-safe access to spacing tokens in JavaScript/TypeScript contexts
 * where CSS classes are insufficient (e.g., Recharts margins, inline styles,
 * dynamic calculations).
 */
 
import { space, spaceAliases, spacingContexts } from '@/tokens/spacing';
import type { SpaceKey } from '@/tokens/spacing';
 
// ─── SPACE VALUE GETTER ───────────────────────────────────────────────────────
 
/**
 * px(key) — Returns the rem string value for a spacing key.
 *
 * Usage:
 *   px(16)  → "1rem"
 *   px(24)  → "1.5rem"
 *
 * Use in inline styles or chart margin props.
 */
export function px(key: SpaceKey): string {
  return space[key];
}
 
/**
 * pxNum(key) — Returns the pixel number value for a spacing key.
 *
 * Usage:
 *   pxNum(16) → 16
 *   pxNum(24) → 24
 *
 * Use when a library requires a number (e.g., Recharts margin={{ top: pxNum(24) }}).
 */
export function pxNum(key: SpaceKey): number {
  // Parse the rem value to pixels (assumes 16px base)
  const remValue = parseFloat(space[key]);
  if (space[key] === '0px') return 0;
  return remValue * 16;
}
 
/**
 * getCSSSpaceVar(property) — Reads a spacing CSS variable at runtime.
 *
 * Usage:
 *   getCSSSpaceVar('--card-padding')     → "1.5rem"
 *   getCSSSpaceVar('--sidebar-nav-icon-gap') → "10px"
 */
export function getCSSSpaceVar(property: string, element?: Element): string {
  if (typeof window === 'undefined') return '';
  const target = element ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(property).trim();
}
 
// ─── SPACING ACCESSOR ─────────────────────────────────────────────────────────
 
/**
 * useSpacing() — Returns the complete spacing token object.
 * Type-safe access to all spacing contexts.
 *
 * Usage:
 *   const s = useSpacing();
 *   s.contexts.card.paddingDefault    // '1.5rem'
 *   s.contexts.button.default.height  // '36px'
 *   s.space[16]                       // '1rem'
 */
export function useSpacing() {
  return {
    space,
    aliases: spaceAliases,
    contexts: spacingContexts,
  };
}
 
// ─── CHART MARGIN HELPERS ─────────────────────────────────────────────────────
 
/**
 * chartMargin — Standard Recharts margin object using spacing tokens.
 *
 * Usage:
 *   <LineChart margin={chartMargin.default}>
 */
export const chartMargin = {
  /** Default chart margin — breathing room from container edges */
  default: {
    top:    pxNum(24),   // 24px
    right:  pxNum(16),   // 16px
    bottom: pxNum(16),   // 16px
    left:   pxNum(16),   // 16px
  },
  /** Compact chart margin — for smaller widgets */
  compact: {
    top:    pxNum(16),   // 16px
    right:  pxNum(8),    //  8px
    bottom: pxNum(8),    //  8px
    left:   pxNum(8),    //  8px
  },
  /** No margin — when container handles all spacing */
  none: {
    top: 0, right: 0, bottom: 0, left: 0,
  },
} as const;
 
// ─── COMPONENT SPACING CALCULATOR ────────────────────────────────────────────
 
/**
 * getButtonDimensions — Returns complete button spacing for a given size.
 *
 * Usage in custom button implementations:
 *   const dims = getButtonDimensions('default');
 *   // { paddingY: '0.5rem', paddingX: '1rem', height: '36px', ... }
 */
export function getButtonDimensions(size: 'large' | 'default' | 'small') {
  return spacingContexts.button[size];
}
 
/**
 * getInputDimensions — Returns complete input spacing for a given size.
 */
export function getInputDimensions(size: 'large' | 'default' | 'small') {
  return spacingContexts.input[size];
}
 
// ─── DENSITY HELPERS ─────────────────────────────────────────────────────────
 
/**
 * Density levels for different view types.
 * Pass to table/list components to adjust spacing automatically.
 */
export type DensityLevel = 'high' | 'standard' | 'low';
 
export const densityConfig: Record<DensityLevel, {
  rowPaddingY: string;
  itemGap: string;
  sectionGap: string;
  rowHeight: string;
}> = {
  high: {
    rowPaddingY: space[8],    //  8px
    itemGap:     space[8],    //  8px
    sectionGap:  space[16],   // 16px
    rowHeight:   '40px',
  },
  standard: {
    rowPaddingY: space[12],   // 12px
    itemGap:     space[12],   // 12px
    sectionGap:  space[24],   // 24px
    rowHeight:   '48px',
  },
  low: {
    rowPaddingY: space[20],   // 20px
    itemGap:     space[20],   // 20px
    sectionGap:  space[40],   // 40px
    rowHeight:   '60px',
  },
};
 