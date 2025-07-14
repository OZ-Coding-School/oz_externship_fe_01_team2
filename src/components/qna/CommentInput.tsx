import Button from '@components/common/Button/Button'
import Textarea from '@components/common/Textarea'
import { ToastContext } from '@components/common/Toast/ToastContext'
import { cn } from '@utils/cn'
import React, { useContext, useState } from 'react'
const NOTICE =
  '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다.'
const DEFAULT_MAX_LENGTH = 300

interface CommentInputProps {
  onSubmit: (text: string) => void
  maxLength?: number
  className?: string
}

function CommentInput({
  onSubmit,
  maxLength = DEFAULT_MAX_LENGTH,
  className = '',
}: CommentInputProps) {
  const [value, setValue] = useState('')
  const toast = useContext(ToastContext)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue('')
    toast?.show({
      type: 'success',
      message: '댓글이 등록되었어요.',
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 입력 조합 중일 때는 무시
    if (e.nativeEvent.isComposing || e.keyCode === 229) {
      return
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmed = value.trim()
      if (!trimmed) return
      onSubmit(trimmed)
      setValue('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) setValue(e.target.value)
  }

  return (
    <form
      className={cn(
        'w-full bg-white border border-gray-250 rounded-2xl p-4',
        className
      )}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="flex flex-col">
        <Textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={NOTICE}
          rows={4}
          className="resize-none overflow-hidden flex-1 min-h-[36px] max-h-[72px] pr-4 border-none focus:ring-0"
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!value.trim()}
          className="min-w-[64px] h-9 p-0 rounded-full flex items-center justify-center self-end mt-2 leading-none"
        >
          등록
        </Button>
      </div>
    </form>
  )
}

export default CommentInput
