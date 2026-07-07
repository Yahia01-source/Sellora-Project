/**
 * @file app/(dashboard)/dashboard/page.tsx
 * @description Sellora — Example Page Using Shell Layout Primitives
 */

'use client';

import { PageHeader } from '@/components/layout/primitives/PageHeader';
import { ContentContainer } from '@/components/layout/primitives/ContentContainer';
import { Button } from '@/components/ui/button/Button';
import { PlusIcon } from 'lucide-react';

export default function DashboardPage() {
  return (
    <ContentContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your store's performance and recent activity."
        actions={
          <Button leftIcon={<PlusIcon className="size-4" />}>
            Create Order
          </Button>
        }
      />

      {/* Mount point for future dashboard widgets */}
      <div className="mt-6 border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 text-center text-[var(--color-text-muted)] text-[14px]">
        Each cell below is an empty mount point for future widgets — the structures are ready.
      </div>
    </ContentContainer>
  );
}