'use client';

import React from 'react';
import { Widget, Skeleton } from './primitives';
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
            className="border-b border-[var(--color-border)] last:border-0"
        >
        <td className="py-4">
            {order.orderNumber}
        </td>

        <td>
            {order.customerName}
        </td>

<td>
<StatusBadge status={order.status} />
</td><td className="text-[13px] text-[var(--color-text-secondary)]">
    {formatOrderDate(order.createdAt)}
</td>
        <td className="text-right font-medium">
            {order.currency} {order.totalAmount}
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
function formatOrderDate(date: string) {
  const today = new Date();
  const orderDate = new Date(date);

  const diff =
    Math.floor(
      (today.getTime() - orderDate.getTime()) /
      (1000 * 60 * 60 * 24),
    );

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';

  return orderDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
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