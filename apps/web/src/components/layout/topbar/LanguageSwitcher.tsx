'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GlobeIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LanguageOption } from '../layout.types';

interface LanguageSwitcherProps {
  languages: LanguageOption[];
  activeCode: string;
  onChange: (language: LanguageOption) => void;
}

export function LanguageSwitcher({ languages, activeCode, onChange }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const active = languages.find((l) => l.code === activeCode) ?? languages[0];
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active.label ?? active.code}. Click to change.`}
        className={cn(
          'flex items-center justify-center size-9 rounded-[var(--radius-md)]',
          'text-[var(--color-text-secondary)]',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
          'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
        )}
      >
        <GlobeIcon className="size-[18px]" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className={cn(
            'absolute right-0 top-full z-[var(--z-dropdown)] mt-2',
            'min-w-[160px] py-1',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            'rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)]',
            'animate-scale-in origin-top-right',
          )}
        >
          {languages.map((lang) => {
            const isActive = lang.code === active.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => { onChange(lang); close(); }}
                dir={lang.dir ?? 'ltr'}
                className={cn(
                  'w-full flex items-center justify-between gap-3 px-3 py-2',
                  'text-[13px] text-[var(--color-text)]',
                  'transition-colors duration-[var(--duration-fast)]',
                  'hover:bg-[var(--color-bg-subtle)]',
                  'outline-none focus-visible:bg-[var(--color-bg-subtle)]',
                )}
              >
                <span>{lang.label ?? lang.code}</span>
                {isActive && (
                  <CheckIcon className="size-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
