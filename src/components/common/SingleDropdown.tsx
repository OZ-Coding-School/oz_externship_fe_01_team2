import ExpandMoreIcon from '../../assets/icons/common/expand_more.svg'
import ExpandLessIcon from '../../assets/icons/common/expand_less.svg'
import CheckMarkIcon from '../../assets/icons/common/check_mark.svg'
import { cn } from '../../utils/cn'
import { useState } from 'react'

interface SingleDropdownProps {
  options: string[]
  placeholder: string
  onChange?: (selected: string) => void
  disabled?: boolean
  selected?: string
}

const ICON_FILTER_SELECTED = 'filter brightness-95 invert-[7%] contrast-[88%]'
const ICON_FILTER_UNSELECTED =
  'filter brightness-95 invert-[75%] contrast-[88%]'
const CHECK_MARK_FILTER =
  'filter brightness-0 saturate-100 invert-[18%] hue-rotate-[265deg] brightness-[89%] contrast-[114%]'

export default function SingleDropdown({
  options,
  placeholder,
  onChange,
  disabled = false,
  selected,
}: SingleDropdownProps) {
  const [internalSelected, setInternalSelected] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const selectedValue = selected !== undefined ? selected : internalSelected

  const handleSelect = (option: string) => {
    if (selected === undefined) {
      setInternalSelected(option)
    }
    setIsOpen(false)
    onChange?.(option)
  }

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((open) => !open)
  }

  const isSelected = (option: string) => selectedValue === option

  return (
    <div className="relative w-[282px]">
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={cn(
          'w-full h-[48px] rounded px-[16px] py-[10px] flex items-center justify-between border transition-colors',
          disabled
            ? 'bg-gray-100 border-gray-disabled text-gray-disabled cursor-not-allowed'
            : 'bg-white border-gray-250 text-gray-700 cursor-pointer'
        )}
      >
        <span
          className={cn(
            'text-[14px] font-normal leading-[100%] tracking-[-0.03em]',
            selectedValue ? 'text-gray-700' : 'text-gray-400'
          )}
        >
          {selectedValue || placeholder}
        </span>
        <img
          src={isOpen ? ExpandLessIcon : ExpandMoreIcon}
          alt={isOpen ? '위로 화살표' : '아래로 화살표'}
          className={cn(
            'transition-transform w-4 h-4',
            selectedValue ? ICON_FILTER_SELECTED : ICON_FILTER_UNSELECTED
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-full mt-1 bg-white rounded shadow-lg border border-gray-250',
            'h-[270px] pt-[5px] pb-[5px] overflow-y-auto',
            'flex flex-col gap-[10px]'
          )}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              className={cn(
                'w-[272px] px-4 h-[48px] py-2 text-left transition-colors flex items-center justify-between',
                'mx-auto', // ✅ 중앙 정렬을 위한 클래스 추가
                'text-[14px] font-normal leading-[100%] tracking-[-0.03em]',
                isSelected(option) && 'bg-white text-primary-600 font-semibold',
                !isSelected(option) &&
                  hoveredOption === option &&
                  'bg-[#EFE6FC] text-gray-700',
                !isSelected(option) &&
                  hoveredOption !== option &&
                  'bg-white text-gray-700'
              )}
            >
              <span>{option}</span>
              {isSelected(option) && (
                <img
                  src={CheckMarkIcon}
                  alt="체크 표시"
                  className={cn('w-4 h-4', CHECK_MARK_FILTER)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
