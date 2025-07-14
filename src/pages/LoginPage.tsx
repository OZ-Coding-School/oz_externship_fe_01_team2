import React, { useState } from 'react'
import Button from '../components/common/Button'
import { useInput } from '../hooks/useInput'
import { useTimer } from '../hooks/useTimer'
import { VALIDATION_REGEX, TIMER_DURATION } from '../constants/validation'
import type { ModalStep } from '../types/auth'
import AuthHeader from '../components/LoginForm/AuthHeader'
import SocialLoginButtons from '../components/LoginForm/SocialLoginButtons'
import LoginFormInputs from '../components/LoginForm/LoginFormInputs'
import FindIdModal from '../components/LoginForm/FindIdModal'
import FindPwModal from '../components/LoginForm/FindPwModal'
import { useContext } from 'react'
import { ToastContext } from '../components/common/Toast/ToastContext'
import WithdrawnAccountModal from '../components/LoginForm/WithdrawnAccountModal'
import RecoverAccountModal from '../components/LoginForm/RecoverAccountModal'

export default function LoginPage() {
  const toastCtx = useContext(ToastContext)
  const [codeCheckClicked, setCodeCheckClicked] = useState(false)
  const [modalType, setModalType] = useState<'withdrawn' | 'recover' | null>(
    null
  )

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

  const handleSendCode = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    timer.start(TIMER_DURATION)

    toastCtx?.show({
      message: '전송 완료! 이메일을 확인해주세요.',
      type: 'success',
    })
  }

  const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    timer.stop()
    setCodeCheckClicked(true)

    if (codeValid.isValid) {
      toastCtx?.show({ message: '인증이 완료되었습니다!', type: 'success' })
    }
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
          />

          <div className="mt-[12px]">
            <Button
              variant={isFormValid ? 'fill' : 'ghost'}
              disabled={!isFormValid}
              className="w-[348px] h-[52px]"
              onClick={(e) => {
                e.preventDefault()
                if (idValid.value === 'deleted@example.com') {
                  setModalType('withdrawn') // ← 모달 상태 설정
                } else {
                  console.log('로그인 성공')
                }
              }}
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
          />
        )}
      </div>
    </div>
  )
}
