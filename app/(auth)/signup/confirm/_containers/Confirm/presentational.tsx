'use client'

import { Alert, AlertDescription } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { SignUpConfirmFormProps } from '@/(auth)/_types'

export function SignUpConfirmForm({ csrfToken, email }: SignUpConfirmFormProps) {
  const router = useRouter()
  const [confirmationCode, setConfirmationCode] = useState('')
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)
    
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode
      })

      if (isSignUpComplete) {
        // 確認完了後、サインイン画面へ遷移
        router.push('/signin')
      }
    } catch (err: Error | unknown) {
      console.error('確認エラー:', err)
      
      if (err instanceof Error && err.message?.includes('Invalid verification code')) {
        setError('確認コードが正しくありません')
      } else if (err instanceof Error && err.message?.includes('Confirmation code has expired')) {
        setError('確認コードの有効期限が切れています。新しいコードを送信してください')
      } else {
        setError(err instanceof Error ? err.message : '確認に失敗しました')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError(undefined)
    
    try {
      await resendSignUpCode({
        username: email
      })
      setConfirmationCode('')  // 入力フィールドをクリア
    } catch (err) {
      console.error('コード再送信エラー:', err)
      setError(err instanceof Error ? err.message : '確認コードの再送信に失敗しました')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>メールアドレスの確認</CardTitle>
        <CardDescription>
          確認コードを{email}に送信しました
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {csrfToken && <input type="hidden" name="csrf" value={csrfToken} />}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirmationCode">確認コード</Label>
            <Input
              id="confirmationCode"
              type="text"
              required
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="text-center text-xl tracking-widest"
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-gray-500">
            確認コードが届かない場合や期限切れの場合は、以下のボタンから再送信できます。
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '確認中...' : '確認する'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? '送信中...' : '確認コードを再送信'}
          </Button>

          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => router.push('/signup')}
          >
            アカウント作成からやり直す
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}