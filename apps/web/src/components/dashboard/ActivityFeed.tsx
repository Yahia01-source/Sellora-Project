'use client';

import React from 'react';
import {
  ShoppingCartIcon,
  PackageCheckIcon,
  RotateCcwIcon,
  UserPlusIcon,
  CreditCardIcon,
  PackagePlusIcon,
  PencilIcon,
} from 'lucide-react';

import { Widget, Skeleton } from './primitives';
import { cn } from '@/lib/utils';
import type { ActivityItem, ActivityType } from './dashboard.types';
const ACTIVITY_CONFIG: Record<
  ActivityType,
  {
    icon: React.ReactNode;
    color: string;
  }
> = {
  order_placed: {
    icon: <ShoppingCartIcon />,
    color: 'text-blue-600 bg-blue-50',
  },

  order_confirmed: {
    icon: <PackageCheckIcon />,
    color: 'text-green-600 bg-green-50',
  },

  order_delivered: {
    icon: <PackageCheckIcon />,
    color: 'text-emerald-600 bg-emerald-50',
  },

  order_returned: {
    icon: <RotateCcwIcon />,
    color: 'text-orange-600 bg-orange-50',
  },

  order_cancelled: {
    icon: <RotateCcwIcon />,
    color: 'text-red-600 bg-red-50',
  },

  customer_added: {
    icon: <UserPlusIcon />,
    color: 'text-violet-600 bg-violet-50',
  },

  payment_received: {
    icon: <CreditCardIcon />,
    color: 'text-green-600 bg-green-50',
  },

  product_added: {
    icon: <PackagePlusIcon />,
    color: 'text-sky-600 bg-sky-50',
  },

  product_updated: {
    icon: <PencilIcon />,
    color: 'text-yellow-600 bg-yellow-50',
  },
};
interface ActivityRowProps {
  activity: ActivityItem;
}

function ActivityRow({ activity }: ActivityRowProps) {
  const config = ACTIVITY_CONFIG[activity.type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 py-3',
        'border-b border-[var(--color-border)] last:border-b-0'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center size-9 rounded-full',
          '[&_svg]:size-4',
          config.color
        )}
      >
        {config.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[var(--color-text)]">
          {activity.title}
        </p>

        {activity.description && (
          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
            {activity.description}
          </p>
        )}
      </div>

      <span className="text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">
        {activity.timestamp}
      </span>
    </div>
  );
}
interface ActivityFeedProps {
  title?: string;
  activities: ActivityItem[];
  loading?: boolean;
}

export function ActivityFeed({
  title = 'Recent Activity',
  activities,
  loading,
}: ActivityFeedProps) {
  if (loading) return <ActivityFeedSkeleton />;

  if (activities.length === 0) {
    return (
      <Widget>
        <h3 className="text-[14px] font-semibold text-[var(--color-text)]">
          {title}
        </h3>

        <div className="py-8 text-center text-[13px] text-[var(--color-text-muted)]">
          No recent activity.
        </div>
      </Widget>
    );
  }

  return (
    <Widget className="flex flex-col gap-4">
      <h3 className="text-[14px] font-semibold text-[var(--color-text)]">
        {title}
      </h3>

      <div>
        {activities.map((activity) => (
          <ActivityRow
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </Widget>
  );
}
function ActivityFeedSkeleton() {
  return (
    <Widget className="flex flex-col gap-4">
      <Skeleton className="h-5 w-36" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <Skeleton className="size-9 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>

            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    </Widget>
  );
}