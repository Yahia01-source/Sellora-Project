
/**
 * @file components/ui/button/AsyncButton.tsx
 * @description Sellora Button System — Async Button with State Machine
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY A SEPARATE ASYNC BUTTON
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * In enterprise dashboards, almost every action is asynchronous:
 * - Save order → API call → success/error
 * - Create product → upload + API → success/error
 * - Delete record → confirmation + API → success/error
 *
 * WITHOUT AsyncButton, every developer writes:
 * const [loading, setLoading] = useState(false);
 * const [error, setError] = useState(null);
 * const handleClick = async () => {
 *   setLoading(true);
 *   try { await saveOrder(); setLoading(false); }
 *   catch (e) { setLoading(false); setError(e); }
 * };
 *
 * This pattern is REPEATED HUNDREDS OF TIMES across a real codebase.
 *
 * WITH AsyncButton:
 * <AsyncButton onClick={saveOrder}>Save Order</AsyncButton>
 *
 * The state machine (idle → loading → success/error → idle) is
 * encapsulated once, used everywhere.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * STATE MACHINE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *  idle ──onClick()──→ loading ──success──→ success ──timeout──→ idle
 *                           └──error────→ error   ──timeout──→ idle
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
'use client';
 
import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { Button } from './Button';
import type { AsyncButtonProps, AsyncButtonState } from './button.types';
import { cn } from '@/lib/tokens/use-tokens';
 
// Icons for success/error states (inline SVG to avoid icon library dependency)
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path
        d="M3 8l3.5 3.5 6.5-7"
        stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
 
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
 
/**
 * AsyncButton — automatic loading/success/error state management.
 *
 * @example
 * <AsyncButton
 *   onClick={async () => { await saveOrder(orderId); }}
 *   successText="Order Saved!"
 *   errorText="Failed to save"
 * >
 *   Save Order
 * </AsyncButton>
 */
export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  (
    {
      onClick,
      successDuration = 2000,
      errorDuration = 3000,
      successText = 'Done!',
      errorText = 'Failed',
      children,
      variant = 'primary',
      loadingText = 'Loading...',
      className,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<AsyncButtonState>('idle');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 
    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);
 
    const handleClick = useCallback(async () => {
      if (state !== 'idle') return;
 
      setState('loading');
 
      try {
        await onClick();
        setState('success');
        timerRef.current = setTimeout(() => {
          setState('idle');
        }, successDuration);
      } catch {
        setState('error');
        timerRef.current = setTimeout(() => {
          setState('idle');
        }, errorDuration);
      }
    }, [onClick, state, successDuration, errorDuration]);
 
    // Derive visual props from state
    const isLoading = state === 'loading';
    const isSuccess = state === 'success';
    const isError   = state === 'error';
 
    const effectiveVariant = isSuccess
      ? 'success'
      : isError
        ? 'danger'
        : variant;
 
    const effectiveContent = isSuccess
      ? successText
      : isError
        ? errorText
        : children;
 
    const effectiveLeftIcon = isSuccess
      ? <CheckIcon />
      : isError
        ? <XIcon />
        : undefined;
 
    return (
      <Button
        ref={ref}
        variant={effectiveVariant}
        loading={isLoading}
        loadingText={loadingText}
        disabled={state !== 'idle'}
        leftIcon={effectiveLeftIcon}
        onClick={handleClick}
        className={cn(
          // Smooth variant transition when state changes
          'transition-[background-color,color,border-color]',
          `duration-[var(--duration-normal)]`,
          className,
        )}
        aria-live="polite"        // Announce state changes to screen readers
        aria-atomic="true"
        {...props}
      >
        {effectiveContent}
      </Button>
    );
  },
);
 
AsyncButton.displayName = 'AsyncButton';
 