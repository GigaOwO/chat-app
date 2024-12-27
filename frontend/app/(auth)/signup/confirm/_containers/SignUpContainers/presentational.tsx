"use client"

import { Alert, AlertDescription } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useState } from 'react'
import { confirmSignUp, resendConfirmationCode } from './actions'

type Props = {
  csrfToken?: string | null
}

export function SignUpConfirmForm({ csrfToken }: Props) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await confirmSignUp({ email, username, confirmationCode })
      if (!result.success) {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      const result = await resendConfirmationCode(email)
      if (!result.success) {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Confirm Sign Up</CardTitle>
        <CardDescription>Please enter the confirmation code sent to your email</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {csrfToken && <input type="hidden" name="csrf" value={csrfToken} />}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
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
            <Label htmlFor="confirmationCode">Confirmation Code</Label>
            <Input
              id="confirmationCode"
              type="text"
              required
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
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
            {isLoading ? 'Loading...' : 'Confirm Sign Up'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}