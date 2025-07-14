import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SingleDropdown from '../common/SingleDropdown'
import Button from '../common/Button/Button'
import rotateIcon from '../../assets/icons/rotate-cw.svg'
import { fetchCategories } from '../../api/qnaCategory'
import type { CategoryFilter } from '../../../src/types/qnaFilters.types'

type Props = {
  onClose: () => void
  onApply: (filters: CategoryFilter) => void
}

interface Category {
  id: number
  name: string
  type: 'major' | 'middle' | 'minor'
  parent_category_id: number | null
}

const INITIAL_FILTER = {
  major: '대분류',
  middle: '중분류',
  minor: '소분류',
}

const QnaFilterModal: React.FC<Props> = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState(INITIAL_FILTER)
  const [categories, setCategories] = useState<Category[]>([])
  const [openDropdown, setOpenDropdown] = useState<
    keyof typeof INITIAL_FILTER | null
  >(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCategories()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      if (Array.isArray(data)) {
        const transformedCategories = data.map((item) => ({
          id: item.category_id,
          name: item.category_name,
          type: item.category_type as Category['type'],
          parent_category_id: item.parent_category_id,
        }))
        setCategories(transformedCategories)
      }
    } catch (error) {
      console.error('카테고리 로딩 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const getCategoryOptions = (type: Category['type'], parentName?: string) => {
    if (type === 'major') {
      return categories
        .filter((cat) => cat.type === 'major')
        .map((cat) => cat.name)
    }

    if (!parentName) return []

    const parent = categories.find((cat) => cat.name === parentName)
    if (!parent) return []

    return categories
      .filter(
        (cat) => cat.type === type && cat.parent_category_id === parent.id
      )
      .map((cat) => cat.name)
  }

  const updateFilter = (key: keyof CategoryFilter, value: string) => {
    const newFilters = { ...filters, [key]: value }

    // 상위 카테고리 변경 시 하위 카테고리 초기화
    if (key === 'major') {
      newFilters.middle = INITIAL_FILTER.middle
      newFilters.minor = INITIAL_FILTER.minor
    } else if (key === 'middle') {
      newFilters.minor = INITIAL_FILTER.minor
    }

    setFilters(newFilters)
    setOpenDropdown(null)
  }

  // 드롭다운 토글
  const toggleDropdown = (key: keyof CategoryFilter) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  // 필터 초기화
  const resetFilters = () => {
    setFilters(INITIAL_FILTER)
  }

  // 필터 적용
  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-black/60" onClick={onClose} />
        <div className="relative ml-auto w-[580px] h-full bg-white rounded-l-lg shadow-lg flex items-center justify-center">
          <div className="text-lg text-gray-600">카테고리 로딩 중...</div>
        </div>
      </div>
    )
  }

  // 옵션 데이터
  const majorOptions = getCategoryOptions('major')
  const middleOptions = getCategoryOptions('middle', filters.major)
  const minorOptions = getCategoryOptions('minor', filters.middle)

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#121212]/60" onClick={onClose} />

      {/* Modal Panel */}
      <div
        className="relative ml-auto w-[580px] h-full bg-white rounded-l-lg shadow-lg flex flex-col px-[46px] pt-[45px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-[60px]">
          <h2 className="text-[32px] font-semibold text-gray-600">필터</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-gray-600 mb-[20px]">
              카테고리 선택
            </h3>

            <div className="w-[600px] flex flex-col gap-4">
              <SingleDropdown
                options={majorOptions}
                placeholder="대분류"
                selected={filters.major}
                onChange={(value) => updateFilter('major', value)}
                className="w-full max-w-[488px]"
                isOpen={openDropdown === 'major'}
                onToggle={() => toggleDropdown('major')}
              />

              <SingleDropdown
                options={middleOptions}
                placeholder="중분류"
                selected={filters.middle}
                onChange={(value) => updateFilter('middle', value)}
                disabled={filters.major === INITIAL_FILTER.major}
                className="w-full max-w-[488px]"
                isOpen={openDropdown === 'middle'}
                onToggle={() => toggleDropdown('middle')}
              />

              <SingleDropdown
                options={minorOptions}
                placeholder="소분류"
                selected={filters.minor}
                onChange={(value) => updateFilter('minor', value)}
                disabled={filters.middle === INITIAL_FILTER.middle}
                className="w-full max-w-[488px]"
                isOpen={openDropdown === 'minor'}
                onToggle={() => toggleDropdown('minor')}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-center py-[20px] border-t border-gray-200 -mx-[46px]"
          style={{ boxShadow: '0px -2px 16px 0px #A0A0A040' }}
        >
          <button
            className="w-[162px] text-[20px] py-[15px] mr-[44px] text-[#4d4d4d]"
            onClick={resetFilters}
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <img
                src={rotateIcon}
                alt="초기화"
                className="w-6 h-6 translate-y-[1px]"
              />
              <span className="text-[20px]">선택 초기화</span>
            </div>
          </button>

          <Button
            variant="fill"
            className="w-[278px] h-[54px] text-[20px] rounded-[4px]"
            onClick={handleApply}
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QnaFilterModal
