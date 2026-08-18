import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { CreateCustomerClient } from '@/components/customers/CreateCustomerClient';

export default async function CreateCustomerPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <CreateCustomerClient token={token} />
  );
}