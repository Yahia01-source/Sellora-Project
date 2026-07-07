
'use client';
 
import React from 'react';
import {
  PlusIcon,
  PackageIcon,
  UserPlusIcon,
  UsersIcon,
  BarChart3Icon,
  TrendingUpIcon,
  ClockIcon,
  AlertCircleIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WelcomeData } from './dashboard.types';
 
// ─── HELPERS ─────────────────────────────────────────────────────────────────
 
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
 
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
 
function formatCurrency(centimes: number, currency: string): string {
  const value = centimes / 100;
  return `${new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)} ${currency}`;
}
 
// ─── QUICK ACTION BUTTON ─────────────────────────────────────────────────────
 
interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  tone?: 'primary' | 'default';
}
 
function QuickActionButton({ icon, label, href, tone = 'default' }: QuickActionProps) {
  return (
    <a
      href={href}
      className={cn(
        'group flex items-center gap-2.5 px-4 py-2.5',
        'rounded-[var(--radius-md)] border',
        'text-[13px] font-medium whitespace-nowrap',
        'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-primary)]',
        tone === 'primary'
          ? [
              'bg-[var(--color-primary)] text-white border-transparent',
              'hover:bg-[var(--color-primary-hover)] shadow-[0_1px_2px_rgba(37,99,235,0.25)]',
            ]
          : [
              'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
              'hover:bg-[var(--color-hover)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
            ],
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          '[&_svg]:size-4 shrink-0',
          tone === 'primary'
            ? 'text-white'
            : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]',
        )}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}
 
// ─── STAT PILL ────────────────────────────────────────────────────────────────
 
function StatPill({
  icon,
  label,
  value,
  tone = 'default',
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone?: 'success' | 'warning' | 'danger' | 'default';
}) {
  const toneClasses = {
    success: 'text-[var(--color-success-text)] bg-[var(--color-success-subtle)]',
    warning: 'text-[var(--color-warning-text)] bg-[var(--color-warning-subtle)]',
    danger:  'text-[var(--color-danger-text)] bg-[var(--color-danger-subtle)]',
    default: 'text-[var(--color-text-secondary)] bg-[var(--color-bg-muted)]',
  };
 
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)]', toneClasses[tone])}>
      <span aria-hidden="true" className="[&_svg]:size-4 shrink-0">{icon}</span>
      <span className="text-[12px]">
        <span className="font-semibold tabular-nums">{value}</span>{' '}
        <span className="opacity-80">{label}</span>
      </span>
    </div>
  );
}
 
// ─── WELCOME SECTION ─────────────────────────────────────────────────────────
 
interface WelcomeSectionProps {
  data: WelcomeData;
}
 
export function WelcomeSection({ data }: WelcomeSectionProps) {
  const greeting = getGreeting();
 
  return (
    <div className="flex flex-col gap-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-1">
            {formatDate(data.currentDate)}
          </p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[var(--color-text)] leading-tight tracking-tight">
            {greeting}, {data.userName} 👋
          </h1>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
            {data.storeName}
          </p>
        </div>
 
        {/* Quick Stats */}
        <div className="flex flex-wrap gap-2">
          <StatPill
            icon={<TrendingUpIcon />}
            label="orders today"
            value={data.todayOrders}
            tone="success"
          />
          <StatPill
            icon={<ClockIcon />}
            label="pending actions"
            value={data.pendingActions}
            tone={data.pendingActions > 5 ? 'warning' : 'default'}
          />
          <StatPill
            icon={<AlertCircleIcon />}
            label="revenue today"
            value={formatCurrency(data.todayRevenue, data.currency)}
          />
        </div>
      </div>
 
      {/* Quick Actions */}
      <div
        role="toolbar"
        aria-label="Quick actions"
        className="flex flex-wrap gap-2"
      >
        <QuickActionButton
          icon={<PlusIcon />}
          label="Create Order"
          href="/orders/new"
          tone="primary"
        />
        <QuickActionButton
          icon={<PackageIcon />}
          label="Add Product"
          href="/products/new"
        />
        <QuickActionButton
          icon={<UserPlusIcon />}
          label="Add Customer"
          href="/customers/new"
        />
        <QuickActionButton
          icon={<UsersIcon />}
          label="Invite Employee"
          href="/employees/invite"
        />
        <QuickActionButton
          icon={<BarChart3Icon />}
          label="View Reports"
          href="/reports"
        />
      </div>
    </div>
  );
}
 
