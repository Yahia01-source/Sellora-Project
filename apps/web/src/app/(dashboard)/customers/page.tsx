import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getCustomers } from '@/services/customers.service';
import { CustomersClient } from '@/components/customers/CustomersClient';

export default async function CustomersPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const data = await getCustomers({
    token,
    page: 1,
    limit: 20,
  });

  return (
    <CustomersClient
      initialData={data}
      token={token}
    />
  );
}