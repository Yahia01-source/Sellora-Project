'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  confirmOrder,
  cancelOrder,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from '@/services/orders.service';

interface OrderDetailsClientProps {
  initialData: Order;
  token: string;
}

export function OrderDetailsClient({
  initialData,
  token,
}: OrderDetailsClientProps) {
  const [order, setOrder] = useState<Order>(initialData);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const customerName = [
    order.customer.firstName,
    order.customer.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  async function handleConfirm() {
    setActionLoading(true);
    setActionError(null);

    try {
      const updatedOrder = await confirmOrder(
        token,
        order.id,
      );

      setOrder(updatedOrder);
    } catch (error) {
      console.error(
        'Failed to confirm order:',
        error,
      );

      setActionError(
        'Unable to confirm this order. Please try again.',
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancel() {
    setActionLoading(true);
    setActionError(null);

    try {
      const updatedOrder = await cancelOrder(
        token,
        order.id,
      );

      setOrder(updatedOrder);
    } catch (error) {
      console.error(
        'Failed to cancel order:',
        error,
      );

      setActionError(
        'Unable to cancel this order. Please try again.',
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleStatusChange(
    newStatus: OrderStatus,
  ) {
    setActionLoading(true);
    setActionError(null);

    try {
      const updatedOrder =
        await updateOrderStatus(
          token,
          order.id,
          newStatus,
        );

      setOrder(updatedOrder);
    } catch (error) {
      console.error(
        'Failed to update order status:',
        error,
      );

      setActionError(
        'Unable to update the order status. Please try again.',
      );
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/orders"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            ← Back to orders
          </Link>

          <h1 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
            Order {order.orderNumber}
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Created{' '}
            {new Date(
              order.createdAt,
            ).toLocaleDateString('en-US')}
          </p>
        </div>

        {/* Actions + status */}
        <div className="flex items-center gap-3">
          {order.status === 'PENDING' && (
            <>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleConfirm}
                className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading
                  ? 'Processing...'
                  : 'Confirm order'}
              </button>

              <button
                type="button"
                disabled={actionLoading}
                onClick={handleCancel}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          )}

          {order.status === 'CONFIRMED' && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={() =>
                handleStatusChange('PROCESSING')
              }
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? 'Processing...'
                : 'Start processing'}
            </button>
          )}

          {order.status === 'PROCESSING' && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={() =>
                handleStatusChange('SHIPPED')
              }
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? 'Processing...'
                : 'Mark as shipped'}
            </button>
          )}

          {order.status === 'SHIPPED' && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={() =>
                handleStatusChange('DELIVERED')
              }
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? 'Processing...'
                : 'Mark as delivered'}
            </button>
          )}

          <span className="rounded-full border px-3 py-1 text-sm font-medium">
            {order.status}
          </span>
        </div>
      </div>

      {/* Action error */}
      {actionError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Customer */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-6 py-4">
              <h2 className="text-sm font-semibold">
                Customer
              </h2>
            </div>

            <div className="space-y-2 px-6 py-5 text-sm">
              <p className="font-medium">
                {customerName}
              </p>

              <p className="text-[var(--color-text-secondary)]">
                {order.customer.phone}
              </p>

              {order.customer.email && (
                <p className="text-[var(--color-text-secondary)]">
                  {order.customer.email}
                </p>
              )}

              {order.customer.city && (
                <p className="text-[var(--color-text-secondary)]">
                  {order.customer.city}
                </p>
              )}

              {order.customer.address && (
                <p className="text-[var(--color-text-secondary)]">
                  {order.customer.address}
                </p>
              )}
            </div>
          </div>

          {/* Order items */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-6 py-4">
              <h2 className="text-sm font-semibold">
                Order items
              </h2>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      Qty: {item.quantity}
                    </p>

                    {item.product.sku && (
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        SKU: {item.product.sku}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">
                      {Number(
                        item.total,
                      ).toLocaleString('en-US')}{' '}
                      MAD
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {Number(
                        item.unitPrice,
                      ).toLocaleString('en-US')}{' '}
                      × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-sm font-semibold">
              Summary
            </h2>
          </div>

          <div className="space-y-4 px-6 py-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[var(--color-text-secondary)]">
                Subtotal
              </span>

              <span className="font-medium">
                {Number(
                  order.subtotal,
                ).toLocaleString('en-US')}{' '}
                MAD
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[var(--color-text-secondary)]">
                Shipping
              </span>

              <span className="font-medium">
                {Number(
                  order.shipping,
                ).toLocaleString('en-US')}{' '}
                MAD
              </span>
            </div>

            <div className="border-t border-[var(--color-border)] pt-4">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-lg font-bold">
                  {Number(
                    order.total,
                  ).toLocaleString('en-US')}{' '}
                  MAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}