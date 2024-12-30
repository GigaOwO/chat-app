import { SignUpConfirmContainer } from './_containers/Confirm/container'

export default function SignUpConfirmPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <div className="container mx-auto py-8">
      <SignUpConfirmContainer userParams={searchParams} />
    </div>
  )
}