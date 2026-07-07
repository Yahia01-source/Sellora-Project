/**
 * @file components/layout/layout.types.ts
 * @description Sellora Layout System — Complete Type Definitions
 */

import type { ReactNode } from 'react';

// ─── USER ─────────────────────────────────────────────────────────────────────

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: string;
  storeId?: string | null;
}

// ─── WORKSPACE ────────────────────────────────────────────────────────────────

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  plan?: 'free' | 'starter' | 'growth' | 'enterprise';
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

export interface NavBadge {
  content: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: NavBadge;
  exactMatch?: boolean;
  children?: NavItem[];
  disabled?: boolean;
  external?: boolean;
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// ─── BREADCRUMB ───────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────

export interface LanguageOption {
  code: string;
  label: string;
  flag?: string;
  dir?: 'ltr' | 'rtl';
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export type NotificationTone = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  tone?: NotificationTone;
  read?: boolean;
  href?: string;
  createdAt?: string | Date;
  timestamp?: string;
  avatarUrl?: string | null;
  icon?: ReactNode;
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

export type SidebarState = 'expanded' | 'collapsed' | 'hidden';

export interface SidebarConfig {
  defaultState?: SidebarState;
  collapsible?: boolean;
  width?: number;
  collapsedWidth?: number;
}

// ─── DASHBOARD SHELL ──────────────────────────────────────────────────────────

export interface DashboardShellConfig {
  sidebar?: SidebarConfig;
  showTopbar?: boolean;
  showBreadcrumbs?: boolean;
}
// --- SIDEBAR CONTEXT VALUE ---------------------------------------------------
export interface SidebarContextValue {
  state: SidebarState;
  isMobile: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  setMobileOpen: (open: boolean) => void;
}
