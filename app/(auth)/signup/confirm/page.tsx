import { SignUpConfirmContainer } from './_containers/Confirm/container'

export default async function SignUpConfirmPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  return (
    <div className="container mx-auto py-8">
      <SignUpConfirmContainer searchParams={params} />
    </div>
  )
}
