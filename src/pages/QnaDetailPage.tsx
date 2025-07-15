import { fetchAdoptedAnswer } from '@api/qna/answerApi'
import { fetchQnaDetail } from '@api/qna/questionApi'
import Avatar from '@components/common/Avatar'
import Button from '@components/common/Button'
import MarkdownRenderer from '@components/common/MarkdownEditor/MarkdownRenderer'
import AIAnswer from '@components/qna/AIAnswer'
import AnswerCard from '@components/qna/AnswerCard'
import AnswerForm from '@components/qna/AnswerForm'
import type { QuestionDetail } from '@custom-types/qnaDetail'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@store/authStore'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import axios from 'axios'
import { ChevronRight, Link } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const QnaDetailPage = () => {
  const { user } = useAuthStore()
  const { id: questionId } = useParams()
  const [copied, setCopied] = useState(false)
  const [qnaData, setQnaData] = useState<QuestionDetail>()

  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQnaDetail(Number(questionId))
        setQnaData(response)
      } catch (error: unknown) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          // eslint-disable-next-line no-console
          console.error('질문 목록을 불러오는 중 오류 발생:', error.message)
          toast.show({
            message: '질문 목록을 불러오지 못했습니다. ',
            type: 'error',
          })
          navigate(-1)
        }
      }
    }
    fetchData()
  }, [])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
      toast.show({ message: 'URL이 복사되었습니다!', type: 'success' })
    } catch {
      toast.show({ message: 'URL 복사 실패', type: 'error' })
    }
  }

  if (!qnaData) {
    navigate('/error')
    return null
  }

  const canAdopt =
    user &&
    user.role === 'STUDENT' &&
    user.nickname === qnaData.author.nickname &&
    !qnaData.answers.some((a) => a.is_adopted)

  const canEdit = user && user.nickname === qnaData.author.nickname

  const handleAdopt = (answerId: number) => {
    const fetchData = async () => {
      try {
        const response = await fetchAdoptedAnswer({
          answer_id: answerId,
          question_id: Number(questionId),
        })
        toast.show({
          message: response.message || '답변을 채택했습니다!',
          type: 'success',
        })
        const updatedQna = await fetchQnaDetail(Number(questionId))
        setQnaData(updatedQna)
      } catch (error: unknown) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          // eslint-disable-next-line no-console
          console.error('axios Error:', error.message)
          toast.show({
            message: '답변 채택에 실패했습니다. ',
            type: 'error',
          })
          navigate(-1)
        }
      }
    }
    fetchData()
  }

  return (
    <div className="bg-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
      {/* 경로 네비게이션 */}
      <nav className="text-xl font-bold mb-5 flex items-center text-primary">
        <span>{qnaData.category.major}</span>
        <ChevronRight />
        <span>{qnaData.category.middle}</span>
        <ChevronRight />
        <span>{qnaData.category.minor}</span>
      </nav>

      {/* 질문 */}
      <section className="mb-13 border-b border-gray-250 pb-6">
        <div className="border-b border-gray-250 pb-5">
          <div className="flex items-start gap-15 pb-13 justify-between">
            <h1 className="text-title-b">
              <span className="text-primary text-4xl mr-4">Q.</span>{' '}
              {qnaData.title}
            </h1>

            <div className="flex items-center gap-3 shrink-0">
              <Avatar
                name={qnaData.author.nickname}
                profileUrl={qnaData.author.profile_image_url}
              />

              <div className="text-gray-600">{qnaData.author.nickname} </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              조회 {qnaData.view_count} ·{' '}
              {formatRelativeTime(qnaData.created_at)}
            </div>
            {canEdit && (
              <Button
                variant="check"
                className="flex items-center gap-1 px-4 py-2 text-xs"
                onClick={() => navigate(`/qna/${questionId}/edit`)}
              >
                수정
              </Button>
            )}
          </div>
        </div>
        <div className="pt-10 text-body-rg pb-15">
          <MarkdownRenderer content={qnaData.content} />
        </div>
        <AIAnswer question={qnaData.content} />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="text-sm font-semibold flex items-center gap-2 text-gray-400 py-2 px-3 rounded-full border border-gray-250 cursor-pointer"
            onClick={handleShare}
          >
            <Link />
            {copied ? '복사성공!' : '공유하기'}
          </button>
        </div>
      </section>

      {/* 답변 요청 안내 */}
      {user && <AnswerForm questionId={qnaData.id} />}

      {/* 답변 개수 */}
      <h2 className="mb-10 flex items-center gap-4 text-2xl font-semibold">
        <span className="bg-primary rounded-full text-white w-12 h-12 flex items-center justify-center">
          A
        </span>
        <div className="text-title-b">
          {qnaData.answers.length}개의 답변이 있어요
        </div>
      </h2>

      {/* 답변 카드 목록 */}
      <div className="space-y-10">
        {qnaData.answers.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            아직 답변이 없습니다.
          </div>
        )}
        {qnaData.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            canAdopt={canAdopt}
            onAdopt={handleAdopt}
          />
        ))}
      </div>
    </div>
  )
}

export default QnaDetailPage
