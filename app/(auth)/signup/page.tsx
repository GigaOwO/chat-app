import { headers } from 'next/headers';
import { SignUpContainer } from '@/features/auth/components/signup/container';

export default async function SignUpPage() {
  const headersList = await headers();
  const csrfToken = headersList.get('X-CSRF-Token');

  return (
    <div className="container mx-auto py-8">
      <SignUpContainer csrfToken={csrfToken} />
    </div>
  );
}
