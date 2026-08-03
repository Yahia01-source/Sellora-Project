'use client';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { useState } from 'react';

import { BarChart3 } from 'lucide-react';

import { Widget, Skeleton } from './primitives';

import type { SalesPoint } from './dashboard.types';

import { formatCurrency } from '@/lib/format';

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    payload: SalesPoint;
  }[];
}
function CustomTooltip({
  active,
  payload,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div
      className="
        rounded-xl
        border
        border-[var(--color-border)]
        bg-white
        px-4
        py-3
        shadow-lg
      "
    >
      <p className="text-xs text-[var(--color-text-secondary)]">
        {point.label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
        {formatCurrency(point.sales)}
      </p>
    </div>
  );
}
interface SalesChartProps {
  title?: string;
  data: SalesPoint[];
  loading?: boolean;

  totalSales?: number;
  growth?: number;
}
const PERIODS = ['7D', '30D', '90D'] as const;
function SalesChartSkeleton() {
  return (
    <Widget>
      <Skeleton className="h-6 w-40 mb-6" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
      </div>

      <Skeleton className="mt-8 h-[220px] w-full rounded-lg" />
    </Widget>
  );
}
export function SalesChart({
  title = 'Sales Overview',
  data,
  loading,
  totalSales = 0,
  growth = 0,
}: SalesChartProps) {
  const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');


  if (loading) return <SalesChartSkeleton />;
  if (data.length === 0) {
  return (
    <Widget>
      <div className="flex h-[320px] flex-col items-center justify-center text-center">
<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-muted)]">
  <BarChart3
    className="h-8 w-8 text-[var(--color-text-secondary)]"
  />
</div>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          No sales data yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
          Sales data will appear here once your store starts receiving orders.
        </p>
      </div>
    </Widget>
  );
}

  return (
    <Widget>
      <div className="mb-6 flex items-center justify-between">
  <div>
    <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
      {title}
    </h3>

    <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
      Sales during the last 7 days
    </p>
  </div>

<div className="flex gap-2">
  {PERIODS.map((item) => (
    <button
      key={item}
      onClick={() => setPeriod(item)}
      className={`
        rounded-lg
        px-3
        py-2
        text-sm
        transition-colors
        ${
          period === item
            ? 'bg-[var(--color-primary)] text-white'
            : 'border border-[var(--color-border)] hover:bg-[var(--color-bg-muted)]'
        }
      `}
    >
      {item}
    </button>
  ))}
</div></div>
<div className="mb-6 flex items-end justify-between">

  <div>
    <p className="text-3xl font-bold text-[var(--color-text)]">
{formatCurrency(totalSales)}    </p>

    <p className="mt-1 text-sm text-[var(--color-success)]">
      ↑ {growth}%
    </p>
  </div>

</div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
  <LineChart data={data}>
<CartesianGrid
  stroke="var(--color-border)"
  strokeDasharray="4 4"
  vertical={false}
/>
<XAxis
  dataKey="label"
  tickLine={false}
  axisLine={false}
  tick={{
    fontSize: 12,
    fill: 'var(--color-text-secondary)',
  }}
/>
<YAxis
  tickLine={false}
  axisLine={false}
  tick={{
    fontSize: 12,
    fill: 'var(--color-text-secondary)',
  }}
/>
    <Tooltip
  content={<CustomTooltip />}
  cursor={{
  stroke: 'var(--color-primary)',
  strokeDasharray: '4 4',
}}
/>

<Line
  type="monotone"
  dataKey="sales"
  stroke="var(--color-primary)"
  strokeWidth={3}
  dot={false}
  activeDot={{
    r: 6,
    strokeWidth: 2,
    fill: 'white',
  }}
  animationDuration={800}
/>  </LineChart>
</ResponsiveContainer>
      </div>
    </Widget>
  );
}