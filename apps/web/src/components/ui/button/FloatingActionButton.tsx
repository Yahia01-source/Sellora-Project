
/**
 * @file components/ui/button/FloatingActionButton.tsx
 * @description Sellora Button System — Floating Action Button (FAB)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHEN TO USE A FAB IN SELLORA
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * FABs are for the MOST IMPORTANT action on a mobile screen.
 * On desktop Sellora, FABs are rarely needed — the top nav and page headers
 * handle primary actions. On mobile dashboards:
 *
 * APPROPRIATE:
 * - Orders list page: "Create Order" FAB
 * - Products list page: "Add Product" FAB
 * - Customers page: "Add Customer" FAB
 *
 * NOT APPROPRIATE:
 * - Settings pages (multiple equal actions, no single primary)
 * - Detail pages (action is usually in the page header)
 * - Pages where a regular button already handles the primary action
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * EXTENDED vs COMPACT
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Compact FAB: Circle or square, icon only. Used on mobile.
 * Extended FAB: Pill shape, icon + text. Used when context is needed.
 *
 * The extended FAB is preferred when screen space allows —
 * it's more accessible (no need to decode the icon).
 */
 
'use client';
 
import React, { forwardRef } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/tokens/use-tokens';
import type { FABProps } from './button.types';
 
/**
 * FloatingActionButton — fixed position primary action button.
 *
 * @example Compact (icon only)
 * <FloatingActionButton
 *   aria-label="Create new order"
 *   icon={<PlusIcon />}
 *   onClick={handleCreate}
 * />
 *
 * @example Extended (icon + label)
 * <FloatingActionButton
 *   extended
 *   label="Create Order"
 *   leftIcon={<PlusIcon />}
 *   onClick={handleCreate}
 *   position="bottom-right"
 * />
 */
export const FloatingActionButton = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      position = 'bottom-right',
      offset,
      extended = false,
      label,
      size = 'lg',
      variant = 'primary',
      className,
      children,
      leftIcon,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    // Position classes
    const positionClasses = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left':  'bottom-6 left-6',
      'top-right':    'top-6 right-6',
      'top-left':     'top-6 left-6',
    };
 
    // Custom offset styles (overrides position classes)
    const offsetStyle = offset
      ? {
          top:    offset.top    !== undefined ? `${offset.top}px`    : undefined,
          right:  offset.right  !== undefined ? `${offset.right}px`  : undefined,
          bottom: offset.bottom !== undefined ? `${offset.bottom}px` : undefined,
          left:   offset.left   !== undefined ? `${offset.left}px`   : undefined,
        }
      : undefined;
 
    return (
      <Button
        ref={ref}
        variant={variant}
        size={extended ? size : 'lg'}
        iconOnly={!extended}
        leftIcon={extended ? leftIcon : undefined}
        aria-label={ariaLabel}
        className={cn(
          // Fixed positioning
          'fixed',
          !offset && positionClasses[position],
          // Elevation — FAB is always highly elevated
          'shadow-[var(--shadow-xl)]',
          'hover:shadow-[var(--shadow-2xl)]',
          // Extended FAB shape
          extended && 'rounded-[var(--radius-full)] px-5 gap-2',
          // Compact FAB shape
          !extended && 'rounded-[var(--radius-full)]',
          // Z-index — above content but below modals
          'z-[var(--z-sticky)]',
          // Entrance animation
          'animate-fade-in',
          // Active press feedback (more pronounced for FAB)
          'active:scale-95',
          className,
        )}
        style={offsetStyle}
        {...props}
      >
        {extended ? (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {label && <span>{label}</span>}
          </>
        ) : (
          children ?? leftIcon
        )}
      </Button>
    );
  },
);
 
FloatingActionButton.displayName = 'FloatingActionButton';
 