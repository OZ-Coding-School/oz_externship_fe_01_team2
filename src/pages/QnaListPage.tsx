import { fetchQnaList } from '@api/qna/questionApi'
import Spinner from '@components/common/Spinner'
import QnaCard from '@components/qna/QnaCard'
import QnaFilterModal from '@components/qna/QnaFilterModal'
import QnaSearch from '@components/qna/QnaSearch'
import QnaTab from '@components/qna/QnaTab'
import type { Question } from '@custom-types/qnaDetail'
import type { CategoryFilter } from '@custom-types/qnaFilters.types'
import { useToast } from '@hooks/useToast'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

// 페이지당 질문 수
const PAGE_SIZE = 10

const QnaListPage = () => {
  const [selectedTab, setSelectedTab] = useState('전체보기')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<CategoryFilter>({
    major: '대분류',
    middle: '중분류',
    minor: '소분류',
  })
  const toast = useToast()

  const [questions, setQuestions] = useState<Question[]>([])

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQnaList({
          ordering: sortOrder === '최신순' ? '-created_at' : 'created_at',
          page: page,
          page_size: PAGE_SIZE,
          search: query.trim() || '',
        })
        setQuestions(response.results)
      } catch (error: unknown) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          // eslint-disable-next-line no-console
          console.error('질문 목록을 불러오는 중 오류 발생:', error.message)
          toast.show({
            message: '질문 목록을 불러오지 못했습니다. 다시 시도해주세요.',
            type: 'error',
          })
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page, query, sortOrder])

  const filteredQuestions = useMemo(() => {
    const lowerQuery = query.toLowerCase()

    return questions.filter((q) => {
      const matchQuery =
        q.title.toLowerCase().includes(lowerQuery) ||
        q.content.toLowerCase().includes(lowerQuery)

      const matchMain =
        filters.major === '대분류' || q.category.major === filters.major
      const matchSub =
        filters.middle === '중분류' || q.category.middle === filters.middle
      const matchDetail =
        filters.minor === '소분류' || q.category.minor === filters.minor

      return matchQuery && matchMain && matchSub && matchDetail
    })
  }, [query, filters, questions])

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
          {displayedQuestions.length === 0 && query && (
            <div className="text-center text-gray-500 py-20">
              검색 결과가 없습니다.
            </div>
          )}
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
