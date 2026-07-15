'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  function getStatusClasses() {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700';

      case 'pending':
        return 'bg-amber-100 text-amber-700';

      case 'delivered':
        return 'bg-blue-100 text-blue-700';

      case 'shipped':
        return 'bg-sky-100 text-sky-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        getStatusClasses(),
      )}
    >
      {status}
    </span>
  );
}