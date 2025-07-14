// import { useMemo, useState, useEffect } from 'react'
// import QnaSearch from '../components/qna/QnaSearch'
// import QnaTab from '../components/qna/QnaTab'
// import QnaFilterModal from '../components/qna/QnaFilterModal'
// import QnaCard from '../components/qna/QnaCard'
// import { transformQnaData } from '../utils/transformQnaData'
// import type { CategoryFilter } from '../types/qnaFilters.types'
// import Spinner from '../components/common/Spinner'
// import { getQuestionList } from '../api/qnaQuestions'

// // 페이지당 질문 수
// const PAGE_SIZE = 5

// const QnaListPage = () => {
//   const [selectedTab, setSelectedTab] = useState('전체보기')
//   const [query, setQuery] = useState('')
//   const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [filters, setFilters] = useState<CategoryFilter>({
//     major: '대분류',
//     middle: '중분류',
//     minor: '소분류',
//   })

//   const [page, setPage] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [questions, setQuestions] = useState([]) // API 데이터 저장
//   const [totalCount, setTotalCount] = useState(0)
//   const [hasMore, setHasMore] = useState(true)

//   const fetchQuestions = async (pageNum = 1, isLoadMore = false) => {
//     if (isLoading) return

//     setIsLoading(true)
//     try {
//       const params = {
//         page: pageNum,
//         search: query || undefined,
//         ordering: sortOrder === '최신순' ? '-created_at' : 'created_at',
//         // 필터 관련 파라미터도 추가 가능
//       }

//       const response = await getQuestionList(params)
//       console.log('질문 목록 응답:', response)

//       const transformedData = transformQnaData(response.results || response)

//       if (isLoadMore) {
//         setQuestions((prev) => [...prev, ...transformedData])
//       } else {
//         setQuestions(transformedData)
//       }

//       setTotalCount(response.count || transformedData.length)
//       setHasMore(response.next ? true : false)
//     } catch (error) {
//       console.error('질문 목록 조회 실패:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     setPage(1)
//     setQuestions([])
//     fetchQuestions(1, false)
//   }, [query, sortOrder])

//   // QnaListPage.tsx에서
//   const filteredQuestions = useMemo(() => {
//     return questions.filter((q) => {
//       const matchMajor =
//         filters.major === '대분류' || q.category.major === filters.major
//       const matchMiddle =
//         filters.middle === '중분류' || q.category.middle === filters.middle
//       const matchMinor =
//         filters.minor === '소분류' || q.category.minor === filters.minor

//       return matchMajor && matchMiddle && matchMinor
//     })
//   }, [questions, filters])

//   const displayedQuestions = useMemo(() => {
//     return filteredQuestions.slice(0, PAGE_SIZE * page)
//   }, [filteredQuestions, page])

//   // 스크롤 이벤트 핸들러
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop
//       const windowHeight = window.innerHeight
//       const docHeight = document.documentElement.scrollHeight

//       if (
//         scrollTop + windowHeight >= docHeight - 100 &&
//         !isLoading &&
//         displayedQuestions.length < filteredQuestions.length
//       ) {
//         setIsLoading(true)

//         setTimeout(() => {
//           setPage((prev) => prev + 1)
//           setIsLoading(false)
//         }, 500)
//       }
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [isLoading, displayedQuestions.length, filteredQuestions.length])

//   useEffect(() => {
//     setPage(1)
//   }, [query, filters])

//   return (
//     <>
//       <div className="max-w-[944px] mx-auto pb-8 font-sans mt-[108px]">
//         <h1 className="text-[32px] text-gray-900 font-bold mb-6">질의응답</h1>

//         <div className="w-full mb-6">
//           <QnaSearch query={query} setQuery={setQuery} />
//         </div>

//         <div className="mb-6 mt-[52px]">
//           <QnaTab
//             selectedTab={selectedTab}
//             onSelectTab={setSelectedTab}
//             sortOrder={sortOrder}
//             onSortChange={setSortOrder}
//             onClickFilter={() => setIsFilterOpen(true)}
//           />
//         </div>

