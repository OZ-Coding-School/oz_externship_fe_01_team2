// src/components/qna/QnaTitleInput.tsx
import { cn } from '@utils/cn'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function QnaTitleInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="제목을 입력해 주세요"
      maxLength={50}
      className={cn(
        'w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors',
        'text-base bg-primary-50 border-gray-disabled text-gray',
        'focus:border-primary focus:bg-gray-50'
      )}
    />
  )
}
