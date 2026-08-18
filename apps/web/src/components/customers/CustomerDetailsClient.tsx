'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  archiveCustomer,
  type Customer,
} from '@/services/customers.service';

interface CustomerDetailsClientProps {
  initialData: Customer;
  token: string;
}

export function CustomerDetailsClient({
  initialData,
  token,
}: CustomerDetailsClientProps) {
  const router = useRouter();

  const customer = initialData;

  const [archiveLoading, setArchiveLoading] =
    useState(false);

  const [archiveError, setArchiveError] =
    useState<string | null>(null);

  const fullName = [
    customer.firstName,
    customer.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  async function handleArchive() {
    const confirmed = window.confirm(
      `Are you sure you want to archive ${fullName}?`,
    );

    if (!confirmed) {
      return;
    }

    setArchiveLoading(true);
    setArchiveError(null);

    try {
      await archiveCustomer(
        token,
        customer.id,
      );

      router.push('/customers');
    } catch (error) {
      console.error(
        'Failed to archive customer:',
        error,
      );

      setArchiveError(
        error instanceof Error
          ? error.message
          : 'Unable to archive this customer.',
      );
    } finally {
      setArchiveLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/customers"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            ← Back to customers
          </Link>

          <h1 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
            {fullName}
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Customer since{' '}
            {new Date(
              customer.createdAt,
            ).toLocaleDateString('en-US')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/customers/${customer.id}/edit`}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white"
          >
            Edit customer
          </Link>

          <button
            type="button"
            disabled={archiveLoading}
            onClick={handleArchive}
            className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-medium text-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {archiveLoading
              ? 'Archiving...'
              : 'Archive customer'}
          </button>
        </div>
      </div>

      {/* Archive error */}
      {archiveError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {archiveError}
        </div>
      )}

      {/* Customer details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Contact information */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-sm font-semibold">
              Contact information
            </h2>
          </div>

          <div className="space-y-4 px-6 py-5 text-sm">
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Name
              </p>

              <p className="mt-1 font-medium">
                {fullName}
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Phone
              </p>

              <p className="mt-1">
                {customer.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Email
              </p>

              <p className="mt-1">
                {customer.email ?? '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-sm font-semibold">
              Address
            </h2>
          </div>

          <div className="space-y-4 px-6 py-5 text-sm">
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                City
              </p>

              <p className="mt-1">
                {customer.city ?? '—'}
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Address
              </p>

              <p className="mt-1">
                {customer.address ?? '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}