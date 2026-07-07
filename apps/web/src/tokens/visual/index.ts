
/**
 * @file tokens/visual/index.ts
 * @description Sellora Visual Foundation — Master Barrel Export
 *
 * Single import for all visual foundation tokens.
 *
 * Usage:
 *   import { visual } from '@/tokens/visual';
 *   visual.radius.md           // '0.375rem'
 *   visual.shadow.sm           // '0 1px 3px...'
 *   visual.motion.duration.fast // '100ms'
 *   visual.zIndex.modal        // 400
 */
 
export * from './radius';
export * from './borders';
export * from './shadows';
export * from './opacity';
export * from './focus';
export * from './motion';
export * from './zindex';
 
import { radius } from './radius';
import { borderWidth, borderStyle, borderColors, borderTokens } from './borders';
import { shadow, focusShadow, componentShadows } from './shadows';
import { opacity, blur, overlay } from './opacity';
import { focusRing, keyboardNavigation, focusAccessibility } from './focus';
import { duration, easing, transition, keyframes, reducedMotion } from './motion';
import { zIndex, stackingContextRules } from './zindex';
 
export const visual = {
  radius,
  border: {
    width:  borderWidth,
    style:  borderStyle,
    color:  borderColors,
    tokens: borderTokens,
  },
  shadow: {
    elevation:   shadow,
    focus:       focusShadow,
    components:  componentShadows,
  },
  opacity,
  blur,
  overlay,
  focus: {
    ring:         focusRing,
    keyboard:     keyboardNavigation,
    accessibility: focusAccessibility,
  },
  motion: {
    duration,
    easing,
    transition,
    keyframes,
    reducedMotion,
  },
  zIndex: {
    scale: zIndex,
    rules: stackingContextRules,
  },
} as const;
 
export type Visual = typeof visual;
 