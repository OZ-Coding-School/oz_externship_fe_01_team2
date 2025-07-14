import { ChevronRight, Link } from 'lucide-react'
import { useState, useEffect } from 'react'
import UserDefaultImage from '../assets/images/common/img_user_default.png'
import Avatar from '../components/common/Avatar'
import AIAnswer from '../components/qna/AIAnswer'
import AnswerCard from '../components/qna/AnswerCard'
import AnswerForm from '../components/qna/AnswerForm'
import { useToast } from '../hooks/useToast'
import { formatRelativeTime } from '../utils/formatRelativeTime'
import { useParams } from 'react-router'
import { getQuestionDetail } from '../api/qnaQuestions'
import MarkdownRenderer from '../components/common/MarkdownEditor/MarkdownRenderer'

const QnaDetailPage = () => {
  const { id } = useParams() // URL에서 질문 ID 가져오기
  const [user] = useState(null) // 일단 null로 설정
  const [copied, setCopied] = useState(false)
  const [qnaData, setQnaData] = useState(null) // 초기값 null
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getQuestionDetail(Number(id))
        .then((data) => {
          console.log('질문 상세 데이터:', data)
          setQnaData(data)
        })
        .catch((error) => {
          console.error('질문 조회 실패:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [id, toast])

  if (isLoading || !qnaData) {
    return (
      <div className="bg-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="text-lg">질문을 불러오는 중...</div>
        </div>
      </div>
    )
  }

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

  const canAdopt =
    user?.role === 'Student' &&
    user?.id === qnaData?.author?.id &&
    !qnaData?.answers?.some((a) => a.is_adopted)

  const handleAdopt = (answerId: number | string) => {
    setQnaData((prev) => ({
      ...prev,
      answers: prev.answers.map((a) =>
        a.id === answerId ? { ...a, is_adopted: true } : a
      ),
    }))
    toast.show({ message: '답변을 채택했습니다!', type: 'success' })
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

          <div className="text-sm text-gray-400">
            조회 {qnaData.view_count} · {formatRelativeTime(qnaData.created_at)}
          </div>
        </div>
        {/* <p className="pt-10 text-body-rg pb-15">{qnaData.content}</p> */}
        <div className="pt-10 pb-15">
          <MarkdownRenderer
            content={qnaData.content}
            className="text-body-rg"
          />
        </div>
        <AIAnswer question={qnaData.content} />
        <div className="flex justify-end">
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
      {user && <AnswerForm user={user} questionId={qnaData.id} />}

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
