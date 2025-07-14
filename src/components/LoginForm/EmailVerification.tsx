import Button from '@components/common/Button'
import FormInput from '@components/common/FormInput'
import type { ValidationInput } from '@custom-types/auth'
import React from 'react'

interface EmailVerificationProps {
  emailValid: ValidationInput
  codeValid: ValidationInput
  isTimerActive: boolean
  timeLeft: number
  onSendCode: (event: React.MouseEvent<HTMLButtonElement>) => void
  onVerifyCode: (event: React.MouseEvent<HTMLButtonElement>) => void
  formatTime: () => string
  codeCheckClicked: boolean
  setCodeCheckClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const EmailVerification = ({
  emailValid,
  codeValid,
  isTimerActive,
  onSendCode,
  onVerifyCode,
  formatTime,
  codeCheckClicked,
  setCodeCheckClicked,
}: EmailVerificationProps) => {
  const handleCodeChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 6)
    codeValid.setValue(onlyNums)
    setCodeCheckClicked(false)
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex">
        <div className="relative w-[228px] mr-[8px]">
          <FormInput
            value={emailValid.value}
            onChange={emailValid.setValue}
            hasError={!emailValid.isValid && emailValid.value.length > 0}
            errorMessage=""
            hasSuccess={emailValid.isValid}
            successMessage=""
            type="text"
            placeholder="가입한 이메일을 입력해주세요."
            className="w-[228px] h-[48px]"
          />
        </div>
        <Button
          variant={emailValid.isValid ? 'fill' : 'outline'}
          className="w-[112px] h-[48px] p-0"
          onClick={onSendCode}
        >
          인증코드전송
        </Button>
      </div>

      <div className="flex">
        <div className="relative w-[228px] mr-[8px]">
          <FormInput
            value={codeValid.value}
            onChange={handleCodeChange}
            hasError={codeCheckClicked && !codeValid.isValid}
            errorMessage="인증코드가 일치하지 않습니다"
            hasSuccess={codeCheckClicked && codeValid.isValid}
            successMessage=""
            type="text"
            placeholder="인증코드를 입력해주세요."
            className="w-[228px] h-[48px]"
          />

          {isTimerActive && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#EC0037] pointer-events-none">
              {formatTime()}
            </span>
          )}
        </div>

        <Button
          variant={codeValid.isValid ? 'fill' : 'outline'}
          className="w-[112px] h-[48px] p-0"
          disabled={!emailValid.isValid}
          onClick={onVerifyCode}
        >
          인증코드확인
        </Button>
      </div>
    </div>
  )
}

export default EmailVerification
