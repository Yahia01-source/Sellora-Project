import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getOrders } from '@/services/orders.service';
import { OrdersClient } from '@/components/orders/OrdersClient';

export default async function OrdersPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const data = await getOrders({
    token,
    page: 1,
    limit: 20,
  });

  return (
    <OrdersClient
      initialData={data}
      token={token}
    />
  );
  
}