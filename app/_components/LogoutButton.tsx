'use client'

import { Button } from '@/_components/ui/button'
import { setCookieUseCase } from '@/_lib/cookie/setCookieUseCase'
import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await setCookieUseCase({name: 'profileId', value: '', maxAge: 0})
      await signOut()
      router.push('/signin')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleSignOut}
      disabled={isLoading}
      variant="ghost"
    >
      {isLoading ? 'ログアウト中...' : 'ログアウト'}
    </Button>
  )
}