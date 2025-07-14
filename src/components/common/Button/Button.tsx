//src/components/common/Button/Button.tsx
import { cn } from '@utils/cn'
import React from 'react'
import type { ButtonProps } from './Button.types'

const Button = ({
  variant = 'fill',
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const variantMap = {
    fill: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
    outline:
      'bg-gray-200 border border-gray-250 text-gray-600 active:bg-primary-100 active:border-primary active:text-primary',
    ghost: 'bg-white text-primary hover:bg-gray-200 active:bg-gray-250',
    check:
      'bg-primary-100 border border-primary text-primary active:bg-gray-200 active:border-gray-250 active:text-gray-600',
  }

  const getStyles = () => {
    if (disabled && variant === 'ghost') {
      return 'bg-gray-200 text-gray-250 cursor-not-allowed'
    }
    return variantMap[variant] || variantMap.fill
  }

  return (
    <button
      type={type}
      className={cn(
        'font-semibold focus:outline-none transition-colors rounded-sm py-3 px-12',
        getStyles(),
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  )
}
export default Button
