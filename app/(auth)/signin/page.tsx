import { headers } from 'next/headers';
import { SignInContainer } from '@/features/auth/components/signin/container';

export default async function SignInPage() {
  const headersList = await headers();
  const csrfToken = headersList.get('X-CSRF-Token');

  return (
    <div className="container mx-auto py-8">
      <SignInContainer csrfToken={csrfToken} />
    </div>
  );
}
