'use client';

import { Widget } from './primitives';
import { formatCurrency } from '@/lib/format';
import type { RevenueSummaryItem } from './dashboard.types';

interface RevenueSummaryProps {
  data: RevenueSummaryItem[];
  loading?: boolean;
}

export function RevenueSummary({
  data,
  loading = false,
}: RevenueSummaryProps) {
  return (
    <Widget>
      <div className="space-y-6">

        <div>
          <h3 className="text-lg font-semibold">
            Revenue Summary
          </h3>

          <p className="text-sm text-muted-foreground">
            Revenue breakdown
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 rounded bg-gray-100" />
            <div className="h-4 rounded bg-gray-100" />
            <div className="h-4 rounded bg-gray-100" />
            <div className="h-4 rounded bg-gray-100" />
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <span className="text-sm text-gray-600">
                  {item.label}
                </span>

                <span className="font-semibold">
                  {formatCurrency(item.value, 'MAD')}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </Widget>
  );
}