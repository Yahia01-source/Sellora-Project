'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  getCustomers,
  type Customer,
  type CustomersResponse,
} from '@/services/customers.service';

interface CustomersClientProps {
  initialData: CustomersResponse;
  token: string;
}

export function CustomersClient({
  initialData,
  token,
}: CustomersClientProps) {
  const [data, setData] =
    useState<CustomersResponse>(initialData);

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(
    initialData.meta.page,
  );

  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    setLoading(true);

    try {
      const newData = await getCustomers({
        token,
        page: 1,
        limit: 20,
        search: value,
      });

      setData(newData);
    } catch (error) {
      console.error(
        'Failed to search customers:',
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
      const newData = await getCustomers({
        token,
        page: newPage,
        limit: 20,
        search,
      });

      setPage(newPage);
      setData(newData);
    } catch (error) {
      console.error(
        'Failed to change customers page:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Customers
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage your store customers.
        </p>
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          placeholder="Search customers..."
          className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Customer
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Phone
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Email
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  City
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((customer: Customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="px-4 py-4 text-sm font-medium">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="text-[var(--color-primary)] hover:underline"
                    >
                      {customer.firstName}{' '}
                      {customer.lastName ?? ''}
                    </Link>
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {customer.phone}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {customer.email ?? '—'}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {customer.city ?? '—'}
                  </td>

                  <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                    {new Date(
                      customer.createdAt,
                    ).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="border-t border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-text-secondary)]">
            Loading customers...
          </div>
        )}

        {!loading && data.data.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-[var(--color-text-secondary)]">
            {search
              ? `No customers found for "${search}".`
              : 'No customers found.'}
          </div>
        )}

        {data.meta.totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Page {page} of {data.meta.totalPages} ·{' '}
              {data.meta.total} customers
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1 || loading}
                onClick={() =>
                  handlePageChange(page - 1)
                }
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  page === data.meta.totalPages ||
                  loading
                }
                onClick={() =>
                  handlePageChange(page + 1)
                }
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
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