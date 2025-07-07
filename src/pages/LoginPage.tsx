import React, { useState } from 'react'
import Button from '../components/common/Button'
import { useInput } from '../hooks/useInput'
import { useTimer } from '../hooks/useTimer'
import { VALIDATION_REGEX, TIMER_DURATION } from '../constants/validation'
import type { ModalStep } from '../types/auth'
import LoginHeader from '../components/LoginForm/LoginHeader'
import SocialLoginButtons from '../components/LoginForm/SocialLoginButtons'
import LoginFormInputs from '../components/LoginForm/LoginFormInputs'
import FindIdModal from '../components/LoginForm/FindIdModal'
import FindPwModal from '../components/LoginForm/FindPwModal'

export default function LoginPage() {
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
  const handleFindId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!nameValid.isValid || !phoneValid.isValid || !codeValid.isValid) {
      setValidError(true)
      return
    }
    setValidError(false)
    setFindIdStep('result')
  }

  const handleSendCode = () => {
    timer.start(TIMER_DURATION)
  }

  const handleVerifyCode = () => {
    console.log('인증코드 확인 진행')
    timer.stop()
  }

  const handleFindPw = () => {
    if (emailValid.isValid && emailCodeValid.isValid) {
      setFindPwStep('result')
      timer.stop()
    }
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

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] mb-[392px] w-[348px] h-[488px]">
        <form>
          <LoginHeader />
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
            onFindId={handleFindId}
            onFindPw={handleOpenFindPw}
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
          />

          <div className="mt-[12px]">
            <Button
              variant={isFormValid ? 'fill' : 'ghost'}
              disabled={!isFormValid}
              className="w-[348px] h-[52px]"
            >
              일반회원 로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
