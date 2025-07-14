// components/qna/QnaCard.tsx
import defaultThumbnail from '@assets/images/common/img_default.png'
import defaultAvatar from '@assets/images/common/img_user_default.png'
import Avatar from '@components/common/Avatar'
import type { FlatQuestionCard } from '@custom-types/qnaCard.types'
import { cn } from '@utils/cn'
import { handleImageError } from '@utils/handleImageError'
import { highlightText } from '@utils/highlightText'
import { Link } from 'react-router-dom'

type Props = {
  question: FlatQuestionCard
  query?: string
}

const QnaCard = ({ question, query = '' }: Props) => {
  const {
    id,
    title,
    content,
    category,
    subCategory,
    language,
    nickname,
    time,
    thumbnail,
    answerCount,
    viewCount,
  } = question

  const answerBadgeStyle = cn(
    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
    answerCount > 0 ? 'bg-[#04C73D] text-white' : 'bg-[#bdbdbd] text-white'
  )

  const answerTextColor = answerCount > 0 ? 'text-gray-600' : 'text-gray-400'

  return (
    <Link
      to={`/qna/${id}`}
      className="block"
      aria-label={`상세페이지로 이동: ${title}`}
    >
      <div className="flex flex-col p-6 mb-5 hover:bg-[#FAFAFA] rounded-lg transition-colors">
        {/* 상단 */}
        <div className="flex justify-between">
          <div className="flex-1 pr-5">
            <div className="font-medium text-gray-600 text-xs mb-5">
              <span>{category}</span>
              <span className="mx-1">&gt;</span>
              <span>{subCategory}</span>
              <span className="mx-1">&gt;</span>
              <span className="border-b border-gray-400 pb-px">{language}</span>
            </div>

            <h2 className="text-headline-sb text-gray-600 mb-5 line-clamp-2">
              {highlightText(title, query)}
            </h2>

            <p className="mb-5 text-sm text-gray-400 leading-relaxed line-clamp-3">
              {highlightText(content, query)}
            </p>
          </div>

          <div className="ml-5 shrink-0">
            <img
              src={thumbnail || defaultThumbnail}
              alt="질문 썸네일"
              className="w-[228px] h-[163px] object-cover rounded-md"
              onError={(e) => handleImageError(e)}
            />
          </div>
        </div>

        {/* 하단 */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <div className="flex items-center gap-[9px]">
            <div className={answerBadgeStyle}>A</div>
            <span className={cn('text-tag-md font-semibold', answerTextColor)}>
              답변 {answerCount}
            </span>
            <span className="text-tag-md text-gray-400 font-semibold">
              조회수 {viewCount}
            </span>
          </div>

          <div className="flex items-center h-6">
            <Avatar
              name={nickname}
              profileUrl={defaultAvatar}
              className="w-6 h-6 mr-2"
            />
            <span className="text-xs font-semibold">{nickname}</span>
            <span className="ml-2 text-xs">{time}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default QnaCard
