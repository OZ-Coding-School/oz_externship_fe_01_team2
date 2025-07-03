// src/components/common/SingleDropdown.tsx

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
}: SingleDropdownProps) {
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((open) => !open)
  }

  const isSelected = (option: string) => selectedValue === option

  return (
    <div className="relative w-full">
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={cn(
          'w-full rounded-lg px-4 py-3 flex items-center justify-between border transition-colors',
          disabled
            ? 'bg-gray-100 border-gray-disabled text-gray-disabled cursor-not-allowed'
            : 'bg-white border-gray-250 text-gray-700 cursor-pointer'
        )}
      >
        <span
          className={cn(
            'truncate',
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
            'absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-250'
          )}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              className={cn(
                'w-full px-4 py-2 text-left transition-colors flex items-center justify-between first:rounded-t-lg last:rounded-b-lg',
                isSelected(option) && 'bg-white text-primary-600 font-semibold',
                !isSelected(option) &&
                  hoveredOption === option &&
                  'bg-primary-200 text-gray-700',
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
