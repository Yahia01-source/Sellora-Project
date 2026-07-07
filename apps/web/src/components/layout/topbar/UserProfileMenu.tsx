
/**
 * @file components/layout/topbar/UserProfileMenu.tsx
 * @description Sellora Application Shell — User Profile Dropdown
 *
 * The canonical full account menu for Sellora (distinct from the sidebar's
 * lightweight user row, which only deep-links to /settings/account). This
 * menu carries identity confirmation (name/email header), account-related
 * navigation links, and the sign-out action — separated from navigation
 * links by a divider since sign-out is a destructive/terminal action and
 * should never be visually adjacent to a benign nav link by accident.
 */
 
'use client';
 
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CurrentUser } from '../layout.types';
 
interface UserProfileMenuProps {
  user: CurrentUser;
  onSignOut: () => void;
}
 
export function UserProfileMenu({ user, onSignOut }: UserProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
 
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
 
  const menuLinks = [
    { label: 'Your Profile', href: '/settings/account', icon: <UserIcon className="size-4" /> },
    { label: 'Billing',      href: '/settings/billing', icon: <CreditCardIcon className="size-4" /> },
    { label: 'Settings',     href: '/settings',         icon: <SettingsIcon className="size-4" /> },
  ];
 
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${user.name}`}
        className={cn(
          'flex items-center justify-center shrink-0 size-9 rounded-full',
          'bg-[var(--color-bg-emphasis)] text-[var(--color-text-secondary)]',
          'text-[12px] font-semibold overflow-hidden',
          'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
          'transition-shadow duration-[var(--duration-fast)]',
        )}
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          user.name.charAt(0).toUpperCase()
        )}
      </button>
 
      {open && (
        <div
          role="menu"
          aria-label="Account menu"
          className={cn(
            'absolute right-0 top-full z-[var(--z-dropdown)] mt-2',
            'w-[260px] py-1.5',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            'rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)]',
            'animate-scale-in origin-top-right',
          )}
        >
          {/* Identity header */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div
              className="flex items-center justify-center shrink-0 size-9 rounded-full bg-[var(--color-bg-emphasis)] text-[var(--color-text-secondary)] text-[13px] font-semibold overflow-hidden"
              aria-hidden="true"
            >
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="size-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[var(--color-text)] truncate">
                {user.name}
              </p>
              <p className="text-[12px] text-[var(--color-text-muted)] truncate">
                {user.email}
              </p>
            </div>
          </div>
 
          <div className="my-1 h-px bg-[var(--color-border)]" role="separator" />
 
          <div role="none">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={close}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2',
                  'text-[13px] text-[var(--color-text)]',
                  'transition-colors duration-[var(--duration-fast)]',
                  'hover:bg-[var(--color-bg-subtle)]',
                  'outline-none focus-visible:bg-[var(--color-bg-subtle)]',
                )}
              >
                <span aria-hidden="true" className="text-[var(--color-text-muted)]">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
 
          <div className="my-1 h-px bg-[var(--color-border)]" role="separator" />
 
          <button
            type="button"
            role="menuitem"
            onClick={() => { onSignOut(); close(); }}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-2',
              'text-[13px] text-[var(--color-danger-text)]',
              'transition-colors duration-[var(--duration-fast)]',
              'hover:bg-[var(--color-danger-subtle)]',
              'outline-none focus-visible:bg-[var(--color-danger-subtle)]',
            )}
          >
            <LogOutIcon className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
 