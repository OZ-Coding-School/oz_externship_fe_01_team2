import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SingleDropdown from '../common/SingleDropdown'
import Button from '../common/Button/Button'
import rotateIcon from '../../assets/icons/rotate-cw.svg'

type Props = {
  onClose: () => void
}

const QnaFilterModal: React.FC<Props> = ({ onClose }) => {
  // ✅ 초기값을 문자열로 설정
  const [category1, setCategory1] = useState('대분류')
  const [category2, setCategory2] = useState('중분류')
  const [category3, setCategory3] = useState('소분류')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // 대분류 변경 시 중/소분류 초기화
  const handleCategoryChange = (selected: string) => {
    setCategory1(selected)
    setCategory2('중분류')
    setCategory3('소분류')
  }

  // 중분류 변경 시 소분류 초기화
  const handleSubCategoryChange = (selected: string) => {
    setCategory2(selected)
    setCategory3('소분류')
  }

  // ✅ 선택 초기화
  const resetFilters = () => {
    setCategory1('대분류')
    setCategory2('중분류')
    setCategory3('소분류')
  }

  const category1Options = ['프론트엔드', '백엔드', 'Select 03', 'Select 04']
  const category2Options = [
    '프로그래밍 언어',
    '웹 프레임워크',
    'Web',
    'OS',
    '라이브러리',
  ]
  const category3Options = [
    'JavaScript',
    'Python',
    'React',
    'Django',
    'FastAPI',
  ]

  const isSubCategoryDisabled = category1 === '대분류'
  const isSubSubCategoryDisabled = category2 === '중분류'

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
                options={category1Options}
                placeholder="대분류"
                onChange={handleCategoryChange}
                styleConfig={{
                  bgColor: '#fff',
                  borderColor: '#ccc',
                  hoverBgColor: '#EFE6FC',
                  selectedTextColor: '#6200E0',
                }}
              />

              <SingleDropdown
                options={category2Options}
                placeholder="중분류"
                onChange={handleSubCategoryChange}
                disabled={isSubCategoryDisabled}
                styleConfig={{
                  bgColor: isSubCategoryDisabled ? '#f0f0f0' : '#fff',
                  borderColor: '#ccc',
                  hoverBgColor: '#EFE6FC',
                  selectedTextColor: '#6200E0',
                  disabledBgColor: '#f0f0f0',
                }}
              />

              <SingleDropdown
                options={category3Options}
                placeholder="소분류"
                onChange={setCategory3}
                disabled={isSubSubCategoryDisabled}
                styleConfig={{
                  bgColor: isSubSubCategoryDisabled ? '#f0f0f0' : '#fff',
                  borderColor: '#ccc',
                  hoverBgColor: '#EFE6FC',
                  selectedTextColor: '#6200E0',
                  disabledBgColor: '#f0f0f0',
                }}
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
            width="278px"
            height="54px"
            fontSize="20px"
            radius="4px"
            onClick={() =>
              console.log('필터 적용', {
                category1,
                category2,
                category3,
              })
            }
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
