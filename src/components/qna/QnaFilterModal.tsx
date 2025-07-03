import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SingleDropdown from '../common/SingleDropdown'
import Button from '../common/Button/Button'
import rotateIcon from '../../assets/icons/rotate-cw.svg'
import { CATEGORY, DEFAULT_CATEGORY } from '../qna/category'
import type { CategoryFilter } from '../../../src/types/qnaFilters.types'

type Props = {
  onClose: () => void
  onApply: (filters: CategoryFilter) => void
}

const QnaFilterModal: React.FC<Props> = ({ onClose, onApply }) => {
  const [main, setMain] = useState(DEFAULT_CATEGORY.main)
  const [sub, setSub] = useState(DEFAULT_CATEGORY.sub)
  const [detail, setDetail] = useState(DEFAULT_CATEGORY.detail)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const resetFilters = () => {
    setMain(DEFAULT_CATEGORY.main)
    setSub(DEFAULT_CATEGORY.sub)
    setDetail(DEFAULT_CATEGORY.detail)
  }

  const mainOptions = Object.keys(CATEGORY) as (keyof typeof CATEGORY)[]
  type MainKey = keyof typeof CATEGORY
  type SubKey = keyof (typeof CATEGORY)[MainKey]

  const subOptions =
    main && (main as MainKey) in CATEGORY
      ? Object.keys(CATEGORY[main as MainKey])
      : []

  const detailOptions =
    main &&
    sub &&
    (main as MainKey) in CATEGORY &&
    (sub as SubKey) in CATEGORY[main as MainKey]
      ? CATEGORY[main as MainKey][sub as SubKey]
      : []

  const isSubDisabled = main === DEFAULT_CATEGORY.main
  const isDetailDisabled = sub === DEFAULT_CATEGORY.sub

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

            <div className="flex flex-col gap-4">
              <SingleDropdown
                options={mainOptions}
                placeholder="대분류"
                selected={main}
                onChange={(selected) => {
                  setMain(selected)
                  setSub(DEFAULT_CATEGORY.sub)
                  setDetail(DEFAULT_CATEGORY.detail)
                }}
              />

              <SingleDropdown
                options={subOptions}
                placeholder="중분류"
                selected={sub}
                onChange={(selected) => {
                  setSub(selected)
                  setDetail(DEFAULT_CATEGORY.detail)
                }}
                disabled={isSubDisabled}
              />

              <SingleDropdown
                options={detailOptions}
                placeholder="소분류"
                selected={detail}
                onChange={(selected) => setDetail(selected)}
                disabled={isDetailDisabled}
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
            onClick={() => {
              onApply({ main, sub, detail })
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
