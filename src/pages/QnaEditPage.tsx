import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QnaCategorySelect from '@components/qna/QnaCategorySelect'
import QnaTitleInput from '@components/qna/QnaTitleInput'
import MarkdownEditor from '@components/common/MarkdownEditor/MarkdownEditor'
import Button from '@components/common/Button'
import { useToast } from '@hooks/useToast'
import {
  fetchQnaDetail,
  updateQuestion,
  fetchCategories,
} from '@api/qna/questionApi'
import type { CreateQuestionRequest, Category } from '@api/qna/types'

export default function QnaEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 이름으로 소분류 ID 찾기
  const findMinorCategoryId = (
    categories: Category[],
    majorName: string,
    middleName: string,
    minorName: string
  ): number | null => {
    for (const major of categories) {
      if (major.name === majorName && major.child_categories) {
        for (const middle of major.child_categories) {
          if (middle.name === middleName && middle.child_categories) {
            const minor = middle.child_categories.find(
              (m) => m.name === minorName
            )
            if (minor) return minor.id
          }
        }
      }
    }
    return null
  }

  // 기존 질문 데이터 로딩
  useEffect(() => {
    const loadQuestionData = async () => {
      if (!id) {
        toast.show({ message: '잘못된 접근입니다.', type: 'error' })
        navigate('/qna')
        return
      }

      try {
        const [questionData, categoriesData] = await Promise.all([
          fetchQnaDetail(Number(id)),
          fetchCategories(),
        ])

        // 카테고리 이름으로 실제 ID 찾기
        const foundCategoryId = findMinorCategoryId(
          categoriesData,
          questionData.category.major,
          questionData.category.middle,
          questionData.category.minor
        )

        setCategoryId(foundCategoryId)
        setTitle(questionData.title)
        setContent(questionData.content)
      } catch (error) {
        toast.show({
          message: '질문을 불러오는데 실패했습니다.',
          type: 'error',
        })
        navigate('/qna')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestionData()
  }, [id, navigate, toast])

  // 폼 유효성 검사
  const isFormValid =
    !!categoryId &&
    title.trim() !== '' &&
    content.trim() !== '' &&
    !isSubmitting

  // 질문 수정 처리
  const handleUpdateQuestion = async () => {
    if (!isFormValid) {
      toast.show({ message: '필수 항목을 모두 입력해 주세요.', type: 'error' })
      return
    }

    setIsSubmitting(true)
    try {
      const requestData: CreateQuestionRequest = {
        category_id: categoryId,
        title: title.trim(),
        content: content.trim(),
      }

      await updateQuestion(Number(id), requestData)
      toast.show({ message: '질문이 수정되었습니다!', type: 'success' })
      navigate(`/qna/${id}`)
    } catch (error) {
      toast.show({ message: '질문 수정에 실패했습니다.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelEdit = () => {
    navigate(`/qna/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" />
          <p className="text-gray-600">질문을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray mb-3">질문 수정하기</h1>
          <hr className="border-gray-250" />
        </header>

        <section className="rounded-lg p-6 mb-6 border border-gray-250">
          <div className="mb-6">
            <QnaCategorySelect
              value={categoryId}
              onCategoryChange={setCategoryId}
            />
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

        <footer className="flex justify-end gap-2">
          <Button
            onClick={handleCancelEdit}
            variant="outline"
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button onClick={handleUpdateQuestion} disabled={!isFormValid}>
            {isSubmitting ? '수정 중...' : '수정하기'}
          </Button>
        </footer>
      </div>
    </div>
  )
}
