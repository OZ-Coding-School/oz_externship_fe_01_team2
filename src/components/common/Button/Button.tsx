//src/components/common/Button/Button.tsx
import React from 'react'
import type { ButtonProps } from './Button.types'

const Button: React.FC<ButtonProps> = ({
  variant = 'fill',
  disabled = false,
  children,
  onClick,
  radius = '4px',
  width = '156px',
  height = '48px',
  fontSize = '16px',
}) => {
  const baseStyles = 'font-semibold focus:outline-none transition-colors'

  const variantMap = {
    fill: 'bg-[rgba(98,1,224,1)] text-[rgba(255,255,255,1)] hover:bg-[rgba(78,1,179,1)] active:bg-[rgba(59,1,134,1)]',
    outline:
      'bg-[rgba(236,236,236,1)] border border-[rgba(206,206,206,1)] text-[rgba(77,77,77,1)] active:bg-[rgba(239,230,252,1)] active:border-[rgba(98,1,224,1)] active:text-[rgba(98,1,224,1)]',
    ghost:
      'bg-[rgba(250,250,250,1)] text-[rgba(98,1,224,1)] hover:bg-[rgba(236,236,236,1)] active:bg-[rgba(189,189,189,1)]',
    check:
      'bg-[rgba(239,230,252,1)] border border-[rgba(98,1,224,1)] text-[rgba(98,1,224,1)] active:bg-[rgba(236,236,236,1)] active:border-[rgba(206,206,206,1)] active:text-[rgba(77,77,77,1)]',
  }

  const getStyles = () => {
    if (disabled && variant === 'ghost') {
      return 'bg-[rgba(236,236,236,1)] text-[rgba(189,189,189,1)] cursor-not-allowed'
    }
    return variantMap[variant] || variantMap.fill
  }

  return (
    <button
      className={`${baseStyles} ${getStyles()}`}
      style={{
        borderRadius: radius,
        width: width,
        height: height,
        fontSize: fontSize,
      }}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  )
}

export default Button
