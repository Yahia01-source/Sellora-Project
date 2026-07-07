/**
 * @file app/(dashboard)/layout.tsx
 * @description Sellora — Example Wiring of DashboardShell into Next.js App Router
 *
 * This file demonstrates how a real route group layout consumes the shell.
 * Data below (user, workspaces, notifications) would normally come from
 * your auth session + API calls (e.g., in a Server Component that fetches
 * and passes serializable props down to this Client Component boundary).
 * No fake business data is rendered by default — arrays are empty unless
 * your data layer populates them.
 */

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardShell } from '@/components/layout';
import type {
  BreadcrumbItem,
  CurrentUser,
  LanguageOption,
  NotificationItem,
  Workspace,
} from '@/components/layout';

// ─── Static configuration (safe to hardcode — not business data) ────────────

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
];

/**
 * Derives breadcrumb items from the current pathname.
 * Replace with real route-metadata-driven breadcrumbs as pages are built.
 */
function useBreadcrumbsFromPath(): BreadcrumbItem[] {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      label,
      href: index === segments.length - 1 ? undefined : href,
    };
  });
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbsFromPath();

  // Replace with real session data (e.g., from a server-fetched prop or
  // a client-side session hook backed by your auth provider).
  const user: CurrentUser = {
    id: '',
    name: '',
    email: '',
    avatarUrl: null,
    role: 'STORE_OWNER', // ← مطلوب: استبدله لاحقاً بقيمة من الـ session
    storeId: null,
  };

  const workspaces: Workspace[] = [];
  const notifications: NotificationItem[] = [];

  return (
    <DashboardShell
      user={user}
      workspaces={workspaces}
      activeWorkspaceId={workspaces[0]?.id ?? ''}
      breadcrumbs={breadcrumbs}
      notifications={notifications}
      languages={LANGUAGES}
      activeLanguageCode="en"
      onSwitchWorkspace={(workspaceId) => {
        // Wire to your tenant-context switch + redirect logic
        console.log('Switch workspace:', workspaceId);
      }}
      onLanguageChange={(language) => {
        // Wire to your i18n provider (e.g., next-intl router push with locale)
        console.log('Change language:', language.code);
      }}
      onSignOut={() => {
        // Wire to your auth provider's sign-out + redirect
        router.push('/login');
      }}
    >
      {children}
    </DashboardShell>
  );
}