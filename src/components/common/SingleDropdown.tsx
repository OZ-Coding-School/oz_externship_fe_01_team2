// src/components/common/SingleDropdown.tsx

import ExpandMoreIcon from '../../assets/icons/common/expand_more.svg'
import ExpandLessIcon from '../../assets/icons/common/expand_less.svg'
import CheckMarkIcon from '../../assets/icons/common/check_mark.svg'
import { useState } from 'react'

interface StyleConfig {
  bgColor?: string
  hoverBgColor?: string
  borderColor?: string
  selectedTextColor?: string
  disabledBgColor?: string
}

interface SingleDropdownProps {
  options: string[]
  placeholder: string
  selected: string // ⭐️ 외부에서 상태 관리 (컨트롤러드)
  onChange?: (selected: string) => void
  styleConfig?: StyleConfig
  disabled?: boolean
}

export default function SingleDropdown({
  options,
  placeholder,
  selected,
  onChange,
  styleConfig = {},
  disabled = false,
}: SingleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const {
    bgColor = '#fff',
    hoverBgColor = '#EFE6FC',
    borderColor = '#BDBDBD',
    selectedTextColor = '#6200E0',
    disabledBgColor = '#F0F0F0',
  } = styleConfig

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen)

  const handleSelect = (option: string) => {
    setIsOpen(false)
    onChange?.(option)
  }

  // 스타일 함수에서 selectedValue 대신 selected 사용
  const getButtonStyle = () => ({
    backgroundColor: disabled ? disabledBgColor : bgColor,
    borderColor,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  const getOptionStyle = (option: string) => ({
    backgroundColor:
      selected === option
        ? '#fff'
        : hoveredOption === option
          ? hoverBgColor
          : '#fff',
    color: selected === option ? selectedTextColor : '#121212',
  })

  const getIconFilter = () =>
    selected
      ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
      : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'

  return (
    <div className="relative w-full">
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className="w-full rounded-lg px-4 py-3 flex items-center justify-between border transition-colors"
        style={getButtonStyle()}
        type="button"
      >
        <span style={{ color: selected ? '#121212' : '#BDBDBD' }}>
          {selected || placeholder}
        </span>
        <img
          src={isOpen ? ExpandLessIcon : ExpandMoreIcon}
          width={16}
          height={16}
          alt={`${isOpen ? '위로' : '아래로'} 화살표`}
          style={{ filter: getIconFilter() }}
        />
      </button>
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg"
          style={{ border: `1px solid ${borderColor}` }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
              style={getOptionStyle(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              type="button"
            >
              <span>{option}</span>
              {selected === option && (
                <img
                  src={CheckMarkIcon}
                  alt="체크 표시"
                  width={16}
                  height={16}
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
