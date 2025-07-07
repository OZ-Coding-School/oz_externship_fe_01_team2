import React from 'react'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import type { ValidationInput } from '../../types/auth'

interface PhoneVerificationProps {
  phoneValid: ValidationInput
  codeValid: ValidationInput
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneValid,
  codeValid,
}) => {
  const handlePhoneChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 11)
    phoneValid.setValue(onlyNums)
  }

  const handleCodeChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 6)
    codeValid.setValue(onlyNums)
  }

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex">
        <div className="w-[228px] mr-[8px]">
          <FormInput
            value={phoneValid.value}
            onChange={handlePhoneChange}
            hasError={!phoneValid.isValid && phoneValid.value.length > 0}
            errorMessage=""
            hasSuccess={phoneValid.isValid}
            successMessage=""
            type="text"
            placeholder="숫자만 입력해주세요"
            className="w-[228px] h-[48px]"
          />
        </div>
        <Button
          variant={phoneValid.isValid ? 'fill' : 'outline'}
          className="w-[112px] h-[48px] p-0"
        >
          인증번호전송
        </Button>
      </div>

      <div className="flex">
        <div className="w-[228px] mr-[8px]">
          <FormInput
            value={codeValid.value}
            onChange={handleCodeChange}
            hasError={!codeValid.isValid && codeValid.value.length > 0}
            errorMessage=""
            hasSuccess={codeValid.isValid}
            successMessage=""
            type="text"
            placeholder="인증번호 6자리를 입력해주세요"
            className="w-[228px] h-[48px]"
          />
        </div>
        <Button
          variant={codeValid.isValid ? 'fill' : 'outline'}
          className="w-[112px] h-[48px] p-0"
        >
          인증번호확인
        </Button>
      </div>
    </div>
  )
}

export default PhoneVerification
