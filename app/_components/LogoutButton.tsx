'use client'

import { Button } from '@/_components/ui/button'
import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCookie } from '@/_lib/hooks/useCookie'

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setCookie } = useCookie()

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
      
      await setCookie({ 
        name: 'profileId', 
        value: '', 
        maxAge: 0 
      })
      
      router.push('/signin')
    } catch (error) {
      console.error('Error signing out:', error)
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
      {isLoading ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}