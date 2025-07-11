import { useState } from 'react'
import { useChangePassword } from '../../hooks/useChangePassword'
import FormInput from '../common/FormInput/FormInput'
import Button from '../common/Button/Button'
import AccountFindApi from '../../api/account-find/api'

const ChangePasswordForm = () => {
  const {
    password,
    confirmPassword,
    successMessage,
    isFormValid,
    passwordValidation,
    confirmPasswordValidation,
    setPassword,
    setConfirmPassword,
    setSuccessMessage,
    resetForm,
  } = useChangePassword()

  const userEmail = 'user@example.com' // 실제로는 props나 상태에서 받아야 함
  const [loading, setLoading] = useState(false)

  // FormInput의 onChange는 string 인자 받으므로, 여기서 setState 호출
  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoading(true)
    try {
      await AccountFindApi.changePassword({
        email: userEmail,
        new_password: password,
        new_password_confirm: confirmPassword,
      })

      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!')
      resetForm()
    } catch (error) {
      console.error('비밀번호 변경 실패:', error)
      alert('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[744px] border border-[#d1d1d1] px-11 py-[52px] rounded"
    >
      {/* 새 비밀번호 */}
      <div className="flex items-start gap-4 mb-4">
        <label className="w-[150px] pt-3 text-[16px] font-normal">
          새 비밀번호
        </label>
        <FormInput
          type="password"
          placeholder="영문, 숫자, 특수기호 조합 8-16자"
          value={password}
          onChange={handlePasswordChange}
          hasError={!!passwordValidation.error}
          errorMessage={passwordValidation.error}
          hasSuccess={password !== '' && passwordValidation.isValid}
          className="flex-1"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex items-start gap-4 mb-4">
        <label className="w-[150px] pt-3 text-[16px] font-normal">
          새 비밀번호 확인
        </label>
        <FormInput
          type="password"
          placeholder="새 비밀번호를 한 번 더 입력해주세요."
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          hasError={!!confirmPasswordValidation.error}
          errorMessage={confirmPasswordValidation.error}
          hasSuccess={
            confirmPassword !== '' && confirmPasswordValidation.isValid
          }
          className="flex-1"
        />
      </div>

      {successMessage && (
        <p className="text-green-600 text-base mt-2 ml-[150px]">
          {successMessage}
        </p>
      )}

      <div className="flex justify-end mt-6">
        <Button disabled={!isFormValid || loading} type="submit">
          {loading ? '변경 중...' : '변경하기'}
        </Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
