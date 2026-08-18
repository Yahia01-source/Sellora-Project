'use client';

import { useState } from 'react';

import {
  getOrders,
  type OrderStatus,
  type OrdersResponse,
} from '@/services/orders.service';

import Link from 'next/link';

interface OrdersClientProps {
  initialData: OrdersResponse;
  token: string;
}

const STATUS_OPTIONS: {
  value: OrderStatus;
  label: string;
}[] = [
  {
    value: 'PENDING',
    label: 'Pending',
  },
  {
    value: 'CONFIRMED',
    label: 'Confirmed',
  },
  {
    value: 'PROCESSING',
    label: 'Processing',
  },
  {
    value: 'SHIPPED',
    label: 'Shipped',
  },
  {
    value: 'DELIVERED',
    label: 'Delivered',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
  },
];

export function OrdersClient({
  initialData,
  token,
}: OrdersClientProps) {
  const [data, setData] =
    useState<OrdersResponse>(initialData);

  const [search, setSearch] = useState('');

  const [status, setStatus] =
    useState<OrderStatus | ''>('');

  const [page, setPage] = useState(
    initialData.meta.page,
  );

  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    setLoading(true);

    try {
      const newData = await getOrders({
        token,
        page: 1,
        limit: 20,
        search: value,
        status: status || undefined,
      });

      setData(newData);
    } catch (error) {
      console.error(
        'Failed to search orders:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(
    value: OrderStatus | '',
  ) {
    setStatus(value);
    setPage(1);
    setLoading(true);

    try {
      const newData = await getOrders({
        token,
        page: 1,
        limit: 20,
        search,
        status: value || undefined,
      });

      setData(newData);
    } catch (error) {
      console.error(
        'Failed to filter orders:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePageChange(
    newPage: number,
  ) {
    if (
      newPage < 1 ||
      newPage > data.meta.totalPages ||
      newPage === page
    ) {
      return;
    }

    setLoading(true);

    try {
      const newData = await getOrders({
        token,
        page: newPage,
        limit: 20,
        search,
        status: status || undefined,
      });

      setPage(newPage);
      setData(newData);
    } catch (error) {
      console.error(
        'Failed to change page:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Orders
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage your store orders.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          placeholder="Search orders..."
          className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
        />

        <select
          value={status}
          onChange={(event) =>
            handleStatusChange(
              event.target.value as OrderStatus | '',
            )
          }
          className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
        >
          <option value="">All statuses</option>

          {STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Order
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Customer
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Status
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Total
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                <td className="px-4 py-4 text-sm font-medium">
                        <Link
                              href={`/orders/${order.id}`}
                                                        className="text-[var(--color-primary)] hover:underline"
                >
                                {order.orderNumber}
                        </Link>
                </td>

                  <td className="px-4 py-4 text-sm">
                    {order.customer.firstName}{' '}
                    {order.customer.lastName ?? ''}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {order.status}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium">
                    {Number(
                      order.total,
                    ).toLocaleString('en-US')}{' '}
                    MAD
                  </td>

                  <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                    {new Date(
                      order.createdAt,
                    ).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="border-t border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-text-secondary)]">
            Loading orders...
          </div>
        )}

        {/* Empty state */}
        {!loading && data.data.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-[var(--color-text-secondary)]">
            {search || status
              ? 'No orders match the current filters.'
              : 'No orders found.'}
          </div>
        )}

        {/* Pagination */}
        {data.meta.totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Page {page} of {data.meta.totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={
                  page === 1 || loading
                }
                onClick={() =>
                  handlePageChange(page - 1)
                }
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-colors hover:bg-[var(--color-bg-muted)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  page ===
                    data.meta.totalPages ||
                  loading
                }
                onClick={() =>
                  handlePageChange(page + 1)
                }
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-colors hover:bg-[var(--color-bg-muted)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}