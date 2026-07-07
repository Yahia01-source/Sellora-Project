/**
 * @file lib/utils.ts
 * @description Sellora — Shared Utility Functions
 *
 * cn() merges Tailwind classes correctly, resolving conflicts via
 * tailwind-merge. Without it, `cn('p-4', 'p-6')` would emit both classes
 * (last one wins in CSS source order, which is fragile); tailwind-merge
 * instead removes the conflicting `p-4` entirely so only `p-6` remains.
 */
 
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
 
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
 