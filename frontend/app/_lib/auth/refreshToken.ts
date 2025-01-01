import { RefreshTokenResponse } from '@/(auth)/_types'
import { graphqlClient } from '../graphql/client'
import { REFRESH_TOKEN } from '../graphql/mutations/auth'

export async function refreshTokens() {
  try {
    const response = await graphqlClient.request<RefreshTokenResponse>(REFRESH_TOKEN)
    return response.refreshToken.success
  } catch (error) {
    console.error('Token refresh failed:', error)
    return false
  }
}