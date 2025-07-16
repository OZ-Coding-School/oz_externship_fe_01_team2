import { useToast } from '@hooks/useToast'
import fetcher from '@lib/fetcher'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NaverCallbackPage() {
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const fetchNaverToken = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state') || '' // 백엔드에서 필요하면 사용

      if (!code) {
        alert('인가 코드가 없습니다.')
        return
      }

      try {
        const res = await fetcher.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/login/naver`,
          { code, state }
        )

        localStorage.setItem('accessToken', res.data.access_token)
        localStorage.setItem('refreshToken', res.data.refresh_token)

        navigate('/')
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.show({
            message:
              error.response?.data?.message || '네이버 로그인에 실패했습니다.',
            type: 'error',
          })
        } else if (error instanceof Error) {
          toast.show({
            message: error.message || '네이버 로그인에 실패했습니다.',
            type: 'error',
          })
          alert('네이버 로그인에 실패했습니다.')
        }
        navigate('/login')
      }
    }

    fetchNaverToken()
  }, [navigate])

  return <div>네이버 로그인 처리 중입니다...</div>
}
