import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function KakaoCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state') || '' // 백엔드에서 필요하면 사용

      if (!code) {
        alert('인가 코드가 없습니다.')
        return
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/login/kakao`,
          { code, state }
        )

        // ✅ 토큰 저장 예시
        localStorage.setItem('accessToken', res.data.access_token)
        localStorage.setItem('refreshToken', res.data.refresh_token)

        // ✅ 로그인 완료 후 이동
        navigate('/')
      } catch (err) {
        alert('카카오 로그인에 실패했습니다.')
        console.error(err)
        navigate('/login')
      }
    }

    fetchKakaoToken()
  }, [navigate])

  return <div>카카오 로그인 처리 중입니다...</div>
}
