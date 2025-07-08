import React, { useState, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface TextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  className?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { value, onChange, placeholder = '', rows = 4, className = '', onKeyDown },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    const variant = focused ? 'focus' : 'default'
    const variantMap = {
      default: 'bg-white text-black border-gray-250',
      focus: 'border-primary',
    }

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          'w-full px-4 py-3 text-sm rounded-lg transition-colors resize-none border focus:outline-none',
          variantMap[variant],
          className
        )}
        onKeyDown={onKeyDown}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
