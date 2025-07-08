import { ChevronRight, Link } from 'lucide-react'
import { useState } from 'react'
import UserDefaultImage from '../assets/images/common/img_user_default.png'
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button'
import { mockQnaDetail } from '../components/Mocks/MockQnaDetail'
import AIAnswer from '../components/qna/AIAnswer'
import AnswerCard from '../components/qna/AnswerCard'
import { useToast } from '../hooks/useToast'
import { formatRelativeTime } from '../utils/formatRelativeTime'

const QnaDetailPage = () => {
  const [user] = useState({
    id: 7,
    name: '오즈오즈',
    nickname: 'oz_student',
    profileUrl: UserDefaultImage,
    role: 'Student',
  })
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  const [qnaData, setQnaData] = useState(mockQnaDetail)

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
    user.role === 'Student' &&
    user.id === qnaData.author.id &&
    !qnaData.answers.some((a) => a.is_adopted)

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
        <span>{qnaData.category.depth_1}</span>
        <ChevronRight />
        <span>{qnaData.category.depth_2}</span>
        <ChevronRight />
        <span>{qnaData.category.depth_3}</span>
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
        <p className="pt-10 text-body-rg pb-15">{qnaData.content}</p>
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
      <div className="border border-gray-250 py-10 px-9 rounded-3xl flex items-center justify-between mb-25">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} profileUrl={user.profileUrl} />
          <div>
            <div className="text-primary text-xs">{user.name}님, </div>
            <div className="text-lg font-semibold text-gray-800">
              정보를 공유해 주세요.
            </div>
          </div>
        </div>
        <Button className="px-0 rounded-full w-28">답변하기</Button>
      </div>

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
