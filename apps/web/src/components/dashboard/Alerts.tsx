'use client';

import React from 'react';
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
  ChevronRightIcon,
} from 'lucide-react';

import { Widget, Skeleton } from './primitives';
import { cn } from '@/lib/utils';
import type { AlertItem, AlertVariant } from './dashboard.types';
const ALERT_CONFIG: Record<
  AlertVariant,
  {
    icon: React.ReactNode;
    className: string;
  }
> = {
  warning: {
    icon: <AlertTriangleIcon className="size-4" />,
    className: 'text-amber-600 bg-amber-50',
  },

  success: {
    icon: <CheckCircleIcon className="size-4" />,
    className: 'text-emerald-600 bg-emerald-50',
  },

  danger: {
    icon: <XCircleIcon className="size-4" />,
    className: 'text-red-600 bg-red-50',
  },

  info: {
    icon: <InfoIcon className="size-4" />,
    className: 'text-sky-600 bg-sky-50',
  },
};
interface AlertRowProps {
  alert: AlertItem;
}

function AlertRow({ alert }: AlertRowProps) {
  const config = ALERT_CONFIG[alert.variant];

  return (
    <a
      href={alert.href ?? '#'}
      className={cn(
        'flex items-start gap-3 rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)] p-3',
        'transition-colors duration-[var(--duration-fast)]',
        'hover:bg-[var(--color-bg-subtle)]'
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          config.className
        )}
      >
        {config.icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[var(--color-text)]">
          {alert.title}
        </p>

        <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
          {alert.description}
        </p>
      </div>

      <ChevronRightIcon
        className="size-4 text-[var(--color-text-muted)]"
      />
    </a>
  );
}
interface AlertsProps {
  title?: string;
  alerts: AlertItem[];
  loading?: boolean;
}

export function Alerts({
  title = 'Alerts',
  alerts,
  loading,
}: AlertsProps) {
  if (loading) return <AlertsSkeleton />;

  if (alerts.length === 0) {
    return (
      <Widget>
        <h3 className="text-[14px] font-semibold text-[var(--color-text)]">
          {title}
        </h3>

        <div className="py-8 text-center text-[13px] text-[var(--color-text-muted)]">
          No alerts.
        </div>
      </Widget>
    );
  }

  return (
    <Widget className="flex flex-col gap-4">
      <h3 className="text-[14px] font-semibold text-[var(--color-text)]">
        {title}
      </h3>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertRow
            key={alert.id}
            alert={alert}
          />
        ))}
      </div>
    </Widget>
  );
}
function AlertsSkeleton() {
  return (
    <Widget className="flex flex-col gap-4">
      <Skeleton className="h-5 w-24" />

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <Skeleton className="size-9 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-full" />
            </div>

            <Skeleton className="size-4" />
          </div>
        ))}
      </div>
    </Widget>
  );
}