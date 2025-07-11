import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, EmailLoginRequest } from '../api/auth/types'
import AuthApi from '../api/auth/api'

interface AuthState {
  // 상태
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  // 액션
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  updateAccessToken: (accessToken: string) => void
  refreshAccessToken: () => Promise<boolean>
  emailLogin: (
    data: EmailLoginRequest
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  setLoading: (loading: boolean) => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // 로그인 성공 시 모든 정보 설정
      setAuth: (user: User, accessToken: string, refreshToken: string) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      // 사용자 정보 업데이트
      setUser: (user: User) => {
        set({ user })
      },

      // 토큰 설정
      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },

      // 액세스 토큰만 업데이트 (토큰 갱신 시)
      updateAccessToken: (accessToken: string) => {
        set({ accessToken })
      },

      // 토큰 갱신
      refreshAccessToken: async (): Promise<boolean> => {
        try {
          const { refreshToken } = get()
          if (!refreshToken) return false

          const response = await AuthApi.refreshToken({ refresh: refreshToken })
          set({ accessToken: response.access })
          return true
        } catch (error) {
          console.error('토큰 갱신 실패:', error)
          // 토큰 갱신 실패 시 로그아웃 처리
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          })
          return false
        }
      },

      // 이메일 로그인
      emailLogin: async (
        data: EmailLoginRequest
      ): Promise<{ success: boolean; message?: string }> => {
        try {
          set({ isLoading: true })

          const response = await AuthApi.emailLogin(data)

          // 로그인 성공 시 사용자 정보와 토큰 저장
          set({
            user: response.user,
            accessToken: response.access,
            refreshToken: response.refresh,
            isAuthenticated: true,
            isLoading: false,
          })

          return {
            success: true,
            message: '로그인이 완료되었습니다!',
          }
        } catch (error) {
          set({ isLoading: false })

          return {
            success: false,
            message: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
          }
        }
      },

      // 로그아웃
      logout: async (): Promise<void> => {
        try {
          await AuthApi.logout()
        } catch (error) {
          console.error('로그아웃 API 호출 실패:', error)
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      // 로딩 상태 설정
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // 스토어 초기화 (앱 시작 시 호출)
      initialize: () => {
        const state = get()
        if (state.accessToken && state.refreshToken && state.user) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// 토큰 유틸리티 함수들
export const getAccessToken = () => useAuthStore.getState().accessToken
export const getRefreshToken = () => useAuthStore.getState().refreshToken
export const isAuthenticated = () => useAuthStore.getState().isAuthenticated

// 앱 시작 시 스토어 초기화
useAuthStore.getState().initialize()

/**
 * 사용법 예제:
 *
 * // 컴포넌트에서 사용
 * const { user, isAuthenticated, emailLogin, logout } = useAuthStore()
 *
 * // 로그인
 * const handleLogin = async () => {
 *   const result = await emailLogin({ email: 'user@example.com', password: 'password' })
 *   if (result.success) {
 *     // 로그인 성공 처리
 *   }
 * }
 *
 * // 로그아웃
 * const handleLogout = async () => {
 *   await logout()
 * }
 *
 * // 인증 상태 확인
 * if (isAuthenticated) {
 *   // 인증된 사용자 UI
 * }
 */
