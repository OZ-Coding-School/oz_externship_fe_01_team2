import CommentItem from './CommentItem'

interface Comment {
  id: number | string
  content: string
  author: {
    nickname: string
    profile_image_url: string
  }
  created_at: string
}

interface CommentListProps {
  comments: Comment[]
  className?: string
}

function CommentList({ comments =[], className = '' }: CommentListProps) {
  if (!comments.length) {
    return (
      <div className={className + ' text-gray-400 text-center py-8'}>
        아직 댓글이 없습니다.
      </div>
    )
  }

  return (
    <div className={className}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentList
