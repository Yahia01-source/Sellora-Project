import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getOrder } from '@/services/orders.service';
import { OrderDetailsClient } from '@/components/orders/OrderDetailsClient';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const order = await getOrder(token, id);

    return (
      <OrderDetailsClient
        initialData={order}
        token={token}
      />
    );
  } catch {
    notFound();
  }
}