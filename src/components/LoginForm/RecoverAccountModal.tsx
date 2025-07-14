import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import EmailVerification from '@components/LoginForm/EmailVerification'
import type { ModalStep, ValidationInput } from '@custom-types/auth'
import { Check, RotateCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface RecoverAccountModalProps {
  isOpen: boolean
  onClose: () => void
  step: ModalStep
  emailValid: ValidationInput
  codeValid: ValidationInput
  isTimerActive: boolean
  timeLeft: number
  onSendCode: (event: React.MouseEvent<HTMLButtonElement>) => void
  onVerifyCode: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFindPw: () => void
  formatTime: () => string
  codeCheckClicked: boolean
  setCodeCheckClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const RecoverAccountModal = ({
  isOpen,
  onClose,
  emailValid,
  codeValid,
  isTimerActive,
  timeLeft,
  onSendCode,
  onVerifyCode,
  formatTime,
  codeCheckClicked,
  setCodeCheckClicked,
}: RecoverAccountModalProps) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (emailValid.isValid && codeValid.isValid) {
      setShowPopup(true)
    }
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false)
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showPopup, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
        <div className="flex flex-col items-center mt-[10px]">
          <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] p-[6px] flex items-center justify-center rounded-full">
            <RotateCcw />
          </div>
          <h2 className="mt-[13px] font-semibold text-[20px]">
            계정 다시 사용하기
          </h2>
          <p className="mt-[10px] text-[14px] text-[#4D4D4D] font-normal">
            입력하신 이메일로 인증코드를 보내드릴게요.
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
          className="w-[348px] h-[52px] font-normal"
          onClick={handleConfirm}
        >
          확인
        </Button>
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-[12px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[396px] text-center shadow-md flex flex-col items-center gap-[16px]">
              <div className="text-[#FAFAFA] bg-[#14C786] w-[28px] h-[28px] flex items-center justify-center rounded-full p-1">
                <Check />
              </div>
              <h3 className="text-[20px] font-bold">계정 복구 완료!</h3>
              <p className="text-[14px] font-normal">
                지금 바로 로그인해 보세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default RecoverAccountModal
