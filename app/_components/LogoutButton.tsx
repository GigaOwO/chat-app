'use client'

import { Button } from '@/_components/ui/button'
import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
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