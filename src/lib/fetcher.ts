import { getAccessToken } from '@store/authStore'
import axios, { type AxiosRequestConfig } from 'axios'

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
        const { useAuthStore } = await import('@store/authStore')
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

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await fetcher.get<T>(url, config)
  return response.data
}

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await fetcher.post<T>(url, data, config)
  return response.data
}

export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await fetcher.put<T>(url, data, config)
  return response.data
}

export const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await fetcher.patch<T>(url, data, config)
  return response.data
}

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await fetcher.delete<T>(url, config)
  return response.data
}

export default fetcher
