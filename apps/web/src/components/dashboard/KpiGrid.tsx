'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Widget, Sparkline, TrendBadge, Skeleton } from './primitives';
import type { KpiCardData, KpiTone } from './dashboard.types';

// ─── TONE CLASSES ─────────────────────────────────────────────────────────────
 
const TONE_ICON_CLASSES: Record<KpiTone, string> = {
  default: 'bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)]',
  success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)]',
  danger:  'bg-[var(--color-danger-subtle)] text-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)]',
  info:    'bg-[var(--color-info-subtle)] text-[var(--color-info)]',
};
 
// ─── KPI CARD ────────────────────────────────────────────────────────────────
 
interface KpiCardProps {
  data: KpiCardData;
  loading?: boolean;
}
 
export function KpiCard({ data, loading }: KpiCardProps) {
  if (loading) return <KpiCardSkeleton />;
 
  const tone = data.tone ?? 'default';
 
  return (
    <Widget
      aria-label={`${data.label}: ${data.displayValue}`}
      className="flex flex-col gap-3 hover:shadow-[var(--shadow-md)] transition-shadow duration-[var(--duration-normal)]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.05em] truncate">
            {data.label}
          </p>
        </div>
        {data.icon && (
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center size-8 rounded-[var(--radius-md)] shrink-0',
              '[&_svg]:size-4',
              TONE_ICON_CLASSES[tone],
            )}
          >
            {data.icon}
          </div>
        )}
      </div>
 
      {/* Value */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            {data.isCurrency && (
              <span className="text-[13px] text-[var(--color-text-muted)] font-medium">
                {data.currency ?? 'MAD'}
              </span>
            )}
            <span className="text-[26px] font-bold text-[var(--color-text)] leading-none tabular-nums">
              {data.displayValue}
            </span>
          </div>
        </div>
 
        {data.sparkline && data.sparkline.length > 1 && (
          <div className="shrink-0 pb-0.5">
            <Sparkline data={data.sparkline} trend={data.trend} />
          </div>
        )}
      </div>
 
      {/* Trend */}
      {data.change !== undefined && data.trend && (
        <TrendBadge trend={data.trend} value={data.change} label={data.trendLabel} size="sm" />
      )}
    </Widget>
  );
}
 
// ─── KPI SKELETON ─────────────────────────────────────────────────────────────
 
function KpiCardSkeleton() {
  return (
    <Widget className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="size-8 rounded-[var(--radius-md)]" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-5 w-20" />
    </Widget>
  );
}
 
// ─── KPI GRID ────────────────────────────────────────────────────────────────
 
type KpiGridItem = KpiCardData | { id: string };

interface KpiGridProps {
  kpis: KpiCardData[];
  loading?: boolean;
}
 
export function KpiGrid({ kpis, loading }: KpiGridProps) {
  const items = loading
    ? Array.from({ length: 10 }, (_, i) => ({ id: `skeleton-${i}` } as KpiCardData))
    : kpis;
 
  return (
    <section aria-label="Key performance indicators">
      <div
        className={cn(
          'grid gap-3',
          'grid-cols-2',
          'sm:grid-cols-3',
          'lg:grid-cols-4',
          'xl:grid-cols-5',
        )}
      >
        {items.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} loading={loading} />
        ))}
      </div>
    </section>
  );
}
 