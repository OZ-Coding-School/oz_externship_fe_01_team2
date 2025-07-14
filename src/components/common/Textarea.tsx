import { cn } from '@utils/cn'
import React, { forwardRef } from 'react'

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
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 text-sm rounded-lg transition-colors resize-none border border-gray-250 focus:border-primary focus:outline-none bg-white text-black',
          className
        )}
        onKeyDown={onKeyDown}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
