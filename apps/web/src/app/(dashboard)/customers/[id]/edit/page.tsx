import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getCustomer } from '@/services/customers.service';
import { EditCustomerClient } from '@/components/customers/EditCustomerClient';

interface EditCustomerPageProps {
  params: Promise<{
    id: string; 
  }>;
}

export default async function EditCustomerPage({ params }: EditCustomerPageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const customer = await getCustomer(token, id);

    return <EditCustomerClient initialData={customer} token={token} />;
  } catch {
    notFound();
  }
}
