
/**
 * @file components/ui/button/SplitButton.tsx
 * @description Sellora Button System — Split Button (Primary + Dropdown)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHAT IS A SPLIT BUTTON
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * A Split Button combines:
 * 1. A primary action button (left side)
 * 2. A dropdown trigger (right side, chevron-down icon)
 *
 * When clicked, the dropdown shows alternative/secondary actions.
 *
 * REAL USE CASES IN SELLORA:
 * - "Fulfill Order" + [Mark as Packed | Print Label | Cancel Fulfillment]
 * - "Save Product" + [Save & Publish | Save as Draft | Duplicate]
 * - "Export" + [Export CSV | Export Excel | Export PDF]
 *
 * WHY NOT JUST TWO SEPARATE BUTTONS:
 * Split button communicates that these actions are RELATED to each other
 * and that one is the "default" path. Two separate buttons look unrelated.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * IMPLEMENTATION: CONTROLLED + UNCONTROLLED HYBRID
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Supports both:
 * - Uncontrolled: manages its own open state internally
 * - Controlled: parent passes dropdownOpen + onDropdownToggle
 *
 * This flexibility is required for enterprise use where:
 * - Simple cases: let it manage itself
 * - Complex cases: parent needs to know when dropdown is open
 *   (e.g., to prevent page scroll while dropdown is open)
 */
 
'use client';
 
import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/tokens/use-tokens';
import type { SplitButtonProps } from './button.types';
 
function ChevronDownIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
 
/**
 * SplitButton — primary action with dropdown of secondary actions.
 *
 * @example
 * <SplitButton
 *   onClick={handleFulfill}
 *   actions={[
 *     { label: 'Mark as Packed', onClick: handlePack, icon: <PackageIcon /> },
 *     { label: 'Print Label', onClick: handlePrint, icon: <PrinterIcon /> },
 *     { label: 'Cancel', onClick: handleCancel, danger: true },
 *   ]}
 * >
 *   Fulfill Order
 * </SplitButton>
 */
export const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      children,
      actions,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      dropdownOpen: controlledOpen,
      onDropdownToggle,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
 
    // Support both controlled and uncontrolled
    const isOpen = controlledOpen ?? internalOpen;
 
    const toggleDropdown = useCallback(() => {
      if (onDropdownToggle) {
        onDropdownToggle();
      } else {
        setInternalOpen((prev) => !prev);
      }
    }, [onDropdownToggle]);
 
    const closeDropdown = useCallback(() => {
      if (onDropdownToggle) {
        if (isOpen) onDropdownToggle();
      } else {
        setInternalOpen(false);
      }
    }, [isOpen, onDropdownToggle]);
 
    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          closeDropdown();
        }
      };
      document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
    }, [isOpen, closeDropdown]);
 
    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeDropdown();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeDropdown]);
 
    return (
      <div
        ref={containerRef}
        className="relative inline-flex"
        style={{ isolation: 'isolate' }}
      >
        {/* ── PRIMARY ACTION BUTTON ──────────────────────────────────────── */}
        <Button
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled}
          loading={loading}
          onClick={onClick}
          className={cn(
            // Remove right border radius to merge with dropdown trigger
            'rounded-r-none',
            // Compensate for the divider line between buttons
            'border-r-0',
            className,
          )}
          {...props}
        >
          {children}
        </Button>
 
        {/* ── DIVIDER LINE ───────────────────────────────────────────────── */}
        {/*
          A 1px vertical line between the primary button and the dropdown trigger.
          Uses a semi-transparent white line on solid backgrounds,
          a semi-transparent dark line on transparent backgrounds.
        */}
        <div
          aria-hidden="true"
          className={cn(
            'w-px self-stretch',
            // On solid colored variants
            ['primary', 'danger', 'success', 'warning', 'info'].includes(variant)
              ? 'bg-white/25'
              : 'bg-[var(--color-border-strong)]',
          )}
        />
 
        {/* ── DROPDOWN TRIGGER BUTTON ────────────────────────────────────── */}
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          iconOnly
          aria-label="More actions"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={toggleDropdown}
          className="rounded-l-none border-l-0 px-2!"
        >
          <ChevronDownIcon />
        </Button>
 
        {/* ── DROPDOWN MENU ─────────────────────────────────────────────── */}
        {isOpen && (
          <div
            role="menu"
            aria-orientation="vertical"
            className={cn(
              'absolute right-0 top-full z-[var(--z-dropdown)]',
              'mt-1 min-w-[180px] py-1',
              'bg-[var(--color-surface)]',
              'border border-[var(--color-border)]',
              'rounded-[var(--radius-md)]',
              'shadow-[var(--shadow-dropdown)]',
              'animate-scale-in origin-top-right',
            )}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                role="menuitem"
                disabled={action.disabled}
                onClick={() => {
                  action.onClick();
                  closeDropdown();
                }}
                className={cn(
                  'w-full flex items-center gap-2',
                  'px-3 py-2',
                  'text-left text-[14px] font-normal',
                  'transition-colors duration-[var(--duration-fast)]',
                  'outline-none focus-visible:bg-[var(--color-bg-muted)]',
                  // Normal state
                  !action.danger && !action.disabled && [
                    'text-[var(--color-text)]',
                    'hover:bg-[var(--color-bg-subtle)]',
                  ],
                  // Danger action
                  action.danger && !action.disabled && [
                    'text-[var(--color-danger-text)]',
                    'hover:bg-[var(--color-danger-subtle)]',
                  ],
                  // Disabled action
                  action.disabled && [
                    'text-[var(--color-text-disabled)]',
                    'cursor-not-allowed',
                    'opacity-40',
                  ],
                )}
              >
                {action.icon && (
                  <span aria-hidden="true" className="inline-flex shrink-0 text-[var(--color-text-muted)] [&_svg]:size-4">
                    {action.icon}
                  </span>
                )}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
 
SplitButton.displayName = 'SplitButton';
 