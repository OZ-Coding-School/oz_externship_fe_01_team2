import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import PwSuccess from '@components/common/Popup/PwSuccess'
import EmailVerification from '@components/LoginForm/EmailVerification'
import type { ModalStep, ValidationInput } from '@custom-types/auth'
import { LockKeyhole } from 'lucide-react'
import React, { useEffect } from 'react'

interface FindPwModalProps {
  isOpen: boolean
  onClose: () => void
  step: ModalStep
  emailValid: ValidationInput
  codeValid: ValidationInput
  isTimerActive: boolean
  timeLeft: number
  onVerifyCode: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFindPw: () => void
  formatTime: () => string
  codeCheckClicked: boolean
  setCodeCheckClicked: React.Dispatch<React.SetStateAction<boolean>>
  onSendCode: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FindPwModal = ({
  isOpen,
  onClose,
  step,
  emailValid,
  codeValid,
  isTimerActive,
  timeLeft,
  formatTime,
  onVerifyCode,
  onFindPw,
  codeCheckClicked,
  setCodeCheckClicked,
  onSendCode,
}: FindPwModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      emailValid.setValue('')
      codeValid.setValue('')
      setCodeCheckClicked(false)
    }
  }, [isOpen, emailValid, codeValid, setCodeCheckClicked])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 'form' ? (
        <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
          <div className="flex flex-col items-center">
            <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] p-[6px] flex items-center justify-center rounded-full">
              <LockKeyhole />
            </div>
            <h2 className="mt-[13px] font-semibold text-[20px]">
              비밀번호 찾기
            </h2>
            <p className="mt-[10px] text-[14px] text-[#4D4D4D] font-normal">
              이메일로 비밀번호 재설정 링크를 보내드려요.
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            <label htmlFor="email" className="text-[16px] font-normal">
              이메일<span className="text-[#f04141]">*</span>
            </label>
            <EmailVerification
              emailValid={emailValid}
              codeValid={codeValid}
              isTimerActive={isTimerActive}
              timeLeft={timeLeft}
              onSendCode={onSendCode}
              onVerifyCode={onVerifyCode}
              formatTime={formatTime}
              codeCheckClicked={codeCheckClicked}
              setCodeCheckClicked={setCodeCheckClicked}
            />
          </div>

          <Button
            variant="fill"
            className="w-[348px] h-[52px]"
            onClick={onFindPw}
          >
            비밀번호 찾기
          </Button>
        </div>
      ) : (
        <PwSuccess onClose={onClose} />
      )}
    </Modal>
  )
}

export default FindPwModal
