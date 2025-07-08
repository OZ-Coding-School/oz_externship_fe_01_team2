import { LockKeyhole, Check } from 'lucide-react'
import FormInput from '../FormInput'
import Button from '../Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useInput } from '../../../hooks/useInput'

interface PwSuccessProps {
  onCloseModal: () => void
}

export default function PwSuccess({ onCloseModal }: PwSuccessProps) {
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  const password = useInput((v) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/
    return regex.test(v)
  })

  const passwordCheck = useInput((v) => {
    return v === password.value && v.length > 0
  })

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (password.isValid && passwordCheck.isValid) {
      setShowPopup(true)
    }
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false)
        onCloseModal()
        navigate('/login')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showPopup, navigate])

  return (
    <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
      <div className="flex flex-col items-center gap-[5px]">
        <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] flex items-center justify-center rounded-full p-[6px]">
          <LockKeyhole />
        </div>
        <h2 className="font-bold text-[18px]">비밀번호 재설정</h2>
        <p className="text-[14px] font-normal text-[#4D4D4D]">
          신규 비밀번호를 입력해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col justify-center w-[348px] h-[143px] gap-[20px]">
          <label htmlFor="password" className="text-[16px]">
            새 비밀번호
            <span className="text-[16px] font-normal text-[#f04141]">*</span>
            <span className="ml-[16px] text-[13px] text-[#6201E0] font-semibold">
              8~15자의 영문 대소문자, 숫자, 특수문자 포함
            </span>
          </label>
          <div className="flex flex-col gap-[16px]">
            <FormInput
              value={password.value}
              onChange={(value: string) => password.setValue(value)}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              hasError={!password.isValid && password.value.length > 0}
              errorMessage="사용 불가능한 비밀번호입니다"
              hasSuccess={password.isValid}
              successMessage="사용 가능한 비밀번호입니다"
              className="w-[348px] h-[48px]"
            ></FormInput>
            <FormInput
              value={passwordCheck.value}
              onChange={(value: string) => passwordCheck.setValue(value)}
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              hasError={
                !passwordCheck.isValid && passwordCheck.value.length > 0
              }
              errorMessage="비밀번호가 일치하지 않습니다."
              hasSuccess={passwordCheck.isValid}
              successMessage="일치한 비밀번호 입니다."
              className="w-[348px] h-[48px]"
            ></FormInput>
          </div>
        </div>
      </div>

      <Button
        variant="fill"
        className="w-[348px] h-[52px]"
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
            <h3 className="text-[20px] font-bold">비밀번호 변경 완료!</h3>
            <p className="text-[14px] font-normal">
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
