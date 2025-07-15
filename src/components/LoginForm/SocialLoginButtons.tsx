import { useToast } from '@hooks/useToast'
import axios from 'axios'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface SocialLoginButtonsProps {
  className?: string
}

type SocialProvider = 'kakao' | 'naver'

const SocialLoginButtons = ({ className }: SocialLoginButtonsProps) => {
  const navigate = useNavigate()
  const toast = useToast()
  const isLoginProcessing = useRef(false)

  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID
  const naverRedirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI
  const naverState = 'naverLoginState' // CSRF 방지용

  const handleKakaoLogin = useCallback(() => {
    if (!kakaoClientId || !kakaoRedirectUri) {
      toast.show({
        message: '카카오 로그인 설정이 올바르지 않습니다.',
        type: 'error',
      })
      return
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
      kakaoRedirectUri
    )}&response_type=code`
    window.location.href = kakaoAuthUrl
  }, [kakaoClientId, kakaoRedirectUri])

  const handleNaverLogin = useCallback(() => {
    if (!naverClientId || !naverRedirectUri) {
      toast.show({
        message: '네이버 로그인 설정이 올바르지 않습니다.',
        type: 'error',
      })
      return
    }

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${encodeURIComponent(
      naverRedirectUri
    )}&state=${naverState}`
    window.location.href = naverAuthUrl
  }, [naverClientId, naverRedirectUri])

  const loginWithSocial = useCallback(
    async (
      _provider: SocialProvider,
      endpoint: string,
      code: string,
      state?: string
    ) => {
      if (isLoginProcessing.current) return

      isLoginProcessing.current = true

      try {
        const payload = state ? { code, state } : { code }
        const res = await axios.post(endpoint, payload)

        if (res.data?.token) {
          localStorage.setItem('token', res.data.token)
          toast.show({ message: '로그인 성공!', type: 'success' })
          navigate('/')
        } else {
          throw new Error('토큰을 받지 못했습니다.')
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          toast.show({
            message:
              error.response.data?.message ||
              '로그인 처리 중 오류가 발생했습니다.',
            type: 'error',
          })
        } else {
          toast.show({
            message: '로그인 처리 중 알 수 없는 오류가 발생했습니다.',
            type: 'error',
          })
        }
        navigate('/login')
      } finally {
        isLoginProcessing.current = false
      }
    },
    [navigate]
  )

  const handleSocialCallback = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const path = window.location.pathname

    if (!code) return

    if (path === '/auth/callback/kakao') {
      loginWithSocial('kakao', '/api/v1/auth/login/kakao', code)
    } else if (path === '/auth/callback/naver') {
      if (state !== naverState) {
        toast.show({ message: '잘못된 요청입니다.', type: 'error' })
        navigate('/login')
        return
      }
      loginWithSocial('naver', '/api/v1/auth/login/naver', code, state)
    }
  }, [loginWithSocial, naverState, navigate])

  useEffect(() => {
    handleSocialCallback()
  }, [handleSocialCallback])

  return (
    <div className="flex flex-col gap-[12px] mb-[40px]">
      {/* 카카오 로그인 버튼 */}
      <button
        type="button"
        onClick={handleKakaoLogin}
        className={`w-[348px] h-[52px] flex items-center justify-center gap-[4px] bg-[#FEE500] text-black font-normal rounded-[4px] cursor-pointer ${className || ''}`}
      >
        <svg className="w-[16px] h-[14px]" viewBox="0 0 14 12" fill="none">
          <path
            d="M6.99533 0C3.39972 0 0.5 2.31659 0.5 5.12896C0.5 6.95447 1.70628 8.55295 3.51571 9.46564L2.90328 11.7499C2.89174 11.7841 2.88997 11.8209 2.89816 11.856C2.90636 11.8912 2.92419 11.9235 2.94969 11.9491C2.98685 11.9818 3.03468 11.9999 3.08423 12C3.12532 11.9968 3.1643 11.9805 3.19557 11.9537L5.83084 10.1792C6.21984 10.2328 6.61196 10.2606 7.00469 10.2626C10.5957 10.2626 13.5 7.94599 13.5 5.12896C13.5 2.31196 10.5863 0 6.99533 0Z"
            fill="#392020"
          />
        </svg>
        카카오 간편 로그인 / 가입
      </button>

      {/* 네이버 로그인 버튼 */}
      <button
        type="button"
        onClick={handleNaverLogin}
        className={`w-[348px] h-[52px] flex items-center justify-center gap-[4px] bg-[#03C75A] text-white font-normal rounded-[4px] cursor-pointer ${className || ''}`}
      >
        <svg className="w-[20px] h-[21px]" viewBox="0 0 24 24" fill="none">
          <path
            d="M5.015 18.4h4.765v-6.457L14.21 18.4h4.78V5.6h-4.765v6.458L9.78 5.6H5.015v12.8z"
            fill="white"
          />
        </svg>
        네이버 간편 로그인 / 가입
      </button>
    </div>
  )
}

export default SocialLoginButtons
