import { getAccessToken } from '@store/authStore'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`

const fetcher = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

fetcher.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    const local_Token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (import.meta.env.DEV && local_Token) {
      config.headers.Authorization = `Bearer ${local_Token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

fetcher.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 동적 import로 순환 참조 방지
        const { useAuthStore } = await import('../store/authStore')
        const { refreshAccessToken } = useAuthStore.getState()

        const success = await refreshAccessToken()
        if (success) {
          // 새로운 토큰으로 원래 요청 재시도
          const newToken = getAccessToken()
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return fetcher(originalRequest)
        }
      } catch (refreshError) {
        // eslint-disable-next-line no-console
        console.error('토큰 갱신 실패:', refreshError)
      }
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export const get = <T>(url: string, config?: object): Promise<T> => {
  return fetcher.get(url, config)
}

export const post = <T>(
  url: string,
  data?: unknown,
  config?: object
): Promise<T> => {
  return fetcher.post(url, data, config)
}

export const put = <T>(
  url: string,
  data?: unknown,
  config?: object
): Promise<T> => {
  return fetcher.put(url, data, config)
}

export const del = <T>(url: string, config?: object): Promise<T> => {
  return fetcher.delete(url, config)
}

export default fetcher
