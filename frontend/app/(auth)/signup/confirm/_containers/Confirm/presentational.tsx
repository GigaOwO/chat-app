'use client'

import { Alert, AlertDescription } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { confirmSignUp, resendSignUpCode, signIn } from 'aws-amplify/auth'
import { SignUpConfirmFormProps } from '@/(auth)/_types'
import { generateClient } from 'aws-amplify/api'
import { CreateUsersInput, CreateUsersMutation } from '@/_lib/graphql/API'
import * as mutations from '@/_lib/graphql/mutations'

const client = generateClient()

export function SignUpConfirmForm({ csrfToken, email, username }: SignUpConfirmFormProps) {
  const router = useRouter()
  const [confirmationCode, setConfirmationCode] = useState('')
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const now = new Date().toISOString()
      const input: CreateUsersInput = {
        username,
        email,
        createdAt: now,
        updatedAt: now
      }
      await client.graphql({
        query: mutations.createUsers,
        variables: {
          input
        }
      }) as { data: CreateUsersMutation }
      
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode
      })

      if (!isSignUpComplete) {
        // 4. Cleanup if Cognito confirmation fails
        await client.graphql({
          query: mutations.deleteUsers,
          variables: {
            input: { username }
          }
        })
        throw new Error("Signup confirmation failed")
      }

      router.push('/signin')
    } catch (err) {
      console.error('Error during confirmation:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await resendSignUpCode({
        username: email
      })
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
        <CardDescription>Enter the confirmation code sent to {email}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {csrfToken && <input type="hidden" name="csrf" value={csrfToken} />}
        <CardContent className="space-y-4">
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