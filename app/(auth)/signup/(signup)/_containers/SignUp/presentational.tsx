"use client"

import { Alert, AlertDescription } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from 'aws-amplify/auth'

type Props = {
  csrfToken?: string | null
}

export function SignUpForm({ csrfToken }: Props) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)
    
    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            preferred_username: username,  // これがLambdaトリガーでusernameとして使用される
          },
        }
      })

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        // 確認コード入力画面へ遷移
        const userParams = new URLSearchParams({
          email
        })
        router.push(`/signup/confirm?${userParams.toString()}`)
      }
    } catch (err: unknown) {
      console.error('Error during sign up:', err)
      if (err instanceof Error && err.message.includes('Username already exists')) {
        setError('このメールアドレスは既に登録されています')
      } else {
        setError(err instanceof Error ? err.message : 'サインアップに失敗しました')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {csrfToken && <input type="hidden" name="csrf" value={csrfToken} />}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">UserID</Label>
            <Input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="パスワードは8文字以上で、大文字・小文字・数字・特殊文字を含む必要があります"
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
            {isLoading ? '処理中...' : 'サインアップ'}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => router.push('/signin')}
          >
            すでにアカウントをお持ちですか？ サインイン
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}