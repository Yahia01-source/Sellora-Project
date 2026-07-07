/**
 * @file components/ui/button/Button.tsx
 * @description Sellora Button System — Core Button Component
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * IMPLEMENTATION DECISIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. FORWARDREF:
 *    Every button uses React.forwardRef. This allows parent components to
 *    access the underlying DOM element for:
 *    - Tooltip positioning (needs DOM rect)
 *    - Focus management (programmatic .focus())
 *    - Animation libraries (Framer Motion needs ref access)
 *    - Form libraries (React Hook Form registers via ref)
 *
 * 2. SLOT (asChild):
 *    @radix-ui/react-slot merges button props onto the child element.
 *    This is how <Button asChild><Link href="...">Go</Link></Button> works.
 *    The Link gets all button styling + ARIA without wrapping in an extra div.
 *
 * 3. LOADING STATE APPROACH:
 *    'replace' mode: text gets visibility:hidden (keeps space), spinner appears
 *    centered via absolute positioning. This prevents layout shift (CLS).
 *
 * 4. KEYBOARD HANDLING:
 *    space/enter are handled natively by <button>.
 *    We add custom handling for non-button elements (asChild with div/span).
 *
 * 5. ARIA:
 *    - aria-busy: true during loading (screen reader: "loading, busy")
 *    - aria-disabled: mirrors disabled (accessible to AT even with pointer-events-none)
 *    - aria-pressed: for selected/toggle buttons
 *    - aria-label: required for iconOnly buttons
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
'use client';
 
import React, { forwardRef, useCallback, type KeyboardEvent } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/tokens/use-tokens';
import { buttonVariants } from './button.variants';
import type { ButtonProps } from './button.types';
import { Spinner } from './Spinner';
 
/**
 * Button — Core interactive element for Sellora.
 *
 * @example Basic usage
 * <Button>Save Changes</Button>
 *
 * @example With variant and size
 * <Button variant="danger" size="sm">Delete</Button>
 *
 * @example With icons
 * <Button leftIcon={<PlusIcon />}>Add Product</Button>
 * <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
 *
 * @example Icon only (MUST have aria-label)
 * <Button iconOnly aria-label="Add product"><PlusIcon /></Button>
 *
 * @example Loading state
 * <Button loading loadingText="Saving...">Save</Button>
 *
 * @example Full width
 * <Button fullWidth>Submit Order</Button>
 *
 * @example As Next.js Link
 * <Button asChild><Link href="/orders">View Orders</Link></Button>
 *
 * @example Selected/toggle state
 * <Button selected variant="outline">Grid View</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      // CVA variants
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconOnly = false,
 
      // Content
      children,
      leftIcon,
      rightIcon,
 
      // Loading state
      loading = false,
      loadingText = 'Loading...',
      loadingPlacement = 'replace',
      spinner,
 
      // Interaction
      disabled = false,
      selected = false,
      type = 'button',
 
      // Polymorphism
      asChild = false,
 
      // Styling
      className,
 
      // Event handlers
      onClick,
 
      // HTML attrs (passed through)
      'aria-label': ariaLabel,
      ...htmlProps
    },
    ref,
  ) => {
    // ── DERIVED STATE ─────────────────────────────────────────────────────────
 
    const isDisabled = disabled || loading;
    const showSpinner = loading;
 
    // Which spinner to render
    const spinnerElement = spinner ?? (
      <Spinner
        size={size}
        variant={variant}
        className={cn(
          // In 'replace' mode, spinner is absolutely centered
          loadingPlacement === 'replace' && 'absolute inset-0 m-auto',
        )}
      />
    );
 
    // ── ICON ONLY VALIDATION ──────────────────────────────────────────────────
    // In development: warn if iconOnly button has no accessible label
    if (process.env.NODE_ENV === 'development' && iconOnly && !ariaLabel) {
      console.warn(
        '[Sellora Button] iconOnly buttons MUST have an aria-label prop. ' +
        'Screen readers cannot describe icon-only buttons without it.',
      );
    }
 
    // ── KEYBOARD HANDLER ─────────────────────────────────────────────────────
    // Native <button> handles Enter and Space natively.
    // For asChild with non-button elements, we need explicit keyboard support.
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (asChild && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          if (!isDisabled) {
            (e.currentTarget as HTMLElement).click();
          }
        }
        htmlProps.onKeyDown?.(e as never);
      },
      [asChild, isDisabled, htmlProps],
    );
 
    // ── CLICK HANDLER ─────────────────────────────────────────────────────────
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      },
      [isDisabled, onClick],
    );
 
    // ── COMPONENT SELECTION ───────────────────────────────────────────────────
    const Comp = asChild ? Slot : 'button';
 
    // ── CLASS COMPUTATION ─────────────────────────────────────────────────────
    const computedClassName = cn(
      buttonVariants({ variant, size, fullWidth, iconOnly }),
      // Selected state ring
      selected && [
        'ring-2',
        'ring-[var(--color-primary)]',
        'ring-offset-1',
        'ring-offset-[var(--color-bg)]',
      ],
      // Loading with replace: position:relative for absolute spinner
      loading && loadingPlacement === 'replace' && 'relative',
      className,
    );
 
    // ── CONTENT RENDERING ─────────────────────────────────────────────────────
 
    /**
     * RENDER LOGIC BREAKDOWN:
     *
     * iconOnly=true:
     *   <button><icon /></button> — simple, spinner replaces icon when loading
     *
     * loading + loadingPlacement='replace':
     *   <button>
     *     <span aria-hidden style="visibility:hidden">{original content}</span>
     *     <spinner /> ← absolutely centered
     *   </button>
     *   WHY: Button maintains its width (hidden content takes space).
     *        Spinner appears centered via absolute positioning.
     *
     * loading + loadingPlacement='left':
     *   <button><spinner />{label}</button>
     *
     * loading + loadingPlacement='right':
     *   <button>{label}<spinner /></button>
     *
     * Normal:
     *   <button>{leftIcon}{children}{rightIcon}</button>
     */
 
    const renderContent = () => {
      if (iconOnly) {
        return (
          <>
            {loading ? spinnerElement : children}
          </>
        );
      }
 
      if (loading && loadingPlacement === 'replace') {
        return (
          <>
            {/* Hidden original content — maintains button width */}
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-inherit"
              style={{ visibility: 'hidden' }}
            >
              {leftIcon}
              {children}
              {rightIcon}
            </span>
            {/* Absolutely centered spinner */}
            {spinnerElement}
          </>
        );
      }
 
      if (loading && loadingPlacement === 'left') {
        return (
          <>
            {spinnerElement}
            <span>{children}</span>
            {rightIcon}
          </>
        );
      }
 
      if (loading && loadingPlacement === 'right') {
        return (
          <>
            {leftIcon}
            <span>{children}</span>
            {spinnerElement}
          </>
        );
      }
 
      // Normal state
      return (
        <>
          {leftIcon && (
            <span aria-hidden="true" className="inline-flex shrink-0">
              {leftIcon}
            </span>
          )}
          {children && (
            <span>{children}</span>
          )}
          {rightIcon && (
            <span aria-hidden="true" className="inline-flex shrink-0">
              {rightIcon}
            </span>
          )}
        </>
      );
    };
 
    // ── ARIA ATTRIBUTES ───────────────────────────────────────────────────────
 
    const ariaProps = {
      'aria-label':    ariaLabel,
      'aria-busy':     loading ? true : undefined,
      'aria-disabled': isDisabled ? true : undefined,
      'aria-pressed':  selected !== undefined ? selected : undefined,
    };
 
    // ── RENDER ────────────────────────────────────────────────────────────────
 
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={asChild ? undefined : isDisabled}
        className={computedClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-loading={loading ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        data-selected={selected ? '' : undefined}
        data-variant={variant}
        data-size={size}
        {...ariaProps}
        {...htmlProps}
      >
        {renderContent()}
      </Comp>
    );
  },
);
 
Button.displayName = 'Button';
 
export { Button };
 