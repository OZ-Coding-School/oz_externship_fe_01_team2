// FormInput.tsx
import React, { useState } from 'react'
import type { FormInputProps } from './FormInput.types'
import SuccessIcon from '../../../assets/icons/success.svg'

const FormInput: React.FC<FormInputProps> = ({
  placeholder = '',
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  hasError = false,
  errorMessage = '',
  hasSuccess = false,
  successMessage = '',
  width = '480px',
  height = '48px',
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)

  // Controlled/Uncontrolled 컴포넌트 처리
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : inputValue

  // 이벤트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (!isControlled) {
      setInputValue(newValue)
    }

    onChange?.(newValue)
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  // 스타일 맵
  const borderColors = {
    error: 'border-[rgba(236,0,55,1)]',
    success: 'border-[rgba(20,199,134,1)]',
    focused: 'border-[rgba(98,1,224,1)]',
    default: 'border-[rgba(189,189,189,1)]',
  }

  const textColors = {
    error: 'text-[rgba(236,0,55,1)]',
    success: 'text-[rgba(20,199,134,1)]',
  }

  const getBorderColor = () => {
    if (hasError) return borderColors.error
    if (hasSuccess) return borderColors.success
    if (isFocused) return borderColors.focused
    return borderColors.default
  }

  const baseInputStyles = `
    w-full h-full border rounded-[4px] pl-3 pr-12 
    focus:outline-none bg-[rgba(255,255,255,1)] 
    placeholder-[rgba(189,189,189,1)] font-pretendard 
    font-normal text-[14px] leading-none tracking-[-0.03em] 
    text-[rgba(18,18,18,1)]
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <div className="w-full">
      <div className="relative" style={{ width }}>
        <input
          type={type}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{ height }}
          className={`${baseInputStyles} ${getBorderColor()}`}
        />

        {hasSuccess && (
          <img
            src={SuccessIcon}
            alt="성공"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        )}
      </div>

      {hasError && errorMessage && (
        <p className={`${textColors.error} text-sm mt-1`}>{errorMessage}</p>
      )}

      {hasSuccess && successMessage && (
        <p className={`${textColors.success} text-sm mt-1`}>{successMessage}</p>
      )}
    </div>
  )
}

export default FormInput
