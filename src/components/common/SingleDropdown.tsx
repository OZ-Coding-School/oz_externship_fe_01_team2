import CheckMarkIcon from '@assets/icons/common/check_mark.svg'
import ExpandLessIcon from '@assets/icons/common/expand_less.svg'
import ExpandMoreIcon from '@assets/icons/common/expand_more.svg'
import { cn } from '@utils/cn'
import { useState } from 'react'

interface SingleDropdownProps {
  options: string[]
  placeholder: string
  onChange?: (selected: string) => void
  disabled?: boolean
  selected?: string
  className?: string
  isOpen: boolean
  onToggle: () => void
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
  className = '',
  isOpen,
  onToggle,
}: SingleDropdownProps) {
  const [internalSelected, setInternalSelected] = useState('')
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const selectedValue = selected ?? internalSelected

  const handleSelect = (option: string) => {
    if (selected === undefined) setInternalSelected(option)
    onToggle()
    onChange?.(option)
  }

  const isSelected = (option: string) => selectedValue === option

  return (
    <div className={cn('relative', className)}>
      <button
        disabled={disabled}
        onClick={onToggle}
        className={cn(
          'w-full h-[48px] rounded-[4px] px-4 flex items-center justify-between border-[1.5px]',
          'text-[14px] font-normal leading-[100%] tracking-[-0.03em]',
          disabled
            ? 'bg-gray-100 border-gray-disabled text-gray-disabled cursor-not-allowed'
            : 'bg-white border-gray-600 text-gray-700 hover:border-gray-700 focus:outline-none focus:border-[#6201E0]'
        )}
      >
        <span className={selectedValue ? 'text-gray-700' : 'text-gray-400'}>
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
        <div className="absolute z-50 w-full mt-1 bg-white rounded-[4px] shadow-lg border border-gray-600">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              className={cn(
                'w-full px-4 h-[48px] py-2 text-left flex items-center justify-between transition-colors',
                'text-[14px] font-normal leading-[100%] tracking-[-0.03em]',
                'first:rounded-t-[4px] last:rounded-b-[4px]',
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
