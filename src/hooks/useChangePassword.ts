import { useState } from 'react'

export function useChangePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // 비밀번호 정규식 (영문, 숫자, 특수문자 8~16자)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_]).{8,16}$/

  // 비밀번호 유효성 검사
  const passwordValidation = {
    isValid: passwordRegex.test(password),
    error:
      password === ''
        ? ''
        : passwordRegex.test(password)
          ? ''
          : '영문, 숫자, 특수기호 조합 8-16자여야 합니다.',
  }

  // 비밀번호 확인 유효성 검사
  const confirmPasswordValidation = {
    isValid: confirmPassword === password,
    error:
      confirmPassword === ''
        ? ''
        : confirmPassword === password
          ? ''
          : '비밀번호가 일치하지 않습니다.',
  }

  const isFormValid =
    passwordValidation.isValid && confirmPasswordValidation.isValid

  const resetForm = () => {
    setPassword('')
    setConfirmPassword('')
  }

  return {
    password,
    confirmPassword,
    successMessage,
    isFormValid,
    passwordValidation,
    confirmPasswordValidation,
    setPassword, // 추가
    setConfirmPassword, // 추가
    setSuccessMessage,
    resetForm,
  }
}
