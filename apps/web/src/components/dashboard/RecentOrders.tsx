'use client';

import React from 'react';
import { Widget, Skeleton } from './primitives';
import { formatCurrency, formatOrderDate } from '@/lib/format';
import type { RecentOrder } from './dashboard.types';
import { StatusBadge } from './StatusBadge';

interface RecentOrdersProps {
  title?: string;
  orders: RecentOrder[];
  loading?: boolean;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
}

export function RecentOrders({
  title = 'Recent Orders',
  orders,
  loading,
  headerAction,
  footerAction,
}: RecentOrdersProps) {
  if (loading) return <RecentOrdersSkeleton />;
  if (orders.length === 0) {
  return (
    <Widget>
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          No recent orders.
        </p>
      </div>
    </Widget>
  );
}

  return (
    <Widget className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">
          {title}
        </h3>

        {headerAction}
      </div>

<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-[var(--color-border)] text-left">
        <th className="pb-3 text-xs font-medium text-[var(--color-text-muted)]">
          Order
        </th>

        <th className="pb-3 text-xs font-medium text-[var(--color-text-muted)]">
          Customer
        </th>

        <th className="pb-3 text-xs font-medium text-[var(--color-text-muted)]">
            Status
        </th>
        <th className="pb-3 text-xs font-medium text-[var(--color-text-muted)]">
            Date
        </th>

        <th className="pb-3 text-xs font-medium text-[var(--color-text-muted)] text-right">
            Total
        </th>
    </tr>
    </thead>

    <tbody>
        {orders.map((order) => (
<tr
  key={order.id}
  className="
    border-b
    border-[var(--color-border)]
    last:border-0
    transition-colors
    duration-200
    hover:bg-[var(--color-bg-muted)]
    cursor-pointer
  "
>
<td className="py-4">
  <span className="font-medium text-[var(--color-text)]">
    {order.orderNumber}
  </span>
</td>
<td>
  <div className="flex items-center gap-3">
    <div className="flex size-8 items-center justify-center rounded-full bg-[var(--color-bg-muted)] text-xs font-semibold text-[var(--color-text-secondary)]">
      {order.customerName.charAt(0).toUpperCase()}
    </div>

    <span className="text-[13px] font-medium text-[var(--color-text)]">
      {order.customerName}
    </span>
  </div>
</td>
<td>
<StatusBadge status={order.status} />
</td><td className="text-[13px] text-[var(--color-text-secondary)]">
    {formatOrderDate(order.createdAt)}
</td>
        <td className="text-right font-medium">
           {formatCurrency(order.totalAmount, order.currency)}
        </td>
        </tr>
    ))}
    </tbody>
  </table>
</div>
      {footerAction}
    </Widget>
  );
}

function RecentOrdersSkeleton() {
  return (
    <Widget className="flex flex-col gap-4">
      <Skeleton className="h-5 w-40" />

      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </Widget>
  );
}