import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getCustomers } from '@/services/customers.service';
import { getProducts } from '@/services/products.service';

import { CreateOrderClient } from '@/components/orders/CreateOrderClient';

export default async function CreateOrderPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const [customersResponse, products] =
    await Promise.all([
      getCustomers({
        token,
        page: 1,
        limit: 100,
      }),
      getProducts({
        token,
        page: 1,
        limit: 100,
      }),
    ]);

  return (
    <CreateOrderClient
      customers={customersResponse.data}
      products={products}
      token={token}
    />
  );
}