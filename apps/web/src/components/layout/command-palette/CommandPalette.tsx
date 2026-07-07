
/**
 * @file components/layout/shell/CommandPalette.tsx
 * @description Sellora Application Shell — Command Palette (Placeholder)
 *
 * SCOPE NOTE: Per the brief this is a STRUCTURAL placeholder — the global
 * ⌘K dialog shell, focus trap, keyboard wiring, and open/close state are
 * fully implemented and production-ready. The actual SEARCH RESULTS
 * (querying orders/products/customers/settings) are intentionally NOT
 * implemented here, since Orders/Products/CRM/Settings pages are out of
 * scope for this layout-only task. The input is fully functional for
 * typing; `onQueryChange` is exposed so a future search-results feature
 * can be wired in without touching this component's shell.
 *
 * KEYBOARD CONTRACT:
 *   ⌘K / Ctrl+K  → toggles open (wired at the Shell level, see useCommandPalette hook)
 *   Escape       → closes
 *   Tab          → focus stays trapped within the dialog while open
 */
 
'use client';
 
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
 
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onQueryChange?: (query: string) => void;
}
 
export function CommandPalette({ open, onClose, onQueryChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
 
  // Autofocus input on open, reset query on close
  useEffect(() => {
    if (open) {
      // Delay to ensure the element is mounted/visible before focusing
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    setQuery('');
  }, [open]);
 
  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);
 
  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);
 
  // Basic focus trap: keep Tab within the dialog
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
 
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);
 
  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      onQueryChange?.(value);
    },
    [onQueryChange],
  );
 
  if (!open) return null;
 
  return (
    <div
      className="fixed inset-0 z-[var(--z-command)] flex items-start justify-center pt-[12vh] px-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[var(--color-bg-overlay)] animate-fade-in"
      />
 
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search Sellora"
        className={cn(
          'relative w-full max-w-[600px]',
          'bg-[var(--color-surface)] border border-[var(--color-border)]',
          'rounded-[var(--radius-xl)] shadow-[var(--shadow-command)]',
          'animate-scale-in overflow-hidden',
        )}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--color-border)]">
          <SearchIcon className="size-5 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search orders, products, customers, settings..."
            aria-label="Search query"
            className={cn(
              'flex-1 bg-transparent outline-none border-none',
              'text-[15px] text-[var(--color-text)]',
              'placeholder:text-[var(--color-text-muted)]',
            )}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className={cn(
              'flex items-center justify-center shrink-0 size-7 rounded-[var(--radius-sm)]',
              'text-[var(--color-text-muted)]',
              'transition-colors duration-[var(--duration-fast)]',
              'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
              'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
            )}
          >
            <XIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
 
        {/* Results area — placeholder state */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {query.trim().length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <SearchIcon className="size-8 text-[var(--color-text-disabled)] mb-3" aria-hidden="true" />
              <p className="text-[13px] text-[var(--color-text-muted)]">
                Start typing to search across your store
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <p className="text-[13px] text-[var(--color-text-muted)]">
                No results for <span className="font-medium text-[var(--color-text)]">"{query}"</span>
              </p>
            </div>
          )}
        </div>
 
        {/* Footer hint row */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
            <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 font-mono">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
            <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 font-mono">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
            <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 font-mono">esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
 