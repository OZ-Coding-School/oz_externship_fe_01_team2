import React from 'react'
import FormInput from '../common/FormInput'
import type { ValidationInput } from '../../types/auth'

interface LoginFormInputsProps {
  idValid: ValidationInput
  pwValid: ValidationInput
}

const LoginFormInputs: React.FC<LoginFormInputsProps> = ({
  idValid,
  pwValid,
}) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <FormInput
        value={idValid.value}
        onChange={(value: string) => idValid.setValue(value)}
        placeholder="아이디 (example@gmail.com)"
        type="email"
        className="w-[348px] h-[48px]"
      />
      <FormInput
        value={pwValid.value}
        onChange={(value: string) => pwValid.setValue(value)}
        placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
        type="password"
        className="w-[348px] h-[48px]"
      />
    </div>
  )
}

export default LoginFormInputs
