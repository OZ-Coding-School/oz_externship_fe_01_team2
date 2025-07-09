import Avatar from '../common/Avatar'
import { cn } from '../../utils/cn'
import { getFullDate } from '../../utils/getFullDate'

interface CommentItemProps {
  comment: {
    id: number | string
    content: string
    author: {
      nickname: string
      profile_image_url: string
    }
    created_at: string
  }
  className?: string
}

function CommentItem({ comment, className = '' }: CommentItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 py-5 border-b border-gray-200 last:border-0',
        className
      )}
    >
      <Avatar
        name={comment.author.nickname}
        profileUrl={comment.author.profile_image_url}
        className="w-8 h-8 mt-1 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-black">
            {comment.author.nickname}
          </span>
          <span className="text-xs text-gray-400">
            {getFullDate(comment.created_at)}
          </span>
        </div>
        <div className="whitespace-pre-wrap break-words text-gray-800">
          {comment.content}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
