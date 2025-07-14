// src/pages/PasswordChangeForm.tsx

import Button from '@components/common/Button/Button'
import FormInput from '@components/common/FormInput/FormInput'
import { useCallback, useState } from 'react'
// import { cn } from '@utils/cn' // cn 유틸리티가 필요하면 주석 해제하고 사용

const ChangePasswordForm = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // 비밀번호 유효성 검사 함수
  const validatePassword = useCallback((pw: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/

    if (pw === '') {
      setPasswordError('')
      setIsPasswordValid(false)
      return false
    } else if (!passwordRegex.test(pw)) {
      setPasswordError('영문, 숫자, 특수기호 조합 8-16자')
      setIsPasswordValid(false)
      return false
    } else {
      setPasswordError('')
      setIsPasswordValid(true)
      return true
    }
  }, [])

  // 비밀번호 확인 유효성 검사 함수
  const validateConfirmPassword = useCallback(
    (confirmPw: string, pw: string): boolean => {
      if (confirmPw === '') {
        setConfirmPasswordError('')
        setIsConfirmPasswordValid(false)
        return false
      } else if (confirmPw !== pw) {
        setConfirmPasswordError('비밀번호가 일치하지 않습니다.')
        setIsConfirmPasswordValid(false)
        return false
      } else {
        setConfirmPasswordError('')
        setIsConfirmPasswordValid(true)
        return true
      }
    },
    []
  )

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value)
      validatePassword(value)

      if (confirmPassword !== '') {
        validateConfirmPassword(confirmPassword, value)
      } else {
        setConfirmPasswordError('')
        setIsConfirmPasswordValid(false)
      }
      setSuccessMessage('')
    },
    [validatePassword, validateConfirmPassword, confirmPassword]
  )

  // 비밀번호 확인 입력 변경 핸들러
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setConfirmPassword(value)
      validateConfirmPassword(value, password)
      setSuccessMessage('')
    },
    [validateConfirmPassword, password]
  )

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isPwValidOnSubmit = validatePassword(password)
    const isConfirmPwValidOnSubmit = validateConfirmPassword(
      confirmPassword,
      password
    )

    if (isPwValidOnSubmit && isConfirmPwValidOnSubmit) {
      // console.log('비밀번호 변경 시도:', password)
      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!')
      setPassword('')
      setConfirmPassword('')
      setIsPasswordValid(false)
      setIsConfirmPasswordValid(false)
    } else {
      setSuccessMessage('')
    }
  }

  const isButtonDisabled = !isPasswordValid || !isConfirmPasswordValid

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[744px] border border-[#d1d1d1] px-11 py-[52px] rounded-[8px] flex flex-col gap-10 bg-white mb-20"
    >
      {/* 입력 라인 1 */}
      <div className="flex items-start gap-4">
        <label className="w-[150px] pt-3 text-[16px] font-normal leading-[140%] tracking-[-0.03em] text-gray-primary whitespace-nowrap">
          새 비밀번호
        </label>
        <FormInput
          type="password"
          placeholder="영문, 숫자, 특수기호 조합 8-16자"
          value={password}
          onChange={handlePasswordChange}
          hasError={!!passwordError}
          errorMessage={passwordError}
          hasSuccess={password !== '' && isPasswordValid && !passwordError}
          className="flex-1" // FormInput이 남은 공간을 차지하도록 flex-1 유지
        />
      </div>

      {/* 입력 라인 2 */}
      <div className="flex items-start gap-4">
        <label className="w-[120px] pt-3 text-[16px] font-normal leading-[140%] tracking-[-0.03em] text-gray-primary whitespace-nowrap">
          새 비밀번호 확인
        </label>
        <FormInput
          type="password"
          placeholder="새 비밀번호를 한 번 더 입력해주세요."
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          hasError={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
          hasSuccess={
            confirmPassword !== '' &&
            isConfirmPasswordValid &&
            !confirmPasswordError &&
            isPasswordValid
          }
          className="flex-1" // FormInput이 남은 공간을 차지하도록 flex-1 유지
        />
      </div>

      {/* 성공 메시지 */}
      {successMessage && (
        <p className="text-green-600 text-base mt-2 ml-[136px]">
          {successMessage}
        </p>
      )}

      {/* 버튼 */}
      <div className="flex justify-end">
        <Button disabled={isButtonDisabled}>변경하기</Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
