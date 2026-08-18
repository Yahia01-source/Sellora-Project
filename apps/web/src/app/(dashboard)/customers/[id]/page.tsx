import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getCustomer } from '@/services/customers.service';
import { CustomerDetailsClient } from '@/components/customers/CustomerDetailsClient';

interface CustomerDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const customer = await getCustomer(token, id);

    return (
      <CustomerDetailsClient
        initialData={customer}
        token={token}
      />
    );
  } catch {
    notFound();
  }
}