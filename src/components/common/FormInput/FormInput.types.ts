export interface FormInputProps {
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  value?: string
  onChange?: (value: string) => void
  className?: string
  hasError?: boolean
  errorMessage?: string
  hasSuccess?: boolean
  successMessage?: string

  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean // 추가!
}
