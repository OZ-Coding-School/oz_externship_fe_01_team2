import React, { useState } from 'react'
import QnaSearch from '../components/qna/QnaSearch'
import QnaTab from '../components/qna/QnaTab'
import QnaFilterModal from '../components/qna/QnaFilterModal'
import thumbnailImg from '../assets/images/thumbnail.png'

const QnaListPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('전체보기')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSortChange = (order: '최신순' | '오래된순') => {
    setSortOrder(order)
  }

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const closeFilterModal = () => {
    setIsFilterOpen(false)
  }

  // 썸네일 이미지
  const imageUrls = [thumbnailImg]

  // 더미 데이터 생성
  const dummyQuestions = Array.from({ length: 10 }, (_, i) => {
    const hasThumbnail = Math.random() < 0.5
    const randomImageUrl =
      imageUrls[Math.floor(Math.random() * imageUrls.length)]

    return {
      id: i + 1,
      title: '오류가 발생했다고 뜹니다.',
      content:
        '&lt;/&gt; 실행 결과 오류가 발생했어요.&nbsp;AI 코드리뷰로 왜 오류가 발생했는지 확인해 보세요! File "main.py", line 2 코드를 작성하세요 ^',
      category: '프론트엔드',
      subCategory: '프로그래밍 언어',
      language: 'Python',
      answerCount: i % 3 === 0 ? 1 : 2,
      viewCount: 60 + i * 5,
      nickname: '김태산',
      time: `${Math.floor(Math.random() * 5) + 1}시간 전`,
      thumbnail: hasThumbnail ? randomImageUrl : undefined,
    }
  })

  const filteredQuestions = dummyQuestions.filter((q) => {
    const lowerQuery = query.toLowerCase()
    const titleMatch = q.title.toLowerCase().includes(lowerQuery)
    const contentMatch =
      typeof q.content === 'string' &&
      q.content.toLowerCase().includes(lowerQuery)
    return titleMatch || contentMatch
  })

  return (
    <>
      {/* 메인 콘텐츠 */}
      <div className="max-w-[944px] mx-auto pb-8 font-sans mt-[108px]">
        <h1 className="text-[32px] text-gray-900 font-bold mb-6">질의응답</h1>

        {/* 검색창 */}
        <div className="w-full mb-6">
          <QnaSearch query={query} setQuery={setQuery} />
        </div>

        {/* 탭 + 정렬 + 필터 */}
        <div className="mb-6 mt-[52px]">
          <QnaTab
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onClickFilter={handleFilterClick}
          />
        </div>

        {/* 카테고리 드롭다운 자리 */}
        <div className="mb-6">{/* <CategoryDropdown /> */}</div>

        {/* 질문 카드 리스트 (현재 주석 처리됨) */}
        {/* 
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <QnaCard key={q.id} question={q} query={query} />
          ))}
        </div> 
        */}
      </div>

      {/* 1. 모달에 closeFilterModal 함수 넘기기 */}
      {isFilterOpen && <QnaFilterModal onClose={closeFilterModal} />}
    </>
  )
}

export default QnaListPage
