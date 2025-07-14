import Button from '@components/common/Button'
import FormInput from '@components/common/FormInput'
import Modal from '@components/common/Modal'
import IdSuccess from '@components/common/Popup/IdSuccess'
import PhoneVerification from '@components/LoginForm/PhoneVerification'
import type { ModalStep, ValidationInput } from '@custom-types/auth'
import { useToast } from '@hooks/useToast'
import React, { useState, useEffect } from 'react'
import { UserRound } from 'lucide-react'

interface FindIdModalProps {
  isOpen: boolean
  onClose: () => void
  step: ModalStep
  nameValid: ValidationInput
  phoneValid: ValidationInput
  codeValid: ValidationInput
  validError: boolean
  setValidError: React.Dispatch<React.SetStateAction<boolean>>
  onFindId: (e: React.MouseEvent<HTMLButtonElement>) => void
  onFindPw: () => void
  onResetError: () => void
}

const FindIdModal: React.FC<FindIdModalProps> = ({
  isOpen,
  onClose,
  step,
  nameValid,
  phoneValid,
  codeValid,
  validError,
  setValidError,
  onFindId,
  onFindPw,
  onResetError,
}) => {
  const [foundEmail, setFoundEmail] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifyFailed, setIsVerifyFailed] = useState(false)
  const toast = useToast()
  const handleFindIdClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // 🔴 이름/전화 유효성 검사 먼저
    if (!nameValid.isValid || !phoneValid.isValid || !codeValid.isValid) {
      setValidError(true)
      return
    }

    // 유효성 검사 통과했으므로 validError는 false로 초기화
    setValidError(false)

    // 🟡 인증번호 실패 시
    if (isVerifyFailed) {
      toast.show({
        type: 'error',
        message: '인증번호 확인에 실패했습니다. 다시 시도해주세요.',
      })
      return
    }

    // 🟢 인증 완료되지 않음
    if (!isVerified) {
      toast.show({
        type: 'error',
        message: '인증을 완료해주세요.',
      })
      return
    }

    try {
      // ✅ 여기서 API 요청
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/account/find-email/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameValid.value,
            phone_number: phoneValid.value,
          }),
        }
      )

      if (!res.ok) {
        throw new Error('이메일을 찾을 수 없습니다.')
      }

      const data = await res.json()
      setFoundEmail(data.email) // 이메일 저장
      onFindId(e) // 외부에서 step을 'result'로 바꿔주는 함수
    } catch (err: any) {
      toast.show({
        type: 'error',
        message: err.message || '오류가 발생했습니다.',
      })
    }
  }

  useEffect(() => {
    if (!isOpen) {
      nameValid.setValue('')
      phoneValid.setValue('')
      codeValid.setValue('')
      setIsVerified(false)
      setIsVerifyFailed(false)
      setValidError(false)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 'form' ? (
        <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
          <div className="flex flex-col items-center">
            <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] flex items-center justify-center rounded-full p-1">
              <UserRound />
            </div>
            <h2 className="mt-[13px] font-semibold text-[18px]">아이디 찾기</h2>
            {validError && (
              <div className="text-[14px] text-[rgba(236,0,55,1)] mt-2 text-center">
                입력한 이름과 휴대폰 번호로 등록된 <br /> 이메일이 존재하지
                않습니다.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[20px]">
            <label htmlFor="name" className="text-sm">
              이름<span className="text-[#f04141]">*</span>
            </label>
            <FormInput
              value={nameValid.value}
              onChange={(v) => {
                nameValid.setValue(v)
                onResetError()
              }}
              type="text"
              hasError={!nameValid.isValid && nameValid.value.length > 0}
              errorMessage=""
              hasSuccess={nameValid.isValid}
              successMessage=""
              placeholder="이름을 입력해주세요"
              className="w-[348px] h-[48px]"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <label htmlFor="phone" className="text-sm">
              휴대전화<span className="text-[#f04141]">*</span>
            </label>
            <PhoneVerification
              phoneValid={phoneValid}
              codeValid={codeValid}
              onResetError={onResetError}
              onVerifySuccess={() => {
                setIsVerified(true)
                setIsVerifyFailed(false) // ✅ 성공 시 실패 상태 초기화
              }}
              onVerifyFail={() => {
                setIsVerified(false)
                setIsVerifyFailed(true) // ✅ 실패 상태로 전환
              }}
            />
          </div>

          <Button
            variant="fill"
            className="w-[348px] h-[52px]"
            onClick={handleFindIdClick}
          >
            아이디 찾기
          </Button>
        </div>
      ) : (
        <IdSuccess email={foundEmail} onFindPw={onFindPw} onClose={onClose} />
      )}
    </Modal>
  )
}

export default FindIdModal
