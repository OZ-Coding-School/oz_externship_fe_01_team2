import Button from '@components/common/Button'
import FormInput from '@components/common/FormInput'
import type { ValidationInput } from '@custom-types/auth'
import { useToast } from '@hooks/useToast'
import axios from 'axios'
import React, { useState } from 'react'

interface PhoneVerificationProps {
  phoneValid: ValidationInput
  codeValid: ValidationInput
  onResetError: () => void
  onVerifySuccess: () => void
  onVerifyFail: () => void
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneValid,
  codeValid,
  onResetError,
  onVerifySuccess,
  onVerifyFail,
}) => {
  const toast = useToast()
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [sendClicked, setSendClicked] = useState(false)
  const [verifyClicked, setVerifyClicked] = useState(false)
  const handleVerifyCode = async () => {
    if (!phoneValid.isValid || !codeValid.isValid || verifyClicked) return

    try {
      setVerifying(true)
      await axios.post(
        'http://13.124.239.91/api/v1/auth/find/email/phone/verify/',
        {
          phone: phoneValid.value,
          code: codeValid.value,
        }
      )
      toast.show({ type: 'success', message: '인증이 완료되었습니다.' })
      setVerifyClicked(true)
      onVerifySuccess()
    } catch (err) {
      toast.show({
        type: 'error',
        message: '인증번호가 올바르지 않거나 만료되었습니다.',
      })
      onVerifyFail()
    } finally {
      setVerifying(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 11)
    phoneValid.setValue(onlyNums)
    onResetError()
  }

  const handleCodeChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 6)
    codeValid.setValue(onlyNums)
    onResetError()
  }
  const handleSendCode = async () => {
    if (!phoneValid.isValid || sendClicked) return

    try {
      setSending(true)
      await axios.post(
        'http://13.124.239.91/api/v1/auth/find/email/phone/send/',
        {
          phone: phoneValid.value,
        }
      )
      toast.show({ type: 'success', message: '인증번호가 발송되었습니다.' })
      setSendClicked(true)
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        toast.show({
          type: 'error',
          message: '인증번호 전송에 실패했습니다.',
        })
      }
    } finally {
      setSending(false)
    }
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
          type="button"
          onClick={handleSendCode}
          variant={
            sendClicked ? 'ghost' : phoneValid.isValid ? 'fill' : 'outline'
          }
          className="w-[112px] h-[48px] p-0"
          disabled={sending || !phoneValid.isValid || sendClicked}
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
          type="button"
          onClick={handleVerifyCode}
          variant={
            verifyClicked ? 'ghost' : codeValid.isValid ? 'fill' : 'outline'
          }
          className="w-[112px] h-[48px] p-0"
          disabled={verifying || !codeValid.isValid || verifyClicked}
        >
          인증번호확인
        </Button>
      </div>
    </div>
  )
}

export default PhoneVerification
