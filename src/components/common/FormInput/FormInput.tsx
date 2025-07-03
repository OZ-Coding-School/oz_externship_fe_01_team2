// FormInput.tsx
import React, { useState } from 'react'
import { cn } from '../../../utils/cn'
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
  className,
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : inputValue

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
    error: 'border-danger',
    success: 'border-success',
    focused: 'border-primary',
    default: 'border-gray-400',
  }
  const textColors = {
    error: 'text-danger',
    success: 'text-success',
  }

  const getBorderColor = () => {
    if (hasError) return borderColors.error
    if (hasSuccess) return borderColors.success
    if (isFocused) return borderColors.focused
    return borderColors.default
  }

  const baseInputStyles = `
    w-full h-full border rounded-[4px] pl-3 pr-12 
    focus:outline-none bg-white 
    placeholder-gray-400 font-pretendard 
    font-normal text-[14px] leading-none tracking-[-0.03em] 
    text-gray-800
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <div className="w-full">
      <div className={cn('relative w-[480px] h-[48px]', className)}>
        <input
          type={type}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
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
