import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import SortIcon from '../../assets/icons/arrow-up-down.svg'
import type { Answer } from '../../types/qnaDetail'
import { cn } from '../../utils/cn'
import { formatRelativeTime } from '../../utils/formatRelativeTime'
import { getFullDate } from '../../utils/getFullDate'
import Avatar from '../common/Avatar'
import MarkdownRenderer from '../common/MarkdownEditor/MarkdownRenderer'
import Textarea from '../common/Textarea'

const AnswerCard = ({ answer }: { answer: Answer }) => {
  const [orderByDesc, setOrderByDesc] = useState(true)
  const { author, created_at, content, comments, is_adopted } = answer
  const borderColor = is_adopted ? 'border-primary' : 'border-gray-250'

  const toggleOrderBy = () => {
    setOrderByDesc((prev) => !prev)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const sortedComments = [...comments].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime()
    const bTime = new Date(b.created_at).getTime()
    return orderByDesc ? bTime - aTime : aTime - bTime
  })

  return (
    <div
      className={`border ${borderColor} px-9 py-11 rounded-3xl shadow-sm relative`}
    >
      {is_adopted && (
        <span className="text-white font-semibold bg-primary px-4 rounded-2xl absolute top-0 -translate-y-1/2 left-9 h-9 leading-9">
          질문자 채택
        </span>
      )}

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={author.nickname} profileUrl={author.profile_image_url} />
        <div>
          <a
            href={author.id ? `/users/${author.id}` : '#'}
            className="font-semibold text-gray-600 mb-3 block"
          >
            {author.nickname}
          </a>
          <p className="text-xs text-gray-400">
            IT스타트업 실무형 풀스택 웹 개발 부트캠프 (React + Node.js) &lt; 1기
            &gt; ・ 채택된 답변 수 97
          </p>
        </div>
      </div>

      {/* 본문 */}
      <MarkdownRenderer content={content} />

      {/* 작성일 */}
      <div className="text-gray-400 pb-5 text-right mb-10 border-b border-gray-250">
        {formatRelativeTime(created_at)}
      </div>
      {/* 댓글 */}
      <div className="mt-6 pt-4 text-sm text-gray-700">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 font-semibold mb-2">
            <MessageCircle />
            <div className="font-bold text-xl">댓글 {comments.length}개</div>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleOrderBy}
          >
            <span className="text-gray-600 hover:text-gray-800 transition">
              {orderByDesc ? '최신순' : '오래된 순'}
            </span>
            <img
              src={SortIcon}
              alt="정렬 아이콘"
              className="inline-block mr-2"
            />
          </button>
        </div>

        {/* 댓글 입력 */}
        <form className="relative" onSubmit={handleCommentSubmit}>
          <Textarea
            value=""
            onChange={() => {}}
            placeholder="댓글을 입력하세요"
            rows={4}
          />
          <button
            type="submit"
            className="bg-gray-200 border border-gray-250 rounded-full py-3 px-7 text-gray-600 font-semibold absolute right-5 bottom-5 cursor-pointer hover:bg-gray-250 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            등록
          </button>
        </form>
        {/* 댓글 목록 */}
        {comments &&
          sortedComments.map((comment, idx) => (
            <div key={comment.id} className="flex items-start gap-4 mt-5">
              <Avatar
                name={comment.author.nickname}
                profileUrl={comment.author.profile_image_url}
                className="inline-block mr-2"
              />
              <div
                className={cn(
                  'w-full',
                  idx === sortedComments.length - 1
                    ? 'pb-0 border-b-0'
                    : 'pb-9 border-b border-gray-250'
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 font-semibold">
                    {comment.author.nickname}
                  </span>
                  <span className="text-xs text-gray-400">
                    {getFullDate(comment.created_at)}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default AnswerCard