//         <div className="space-y-4">
//           {displayedQuestions.map((q) => (
//             <QnaCard key={q.id} question={q} query={query} />
//           ))}

//           {/* ✅ 로딩 중 표시 */}
//           {isLoading && <Spinner center />}
//         </div>
//       </div>

//       {isFilterOpen && (
//         <QnaFilterModal
//           onClose={() => setIsFilterOpen(false)}
//           onApply={setFilters}
//         />
//       )}
//     </>
//   )
// }

// export default QnaListPage

import { useMemo, useState, useEffect, useCallback } from 'react'
import QnaSearch from '../components/qna/QnaSearch'
import QnaTab from '../components/qna/QnaTab'
import QnaFilterModal from '../components/qna/QnaFilterModal'
import QnaCard from '../components/qna/QnaCard'
import { transformQnaData } from '../utils/transformQnaData'
import type { CategoryFilter } from '../types/qnaFilters.types'
import type { FlatQuestionCard } from '../types/qnaCard.types'
import Spinner from '../components/common/Spinner'
import { getQuestionList } from '../api/qnaQuestions'

const PAGE_SIZE = 5

const QnaListPage = () => {
  // 기본 상태
  const [query, setQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'최신순' | '오래된순'>('최신순')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<CategoryFilter>({
    major: '대분류',
    middle: '중분류',
    minor: '소분류',
  })

  // 데이터 상태
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<FlatQuestionCard[]>([])

  // API 호출
  const fetchQuestions = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const params = {
        search: query || undefined,
        ordering: sortOrder === '최신순' ? '-created_at' : 'created_at',
      }

      const response = await getQuestionList(params)
      const transformedData = transformQnaData(response.results || response)
      setQuestions(transformedData)
    } catch (error) {
      console.error('질문 목록 조회 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, query, sortOrder])

  // 검색어나 정렬 변경 시 다시 로드
  useEffect(() => {
    setPage(1)
    fetchQuestions()
  }, [fetchQuestions])

  // 카테고리 필터링
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchMajor =
        filters.major === '대분류' || q.category.major === filters.major
      const matchMiddle =
        filters.middle === '중분류' || q.category.middle === filters.middle
      const matchMinor =
        filters.minor === '소분류' || q.category.minor === filters.minor
      return matchMajor && matchMiddle && matchMinor
    })
  }, [questions, filters])

  // 페이지네이션으로 표시할 질문들
  const displayedQuestions = useMemo(() => {
    return filteredQuestions.slice(0, PAGE_SIZE * page)
  }, [filteredQuestions, page])

  // 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window
      const { scrollHeight } = document.documentElement

      if (
        scrollY + innerHeight >= scrollHeight - 100 &&
        !isLoading &&
        displayedQuestions.length < filteredQuestions.length
      ) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, displayedQuestions.length, filteredQuestions.length])

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1)
  }, [filters])

  return (
    <>
      <div className="max-w-[944px] mx-auto pb-8 font-sans mt-[108px]">
        <h1 className="text-[32px] text-gray-900 font-bold mb-6">질의응답</h1>

        {/* 검색 */}
        <div className="w-full mb-6">
          <QnaSearch query={query} setQuery={setQuery} />
        </div>

        {/* 탭 및 필터 */}
        <div className="mb-6 mt-[52px]">
          <QnaTab
            selectedTab="전체보기"
            onSelectTab={() => {}}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onClickFilter={() => setIsFilterOpen(true)}
          />
        </div>

        {/* 질문 목록 */}
        <div className="space-y-4">
          {displayedQuestions.length > 0 ? (
            displayedQuestions.map((question) => (
              <QnaCard key={question.id} question={question} query={query} />
            ))
          ) : !isLoading ? (
            <div className="text-center py-20 text-gray-500">
              질문이 없습니다.
            </div>
          ) : null}

          {isLoading && <Spinner center />}
        </div>
      </div>

      {/* 필터 모달 */}
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
