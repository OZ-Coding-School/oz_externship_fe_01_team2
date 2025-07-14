import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QnaCategorySelect from '../components/qna/QnaCategorySelect'
import MarkdownEditor from '../components/common/MarkdownEditor'
import QnaTitleInput from '../components/qna/QnaTitleInput'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import { createQuestion } from '../api/qnaQuestions'

export default function QnaCreatePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const toast = useToast()

  const isSubmitDisabled = !selectedCategoryId || !title.trim() || isSubmitting

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // FormData로 질문 등록
      const result = await createQuestion(
        selectedCategoryId!,
        title.trim(),
        content.trim(),
        imageFiles
      )

      toast.show({
        message: '질문이 성공적으로 등록되었습니다!',
        type: 'success',
      })

      // 등록된 질문 상세 페이지로 이동
      //에러 수정하고싶어요
      navigate(`/qna/${result.id}`)
    } catch (error: any) {
      console.error('질문 등록 오류:', error)

      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        '질문 등록에 실패했습니다.'

      toast.show({ message: errorMessage, type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-3">질문 작성하기</h1>
        <hr className="border-gray-250 mb-8" />

        <div className="rounded-lg p-6 mb-6 border border-gray-250">
          <div className="mb-6">
            <QnaCategorySelect
              onCategoryChange={setSelectedCategoryId} // 카테고리 선택 시 ID 받아오기
            />
          </div>
          <QnaTitleInput value={title} onChange={setTitle} />
        </div>

        <div className="mb-6">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            updateImageFiles={setImageFiles}
            placeholder="내용을 입력해 주세요."
            showPreview
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  )
}
