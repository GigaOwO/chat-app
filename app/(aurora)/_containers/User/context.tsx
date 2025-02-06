"use client"
import { useUsers } from "@/_lib/hooks/useUsers";
import { getCurrentUser } from "aws-amplify/auth";
import { createContext, useContext, useEffect, useState } from "react";
export interface UserContextValue {
  user: UserContext | null
  isLoading: boolean
}
export interface UserContext {
  userId: string
  username: string
  mail:string;
}
const UserContext = createContext<UserContextValue | null>(null);
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { fetchUser } = useUsers()
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        const userDetails = await fetchUser(currentUser.username!)
        if (!userDetails) {
          throw new Error('User not found')
        }
        setUser({userId:currentUser.userId!, username: userDetails.username!, mail: userDetails.email!})
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading) {
      loadUser()
    }
  }, [])
  const contextValue: UserContextValue = {
    user,
    isLoading
  };
  return(
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}