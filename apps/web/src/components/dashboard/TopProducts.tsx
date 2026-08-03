'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Widget, Skeleton } from './primitives';
import { formatCurrency, formatNumber } from '@/lib/format';

import type { TopProduct } from './dashboard.types';

// ─── TOP PRODUCTS ───────────────────────────────────────────────────────────

interface TopProductsProps {
  title?: string;
  products: TopProduct[];
  loading?: boolean;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
}

export function TopProducts({
  title = 'Top Products',
  products,
  loading,
  headerAction,
  footerAction,
}: TopProductsProps) {
  if (loading) return <TopProductsSkeleton />;
if (products.length === 0) {
  return (
    <Widget>
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          No products yet.
        </p>
      </div>
    </Widget>
  );
}
  const maxRevenue = Math.max(...products.map((p) => p.revenue), 1);

  return (
    <Widget className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[14px] font-semibold text-[var(--color-text)]">{title}</h3>
        {headerAction}
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
        <span>Product</span>
        <span className="text-right">Sold</span>
        <span className="text-right">Revenue</span>
      </div>

      <div className="flex flex-col divide-y divide-[var(--color-border)]">
        {products.map((product) => (
          <TopProductRow key={product.id} product={product} maxRevenue={maxRevenue} />
        ))}
      </div>

      {footerAction}
    </Widget>
  );
}

// ─── ROW ────────────────────────────────────────────────────────────────────

interface TopProductRowProps {
  product: TopProduct;
  maxRevenue: number;
}

function TopProductRow({ product, maxRevenue }: TopProductRowProps) {
  const barWidth = Math.max((product.revenue / maxRevenue) * 100, 4);

  return (
<div
  className="
    grid
    grid-cols-[1fr_auto_auto]
    items-center
    gap-x-4
    rounded-xl
    py-3
    px-2
    transition-colors
    duration-200
    hover:bg-[var(--color-bg-muted)]
  "
>
<div className="flex items-center gap-3 min-w-0">
<div
  className={cn(
    'flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)]',
    'bg-[var(--color-bg-muted)] text-sm font-semibold text-[var(--color-text-secondary)]',
  )}
>
  {product.imageUrl ? (
    <img
      src={product.imageUrl}
      alt={product.name}
      className="size-full object-cover"
    />
  ) : (
    product.name.charAt(0).toUpperCase()
  )}
</div>
<div className="min-w-0">
  <p className="truncate text-[13px] font-medium text-[var(--color-text)]">
    {product.name}
  </p>

  <div className="mt-1 flex items-center gap-2">
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[11px] font-medium',
        product.trend === 'up'
          ? 'bg-green-100 text-green-700'
          : product.trend === 'down'
          ? 'bg-red-100 text-red-700'
          : 'bg-gray-100 text-gray-600'
      )}
    >
      {product.trend === 'up' ? '↑' : product.trend === 'down' ? '↓' : '•'}{' '}
      {product.trendPercent}%
    </span>
  </div>
</div>      </div>

      <span className="text-[13px] text-[var(--color-text-secondary)] tabular-nums text-right">
  {formatNumber(product.unitsSold)}      </span>

      <div className="flex flex-col items-end gap-1 min-w-[92px]">
        <span className="text-[13px] font-semibold text-[var(--color-text)] tabular-nums">
          {formatCurrency(product.revenue, product.currency)}
        </span>
        <div className="w-full h-1 rounded-full bg-[var(--color-bg-muted)] overflow-hidden">
<div
  className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── SKELETON ───────────────────────────────────────────────────────────────

function TopProductsSkeleton() {
  return (
    <Widget className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-[var(--radius-md)]" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </Widget>
  );
}