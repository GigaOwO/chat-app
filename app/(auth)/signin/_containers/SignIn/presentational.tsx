"use client"

import { Alert, AlertDescription } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'aws-amplify/auth'

type Props = {
  csrfToken?: string | null
}

export function SignInForm({ csrfToken }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      })

      if (isSignedIn) {
        router.push('/dm')
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        const userParams = new URLSearchParams({
          email,
        })
        router.push(`/signup/confirm?${userParams.toString()}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>サインイン</CardTitle>
        <CardDescription>アカウントにサインインしてください</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {csrfToken && <input type="hidden" name="csrf" value={csrfToken} />}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'サインイン中...' : 'サインイン'}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => router.push('/signup')}
          >
            アカウントをお持ちでない方はこちら
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}