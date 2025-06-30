import type { FC } from 'react'
import userAvatar from '../../assets/images/common/img_user_default.png'

type Question = {
  id: number
  title: string
  content: string
  category: string
  subCategory: string
  language: string
  answerCount: number
  viewCount: number
  nickname: string
  time: string
  thumbnail?: string
}

type QnaCardProps = {
  question: Question
  query?: string
}

// ✅ 검색어 하이라이트 유틸
const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedKeyword})`, 'gi')
  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <span key={idx} className="text-[#6201E0] font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  )
}

const QnaCard: FC<QnaCardProps> = ({ question, query = '' }) => {
  return (
    <div className="flex flex-col p-6 mb-4 duration-300 hover:bg-[#FAFAFA] rounded-lg transition-colors">
      {/* 상단 영역 */}
      <div className="flex justify-between">
        {/* 왼쪽 텍스트 */}
        <div className="flex-1 pr-5">
          <div className="font-medium text-gray-600 text-xs mb-5">
            <span>{question.category}</span>
            <span className="mx-1">&gt;</span>
            <span>{question.subCategory}</span>
            <span className="mx-1">&gt;</span>
            <span className="border-b border-gray-400 pb-px">
              {question.language}
            </span>
          </div>

          <h2 className="text-headline-sb text-gray-600 mb-5 line-clamp-2">
            {highlightText(question.title, query)}
          </h2>

          <p className="mb- text-sm text-gray-400 leading-relaxed line-clamp-3">
            {highlightText(question.content, query)}
          </p>
        </div>

        {/* 썸네일 */}
        {question.thumbnail && (
          <div className="ml-5 shrink-0">
            <img
              src={question.thumbnail}
              alt="Question Thumbnail"
              className="w-[228px] h-[163px] object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* 하단 영역 */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
        {/* 답변/조회수 + A 뱃지 */}
        <div className="flex items-center gap-[9px]">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
              ${question.answerCount > 0 ? 'bg-[#04C73D] text-white' : 'bg-[#bdbdbd] text-white'}
            `}
          >
            A
          </div>
          <span
            className={`text-tag-md font-semibold ${
              question.answerCount > 0 ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            답변 {question.answerCount}
          </span>
          <span className="text-tag-md text-gray-400 font-semibold">
            조회수 {question.viewCount}
          </span>
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center h-6">
          <img
            src={userAvatar}
            alt="user avatar"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-gray-400 text-xs font-semibold">
            {question.nickname}
          </span>
          <span className="ml-2 text-gray-400 text-xs">{question.time}</span>
        </div>
      </div>
    </div>
  )
}

export default QnaCard
