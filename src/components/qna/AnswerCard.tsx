import SortIcon from '@assets/icons/arrow-up-down.svg'
import Avatar from '@components/common/Avatar'
import MarkdownRenderer from '@components/common/MarkdownEditor/MarkdownRenderer'
import MarkdownEditor from '@components/common/MarkdownEditor'
import { useToast } from '@hooks/useToast'
import CommentInput from '@components/qna/CommentInput'
import CommentList from '@components/qna/CommentList'
import type { Answer } from '@custom-types/qnaDetail'
import { cn } from '@utils/cn'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Button from '@components/common/Button'
import { useAuthStore } from '@store/authStore'
import { updateAnswer } from '@api/qna/answerApi'

interface AnswerCardProps {
  answer: Answer
  questionId: number
  canAdopt: boolean | null
  onAdopt: (answerId: number) => void
  onAddComment: (answerId: number, text: string) => void
  onAnswerUpdate?: () => void
}

const AnswerCard = ({
  answer,
  questionId,
  canAdopt,
  onAdopt,
  onAddComment,
  onAnswerUpdate,
}: AnswerCardProps) => {
  const { user } = useAuthStore()
  const toast = useToast()
  const [orderByDesc, setOrderByDesc] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(answer.content)
  const [editImageFiles, setEditImageFiles] = useState<File[]>([])

  const canEdit = user && user.nickname === answer.author.nickname

  const handleStartEdit = () => {
    setEditContent(answer.content)
    setEditImageFiles([])
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditContent(answer.content)
    setEditImageFiles([])
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    try {
      if (!editContent.trim()) {
        toast.show({ message: '답변 내용을 입력해주세요.', type: 'error' })
        return
      }

      const formData = new FormData()
      formData.append('content', editContent)
      editImageFiles.forEach((file) => {
        formData.append('image_files', file)
      })

      await updateAnswer(questionId, answer.id, formData)

      toast.show({ message: '답변이 수정되었습니다!', type: 'success' })
      setIsEditing(false)
      onAnswerUpdate?.()
    } catch {
      toast.show({ message: '답변 수정 실패', type: 'error' })
    }
  }

  const sortedComments = [...answer.comments].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime()
    const bTime = new Date(b.created_at).getTime()
    return orderByDesc ? bTime - aTime : aTime - bTime
  })

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

      <div className="absolute right-9 top-8">
        {/* 수정 모드일 때 버튼들 */}
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="px-4 py-2 text-xs"
              onClick={handleCancelEdit}
            >
              취소
            </Button>
            <Button className="px-4 py-2 text-xs" onClick={handleSaveEdit}>
              저장
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* 수정 버튼 - 내가 쓴 답변에만 */}
            {canEdit && (
              <Button
                variant="outline"
                className="px-4 py-2 text-xs"
                onClick={handleStartEdit} // 변경됨
              >
                답변 수정하기
              </Button>
            )}

            {/* 채택하기 버튼 - 질문자가 다른 사람 답변에만 */}
            {canAdopt && (
              <Button
                className="px-5 py-2 text-xs"
                onClick={() => onAdopt(answer.id)}
              >
                채택하기
              </Button>
            )}
          </div>
        )}
      </div>
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
      {isEditing ? (
        <MarkdownEditor
          placeholder="답변을 수정해주세요..."
          value={editContent}
          onChange={setEditContent}
          updateImageFiles={setEditImageFiles}
          showPreview
        />
      ) : (
        <MarkdownRenderer content={answer.content} />
      )}

      {/* 답변 작성일 */}
      <div className="text-gray-400 pb-5 text-right mb-10 border-b border-gray-250">
        {formatRelativeTime(answer.created_at)}
      </div>

      {/* 댓글 상단 (정렬/개수) */}
      <div className="flex items-center justify-between mb-5 mt-6 pt-4 text-sm text-gray-700">
        <div className="flex items-center gap-3 font-semibold">
          <MessageCircle />
          <span className="font-bold text-xl">
            댓글 {answer.comments.length}개
          </span>
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
      <CommentInput onSubmit={(text) => onAddComment(answer.id, text)} />

      {/* 댓글 목록 */}
      <CommentList comments={sortedComments} className="mt-2" />
    </div>
  )
}

export default AnswerCard
