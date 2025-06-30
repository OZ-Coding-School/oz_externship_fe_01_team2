// QnaListPage.tsx
import React, { useState } from 'react'
import QnaSearch from '../components/qna/QnaSearch'
import QnaTab from '../components/qna/QnaTab'
import QnaFilterModal from '../components/qna/QnaFilterModal'
import thumbnailImg from '../assets/images/thumbnail.png'
import QnaCard from '../components/qna/QnaCard'

const QnaListPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('전체보기')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category1: '대분류',
    category2: '중분류',
    category3: '소분류',
  })

  const handleSortChange = (order: '최신순' | '오래된순') => {
    setSortOrder(order)
  }

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const closeFilterModal = () => {
    setIsFilterOpen(false)
  }

  const imageUrls = [thumbnailImg]

  const dummyQuestions = Array.from({ length: 10 }, (_, i) => {
    const hasThumbnail = Math.random() < 0.5
    const randomImageUrl =
      imageUrls[Math.floor(Math.random() * imageUrls.length)]

    return {
      id: i + 1,
      title: '오류가 발생했다고 뜹니다.',
      content:
        '&lt;/&gt; 실행 결과 오류가 발생했어요.&nbsp;AI 코드리뷰로 왜 오류가 발생했는지 확인해 보세요! File "main.py", line 2 코드를 작성하세요 ^',
      category: i % 2 === 0 ? '프론트엔드' : '백엔드',
      subCategory: i % 3 === 0 ? '프로그래밍 언어' : '웹 프레임워크',
      language: i % 2 === 0 ? 'Python' : 'JavaScript',
      answerCount: i % 3 === 0 ? 1 : 0,
      viewCount: 60 + i * 5,
      nickname: '김태산',
      time: `${Math.floor(Math.random() * 5) + 1}시간 전`,
      thumbnail: hasThumbnail ? randomImageUrl : undefined,
    }
  })

  const filteredQuestions = dummyQuestions.filter((q) => {
    const lowerQuery = query.toLowerCase()
    const matchQuery =
      q.title.toLowerCase().includes(lowerQuery) ||
      q.content.toLowerCase().includes(lowerQuery)

    const matchCategory =
      (filters.category1 === '대분류' || q.category === filters.category1) &&
      (filters.category2 === '중분류' || q.subCategory === filters.category2) &&
      (filters.category3 === '소분류' || q.language === filters.category3)

    return matchQuery && matchCategory
  })

  return (
    <>
      <div className="max-w-[944px] mx-auto pb-8 font-sans mt-[108px]">
        <h1 className="text-[32px] text-gray-900 font-bold mb-6">질의응답</h1>

        <div className="w-full mb-6">
          <QnaSearch query={query} setQuery={setQuery} />
        </div>

        <div className="mb-6 mt-[52px]">
          <QnaTab
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onClickFilter={handleFilterClick}
          />
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <QnaCard key={q.id} question={q} query={query} />
          ))}
        </div>
      </div>

      {isFilterOpen && (
        <QnaFilterModal
          onClose={closeFilterModal}
          onApply={(newFilters) => setFilters(newFilters)}
        />
      )}
    </>
  )
}

export default QnaListPage
