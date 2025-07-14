// src/pages/QnaCreatePage.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QnaCategorySelect from '@components/qna/QnaCategorySelect'
import QnaTitleInput from '@components/qna/QnaTitleInput'
import MarkdownEditor from '@components/common/MarkdownEditor/MarkdownEditor'
import Button from '@components/common/Button'
import { useToast } from '@hooks/useToast'
import { createQuestion } from '@api/qna/questionApi'
import type { CreateQuestionRequest } from '@api/qna/types'

export default function QnaCreatePage() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const isFormValid =
    !!categoryId &&
    title.trim() !== '' &&
    content.trim() !== '' &&
    !isSubmitting

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.show({ message: '필수 항목을 모두 입력해 주세요.', type: 'error' })
      return
    }
    setIsSubmitting(true)
    try {
      const payload: CreateQuestionRequest = {
        categoryId,
        title: title.trim(),
        content: content.trim(),
      }
      const result = await createQuestion(payload)
      toast.show({ message: '질문이 등록되었습니다!', type: 'success' })
      navigate(`/qna/${result.id}`)
    } catch (error) {
      toast.show({ message: '질문 등록에 실패했습니다.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray mb-3">질문 작성하기</h1>
          <hr className="border-gray-250" />
        </header>

        <section className="rounded-lg p-6 mb-6 border border-gray-250">
          <div className="mb-6">
            <QnaCategorySelect onCategoryChange={setCategoryId} />
          </div>
          <QnaTitleInput value={title} onChange={setTitle} />
        </section>

        <section className="mb-6">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해 주세요."
            showPreview
          />
        </section>

        <footer className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </footer>
      </div>
    </div>
  )
}
