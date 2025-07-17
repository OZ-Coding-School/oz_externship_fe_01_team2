import fetcher from '@lib/fetcher'
import type {
  EmailLoginRequest,
  EmailLoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types'

const AuthApi = {
  emailLogin: async (data: EmailLoginRequest): Promise<EmailLoginResponse> => {
    const response = await fetcher.post('/auth/login/email', data)
    return response.data
  },
  refreshToken: async (
    data: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await fetcher.post('/auth/token/refresh', data)
    return response.data
  },
  logout: async (): Promise<void> => {
    await fetcher.post('/auth/logout')
  },
}

export default AuthApi
