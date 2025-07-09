import { useMemo, useState, useEffect } from 'react'
import QnaSearch from '../components/qna/QnaSearch'
import QnaTab from '../components/qna/QnaTab'
import QnaFilterModal from '../components/qna/QnaFilterModal'
import QnaCard from '../components/qna/QnaCard'
import { transformQnaData } from '../utils/transformQnaData'
import { mockQnaListResponse } from '../components/Mocks/MockQnaListResponse'
import type { CategoryFilter } from '../types/qnaFilters.types'
import Spinner from '../components/common/Spinner'

// 페이지당 질문 수
const PAGE_SIZE = 5

const QnaListPage = () => {
  const [selectedTab, setSelectedTab] = useState('전체보기')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<CategoryFilter>({
    main: '대분류',
    sub: '중분류',
    detail: '소분류',
  })

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const transformedQuestions = useMemo(
    () => transformQnaData(mockQnaListResponse.results),
    []
  )

  const filteredQuestions = useMemo(() => {
    const lowerQuery = query.toLowerCase()

    return transformedQuestions.filter((q) => {
      const matchQuery =
        q.title.toLowerCase().includes(lowerQuery) ||
        q.content.toLowerCase().includes(lowerQuery)

      const matchMain =
        filters.main === '대분류' || q.category.depth_1 === filters.main
      const matchSub =
        filters.sub === '중분류' || q.category.depth_2 === filters.sub
      const matchDetail =
        filters.detail === '소분류' || q.category.depth_3 === filters.detail

      return matchQuery && matchMain && matchSub && matchDetail
    })
  }, [query, filters, transformedQuestions])

  const displayedQuestions = useMemo(() => {
    return filteredQuestions.slice(0, PAGE_SIZE * page)
  }, [filteredQuestions, page])

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (
        scrollTop + windowHeight >= docHeight - 100 &&
        !isLoading &&
        displayedQuestions.length < filteredQuestions.length
      ) {
        setIsLoading(true)

        setTimeout(() => {
          setPage((prev) => prev + 1)
          setIsLoading(false)
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, displayedQuestions.length, filteredQuestions.length])

  useEffect(() => {
    setPage(1)
  }, [query, filters])

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
          {displayedQuestions.map((q) => (
            <QnaCard key={q.id} question={q} query={query} />
          ))}

          {/* ✅ 로딩 중 표시 */}
          {isLoading && <Spinner center />}
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
