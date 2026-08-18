'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { KpiTrend } from '../dashboard.types';

// --- WIDGET ----------------------------------------------------------------

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Widget({ className, children, ...props }: WidgetProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
        'bg-[var(--color-bg-surface)] p-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// --- SKELETON --------------------------------------------------------------

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-sm)] bg-[var(--color-bg-muted)]',
        className,
      )}
      {...props}
    />
  );
}

// --- TREND BADGE -----------------------------------------------------------

interface TrendBadgeProps {
  trend: KpiTrend;
  value: number;
  label?: string;
  size?: 'sm' | 'md';
}

const TREND_CLASSES: Record<KpiTrend, string> = {
  up: 'text-[var(--color-success)] bg-[var(--color-success-subtle)]',
  down: 'text-[var(--color-danger)] bg-[var(--color-danger-subtle)]',
  neutral: 'text-[var(--color-text-muted)] bg-[var(--color-bg-muted)]',
};

const TREND_ARROW: Record<KpiTrend, string> = {
  up: '?',
  down: '?',
  neutral: '?',
};

export function TrendBadge({ trend, value, label, size = 'md' }: TrendBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-sm)] font-medium',
        TREND_CLASSES[trend],
        size === 'sm' ? 'text-[11px] px-1.5 py-0.5' : 'text-[13px] px-2 py-1',
      )}
    >
      <span aria-hidden="true">{TREND_ARROW[trend]}</span>
      <span>{Math.abs(value)}%</span>
      {label && <span className="text-[var(--color-text-muted)] font-normal">{label}</span>}
    </span>
  );
}

// --- SPARKLINE -------------------------------------------------------------

interface SparklineProps {
  data: number[];
  trend?: KpiTrend;
  width?: number;
  height?: number;
}

const SPARKLINE_STROKE: Record<KpiTrend, string> = {
  up: 'stroke-[var(--color-success)]',
  down: 'stroke-[var(--color-danger)]',
  neutral: 'stroke-[var(--color-text-muted)]',
};

export function Sparkline({ data, trend = 'neutral', width = 64, height = 28 }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={points}
        className={cn('fill-none', SPARKLINE_STROKE[trend])}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
