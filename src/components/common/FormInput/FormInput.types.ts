// FormInput.types.ts
export interface FormInputProps {
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  value?: string
  onChange?: (value: string) => void

  width?: string
  height?: string

  hasError?: boolean
  errorMessage?: string
  hasSuccess?: boolean
  successMessage?: string

  onFocus?: () => void
  onBlur?: () => void
}
