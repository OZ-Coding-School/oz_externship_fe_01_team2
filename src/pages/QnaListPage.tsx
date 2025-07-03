import React, { useState } from 'react'
import QnaSearch from '../components/qna/QnaSearch'
import QnaTab from '../components/qna/QnaTab'
import QnaFilterModal from '../components/qna/QnaFilterModal'
import QnaCard from '../components/qna/QnaCard'
import { transformQnaData } from '../utils/transformQnaData'
import { mockQnaListResponse } from '../components/Mocks/MockQnaListResponse'
import type { CategoryFilter } from '../types/qnaFilters.types'

const QnaListPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('전체보기')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<CategoryFilter>({
    main: '대분류',
    sub: '중분류',
    detail: '소분류',
  })

  const transformedQuestions = transformQnaData(mockQnaListResponse.results)

  const filteredQuestions = transformedQuestions.filter((q) => {
    const lowerQuery = query.toLowerCase()
    const matchQuery =
      q.title.toLowerCase().includes(lowerQuery) ||
      q.content.toLowerCase().includes(lowerQuery)

    const matchCategory =
      (filters.main === '대분류' || q.category === filters.main) &&
      (filters.sub === '중분류' || q.subCategory === filters.sub) &&
      (filters.detail === '소분류' || q.language === filters.detail)

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
            onSortChange={setSortOrder}
            onClickFilter={() => setIsFilterOpen(true)}
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
          onClose={() => setIsFilterOpen(false)}
          onApply={setFilters}
        />
      )}
    </>
  )
}

export default QnaListPage
