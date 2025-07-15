import { fetchCategories } from '@api/qna/questionApi'
import type { Category } from '@api/qna/types'
import rotateIcon from '@assets/icons/rotate-cw.svg'
import Button from '@components/common/Button/Button'
import SingleDropdown from '@components/common/SingleDropdown'
import type { CategoryFilter } from '@custom-types/qnaFilters.types'
import { useToast } from '@hooks/useToast'
import axios from 'axios'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

type QnaFilterModalProps = {
  onClose: () => void
  onApply: (filters: CategoryFilter) => void
}

const QnaFilterModal = ({ onClose, onApply }: QnaFilterModalProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [major, setMajor] = useState<string>('')
  const [middle, setMiddle] = useState<string>('')
  const [minor, setMinor] = useState<string>('')

  const toast = useToast()

  const [openDropdown, setOpenDropdown] = useState<
    null | 'major' | 'middle' | 'minor'
  >(null)
  const toggleDropdown = (key: 'major' | 'middle' | 'minor') => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategories()
        setCategories(response)
      } catch (error: unknown) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          toast.show({ message: error.message, type: 'error' })
        }
      }
    }
    fetchData()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const resetFilters = () => {
    setMajor('')
    setMiddle('')
    setMinor('')
  }

  const majorOptions = categories.map((cat) => cat.name)
  const selectedMainCategory = categories.find((cat) => cat.name === major)

  const middleOptions =
    selectedMainCategory?.child_categories?.map((cat) => cat.name) || []
  const selectedSubCategory = selectedMainCategory?.child_categories?.find(
    (cat) => cat.name === middle
  )

  const minorOptions =
    selectedSubCategory?.child_categories?.map((cat) => cat.name) || []

  const isSubDisabled = !major
  const isDetailDisabled = !middle

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-[#121212]/60" onClick={onClose} />

      <div
        className="relative ml-auto w-[580px] h-full bg-white rounded-l-lg shadow-lg flex flex-col px-[46px] pt-[45px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-[60px]">
          <h2 className="text-[32px] font-semibold text-gray-600">필터</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-gray-600 mb-[20px]">
              카테고리 선택
            </h3>

            <div className="w-[600px] flex flex-col gap-4">
              <SingleDropdown
                options={majorOptions}
                placeholder="대분류"
                selected={major}
                onChange={(selected) => {
                  setMajor(selected)
                  setMiddle('')
                  setMinor('')
                }}
                className="w-[488px]"
                isOpen={openDropdown === 'major'}
                onToggle={() => toggleDropdown('major')}
              />

              <SingleDropdown
                options={middleOptions}
                placeholder="중분류"
                selected={middle}
                onChange={(selected) => {
                  setMiddle(selected)
                  setMinor('')
                }}
                disabled={isSubDisabled}
                className="w-[488px]"
                isOpen={openDropdown === 'middle'}
                onToggle={() => toggleDropdown('middle')}
              />

              <SingleDropdown
                options={minorOptions}
                placeholder="소분류"
                selected={minor}
                onChange={(selected) => setMinor(selected)}
                disabled={isDetailDisabled}
                className="w-[488px]"
                isOpen={openDropdown === 'minor'}
                onToggle={() => toggleDropdown('minor')}
              />
            </div>
          </div>
        </div>

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
            onClick={() => {
              onApply({ major, middle, minor })
              onClose()
            }}
          >
            <div className="font-bold flex items-center justify-center gap-2 cursor-pointer">
              필터 적용하기
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QnaFilterModal
