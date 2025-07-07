import React from 'react'
import { UserRound } from 'lucide-react'
import Modal from '../common/Modal'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import IdSuccess from '../common/Popup/IdSuccess'
import PhoneVerification from './PhoneVerification'
import type { ValidationInput, ModalStep } from '../../types/auth'

interface FindIdModalProps {
  isOpen: boolean
  onClose: () => void
  step: ModalStep
  nameValid: ValidationInput
  phoneValid: ValidationInput
  codeValid: ValidationInput
  validError: boolean
  onFindId: (e: React.MouseEvent<HTMLButtonElement>) => void
  onFindPw: () => void
}

const FindIdModal: React.FC<FindIdModalProps> = ({
  isOpen,
  onClose,
  step,
  nameValid,
  phoneValid,
  codeValid,
  validError,
  onFindId,
  onFindPw,
}) => {
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
              onChange={nameValid.setValue}
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
            <PhoneVerification phoneValid={phoneValid} codeValid={codeValid} />
          </div>

          <Button
            variant="fill"
            className="w-[348px] h-[52px]"
            onClick={onFindId}
          >
            아이디 찾기
          </Button>
        </div>
      ) : (
        <IdSuccess
          email="example@gmail.com"
          onFindPw={onFindPw}
          onClose={onClose}
        />
      )}
    </Modal>
  )
}

export default FindIdModal
