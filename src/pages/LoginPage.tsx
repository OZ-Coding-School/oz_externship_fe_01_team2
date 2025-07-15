import Button from '@components/common/Button'
import AuthHeader from '@components/LoginForm/AuthHeader'
import FindIdModal from '@components/LoginForm/FindIdModal'
import FindPwModal from '@components/LoginForm/FindPwModal'
import LoginFormInputs from '@components/LoginForm/LoginFormInputs'
import RecoverAccountModal from '@components/LoginForm/RecoverAccountModal'
import SocialLoginButtons from '@components/LoginForm/SocialLoginButtons'
import WithdrawnAccountModal from '@components/LoginForm/WithdrawnAccountModal'
import { TIMER_DURATION, VALIDATION_REGEX } from '@constants/validation'
import type { ModalStep } from '@custom-types/auth'
import { useInput } from '@hooks/useInput'
import { useTimer } from '@hooks/useTimer'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@store/authStore'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function LoginPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [codeCheckClicked, setCodeCheckClicked] = useState(false)
  const [modalType, setModalType] = useState<'withdrawn' | 'recover' | null>(
    null
  )
  const [isCodeVerified, setIsCodeVerified] = useState(false)

  const { emailLogin } = useAuthStore()
  // 폼 validation hooks
  const nameValid = useInput(
    (v) => VALIDATION_REGEX.KOREAN_NAME.test(v) && v.trim() !== ''
  )
  const phoneValid = useInput((v) => VALIDATION_REGEX.PHONE.test(v))
  const codeValid = useInput((v) => VALIDATION_REGEX.CODE.test(v))
  const idValid = useInput((v) => VALIDATION_REGEX.EMAIL.test(v))
  const pwValid = useInput((v) => VALIDATION_REGEX.PASSWORD.test(v))
  const emailValid = useInput((v) => VALIDATION_REGEX.EMAIL.test(v))
  const emailCodeValid = useInput((v) => VALIDATION_REGEX.CODE.test(v))

  // 타이머 hook
  const timer = useTimer()

  // 모달 상태
  const [isFindIdOpen, setIsFindIdOpen] = useState(false)
  const [isFindPwOpen, setIsFindPwOpen] = useState(false)
  const [findIdStep, setFindIdStep] = useState<ModalStep>('form')
  const [findPwStep, setFindPwStep] = useState<ModalStep>('form')
  const [validError, setValidError] = useState(false)

  // 폼 유효성 검증
  const isFormValid = idValid.value.length > 0 && pwValid.value.length > 0

  // 이벤트 핸들러
  const handleFindId = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (!nameValid.isValid || !phoneValid.isValid || !codeValid.isValid) {
      setValidError(true)
      return
    }
    setValidError(false)
    setFindIdStep('result')
  }

  const handleSendCode = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/account/send-reset-code/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailValid.value }),
        }
      )

      if (!res.ok) {
        throw new Error('이메일 전송에 실패했습니다.')
      }

      toast.show({
        message: '인증 코드가 이메일로 전송되었습니다.',
        type: 'success',
      })

      timer.start(TIMER_DURATION)
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        toast.show({
          message: error.message,
          type: 'error',
        })
      }
    }
  }

  const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    timer.stop()
    setCodeCheckClicked(true)

    if (!emailValid.isValid || !emailCodeValid.isValid) {
      toast.show({
        message: '올바른 인증코드를 입력해주세요.',
        type: 'error',
      })
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/account/verify-code/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailValid.value,
            code: emailCodeValid.value,
          }),
        }
      )

      if (!res.ok) {
        throw new Error('인증코드 확인에 실패했습니다.')
      }

      toast.show({ message: '인증이 완료되었습니다!', type: 'success' })
      setIsCodeVerified(true)
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        toast.show({ message: '인증에 실패했습니다.', type: 'error' })
      } else {
        toast.show({
          message: '알 수 없는 오류가 발생했습니다.',
          type: 'error',
        })
      }
      setIsCodeVerified(false)
    }
  }

  const handleFindPw = () => {
    setCodeCheckClicked(true)
    if (!emailValid.isValid) {
      toast.show({
        message: '올바른 이메일을 입력해주세요.',
        type: 'error',
      })
      return
    }

    if (!isCodeVerified) {
      toast.show({
        message: '인증코드 확인이 필요합니다.',
        type: 'error',
      })
      return
    }

    setFindPwStep('result')
    timer.stop()
  }

  const handleOpenFindPw = () => {
    setIsFindIdOpen(false)
    setFindIdStep('form')
    setIsFindPwOpen(true)
  }

  const handleCloseFindId = () => {
    setIsFindIdOpen(false)
    setFindIdStep('form')
  }

  const handleCloseFindPw = () => {
    setIsFindPwOpen(false)
    setFindPwStep('form')
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await emailLogin({
        email: idValid.value,
        password: pwValid.value,
      })
      if (result.success) {
        toast.show({ message: '로그인 성공!', type: 'success' })
        navigate('/')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string; statusCode: number }>(error)) {
        toast.show({
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          type: 'error',
        })
      } else {
        toast.show({
          message: '알 수 없는 오류가 발생했습니다.',
          type: 'error',
        })
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] mb-[392px] w-[348px] h-[488px]">
        <form onSubmit={handleLogin}>
          <AuthHeader
            message="아직 회원이 아니신가요?"
            linkText="회원가입하기"
            linkTo="/signup"
          />
          <SocialLoginButtons />
          <LoginFormInputs idValid={idValid} pwValid={pwValid} />

          <div>
            <button
              type="button"
              onClick={() => setIsFindIdOpen(true)}
              className="py-[8px] text-sm underline-none text-gray-600 font-normal"
            >
              아이디 찾기
            </button>
            <span className="px-[8px] py-[8px] text-gray-600 font-normal">
              {' '}
              |{' '}
            </span>
            <button
              type="button"
              onClick={() => setIsFindPwOpen(true)}
              className="py-[8px] text-sm no-underline text-gray-600 font-normal"
            >
              비밀번호 찾기
            </button>
          </div>

          <FindIdModal
            isOpen={isFindIdOpen}
            onClose={handleCloseFindId}
            step={findIdStep}
            nameValid={nameValid}
            phoneValid={phoneValid}
            codeValid={codeValid}
            validError={validError}
            setValidError={setValidError}
            onFindId={handleFindId}
            onFindPw={handleOpenFindPw}
            onResetError={() => setValidError(false)}
          />

          <FindPwModal
            isOpen={isFindPwOpen}
            onClose={handleCloseFindPw}
            step={findPwStep}
            emailValid={emailValid}
            codeValid={emailCodeValid}
            isTimerActive={timer.isActive}
            timeLeft={timer.timeLeft}
            onSendCode={handleSendCode}
            onVerifyCode={handleVerifyCode}
            onFindPw={handleFindPw}
            formatTime={timer.formatTime}
            codeCheckClicked={codeCheckClicked}
            setCodeCheckClicked={setCodeCheckClicked}
            isCodeVerified={isCodeVerified}
            setIsCodeVerified={setIsCodeVerified}
          />

          <div className="mt-[12px]">
            <Button
              type="submit"
              variant={isFormValid ? 'fill' : 'ghost'}
              disabled={!isFormValid}
              className="w-[348px] h-[52px]"
              // onClick={handleLogin}
            >
              일반회원 로그인
            </Button>
          </div>
        </form>
        {modalType === 'withdrawn' && (
          <WithdrawnAccountModal
            isOpen
            onClose={() => setModalType(null)}
            onRecoverClick={() => {
              // 모달 전환 보장
              setTimeout(() => setModalType('recover'), 0)
            }}
          />
        )}

        {modalType === 'recover' && (
          <RecoverAccountModal
            isOpen
            onClose={() => setModalType(null)}
            step={findPwStep}
            emailValid={emailValid}
            codeValid={emailCodeValid}
            isTimerActive={timer.isActive}
            timeLeft={timer.timeLeft}
            onSendCode={handleSendCode}
            onVerifyCode={handleVerifyCode}
            onFindPw={handleFindPw}
            formatTime={timer.formatTime}
            codeCheckClicked={codeCheckClicked}
            setCodeCheckClicked={setCodeCheckClicked}
            isCodeVerified={isCodeVerified}
            setIsCodeVerified={setIsCodeVerified}
          />
        )}
      </div>
    </div>
  )
}
