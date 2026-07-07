
/**
 * @file tokens/index.ts
 * @description Sellora Design Token System — Master Barrel Export
 *
 * This is the SINGLE IMPORT for all design tokens in the application.
 *
 * Usage:
 *   import { colors, typeScale, spacing, shadow } from '@/tokens';
 *
 * NEVER import from individual token files in components.
 * Always import from this barrel. This allows token file reorganization
 * without updating every component import.
 */
 
// Color Primitives
export { gray, blue, green, amber, red, cyan, base } from './colors';
 
// Color Semantics
export { colors } from './colors';
export type { SemanticColors, ColorPrimitive } from './colors';
 
// Typography
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typeScale,
} from './typography';
export type { TypeScale, TypeScaleKey } from './typography';
 
// Spacing
export { spacing } from './spacing';
export type { Spacing } from './spacing';
 
// Shape & Decoration
export { borderRadius, shadow, opacity, borderWidth, zIndex } from './shape';
export type { BorderRadius, Shadow, Opacity, BorderWidth, ZIndex } from './shape';
 
// Layout & Motion
export {
  breakpoints,
  container,
  sidebar,
  contentArea,
  grid,
  cardSizes,
  iconSize,
  duration,
  easing,
  focusRing,
} from './layout';
export type {
  Breakpoints,
  Container,
  Sidebar,
  Grid,
  CardSizes,
  IconSize,
  Duration,
  Easing,
  FocusRing,
} from './layout';
 
// ─── MASTER TOKEN OBJECT ─────────────────────────────────────────────────────
// A single object containing every token. Useful for:
// - Generating CSS custom properties programmatically
// - Theme providers
// - Storybook theme decorator
// - Design token documentation tools (Style Dictionary, Token Studio)
 
import { gray, blue, green, amber, red, cyan, base, colors } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, typeScale } from './typography';
import { spacing } from './spacing';
import { borderRadius, shadow, opacity, borderWidth, zIndex } from './shape';
import {
  breakpoints, container, sidebar, contentArea,
  grid, cardSizes, iconSize, duration, easing, focusRing,
} from './layout';
 
export const tokens = {
  primitives: { gray, blue, green, amber, red, cyan, base },
  colors,
  typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, typeScale },
  spacing,
  borderRadius,
  shadow,
  opacity,
  borderWidth,
  zIndex,
  breakpoints,
  container,
  sidebar,
  contentArea,
  grid,
  cardSizes,
  iconSize,
  motion: { duration, easing },
  focusRing,
} as const;
 
export type Tokens = typeof tokens;
 