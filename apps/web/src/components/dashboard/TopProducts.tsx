'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Widget, Skeleton } from './primitives';
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
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            'size-9 shrink-0 rounded-[var(--radius-md)] overflow-hidden',
            'bg-[var(--color-bg-muted)]',
          )}
        >
          {product.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="size-full object-cover"
            />
          )}
        </div>
        <span className="text-[13px] font-medium text-[var(--color-text)] truncate">
          {product.name}
        </span>
      </div>

      <span className="text-[13px] text-[var(--color-text-secondary)] tabular-nums text-right">
        {product.unitsSold}
      </span>

      <div className="flex flex-col items-end gap-1 min-w-[92px]">
        <span className="text-[13px] font-semibold text-[var(--color-text)] tabular-nums">
          {product.currency} {product.revenue.toLocaleString()}
        </span>
        <div className="w-full h-1 rounded-full bg-[var(--color-bg-muted)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--color-primary)]"
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