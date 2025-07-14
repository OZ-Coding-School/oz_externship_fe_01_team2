import SortIcon from '@assets/icons/arrow-up-down.svg'
import Avatar from '@components/common/Avatar'
import MarkdownRenderer from '@components/common/MarkdownEditor/MarkdownRenderer'
import CommentInput from '@components/qna/CommentInput'
import CommentList from '@components/qna/CommentList'
import type { Answer, Comment } from '@custom-types/qnaDetail'
import { cn } from '@utils/cn'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface AnswerCardProps {
  answer: Answer
  canAdopt: boolean
  onAdopt: (answerId: number | string) => void
}

function AnswerCard({ answer, canAdopt, onAdopt }: AnswerCardProps) {
  const [comments, setComments] = useState<Comment[]>(answer.comments)
  const [orderByDesc, setOrderByDesc] = useState(true)

  const sortedComments = [...comments].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime()
    const bTime = new Date(b.created_at).getTime()
    return orderByDesc ? bTime - aTime : aTime - bTime
  })

  // 댓글 등록
  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Math.random().toString(36).slice(2),
      content: text,
      author: {
        nickname: '백지헌',
        profile_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEg4LXysUccw39DpXCFKIRkJv6-mzFCNl7fw&s',
      },
      created_at: new Date().toISOString(),
    }
    setComments((prev) =>
      orderByDesc ? [newComment, ...prev] : [...prev, newComment]
    )
  }

  return (
    <div
      className={cn(
        'border border-gray-250 px-9 py-11 rounded-3xl shadow-sm relative',
        answer.is_adopted ? 'border-primary' : 'border-gray-250'
      )}
    >
      {/* 채택 뱃지 */}
      {answer.is_adopted && (
        <span className="text-white font-semibold bg-primary px-4 rounded-2xl absolute top-0 -translate-y-1/2 left-9 h-9 leading-9">
          질문자 채택
        </span>
      )}

      {/* 채택하기 버튼 */}
      {canAdopt && (
        <button
          onClick={() => onAdopt(answer.id)}
          className="absolute right-9 top-8 px-5 py-2 bg-primary text-white rounded-full font-semibold"
        >
          채택하기
        </button>
      )}

      {/* 답변자 정보 */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar
          name={answer.author.nickname}
          profileUrl={answer.author.profile_image_url}
        />
        <span className="font-semibold text-gray-600">
          {answer.author.nickname}
        </span>
      </div>

      {/* 답변 본문 */}
      <MarkdownRenderer content={answer.content} />

      {/* 답변 작성일 */}
      <div className="text-gray-400 pb-5 text-right mb-10 border-b border-gray-250">
        {formatRelativeTime(answer.created_at)}
      </div>

      {/* 댓글 상단 (정렬/개수) */}
      <div className="flex items-center justify-between mb-5 mt-6 pt-4 text-sm text-gray-700">
        <div className="flex items-center gap-3 font-semibold">
          <MessageCircle />
          <span className="font-bold text-xl">댓글 {comments.length}개</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOrderByDesc((o) => !o)}
        >
          <span className="text-gray-600 hover:text-gray-800 transition">
            {orderByDesc ? '최신순' : '오래된 순'}
          </span>
          <img src={SortIcon} alt="정렬 아이콘" className="inline-block mr-2" />
        </button>
      </div>

      {/* 댓글 입력창 */}
      <CommentInput onSubmit={handleAddComment} />

      {/* 댓글 목록 */}
      <CommentList comments={sortedComments} className="mt-2" />
    </div>
  )
}

export default AnswerCard
