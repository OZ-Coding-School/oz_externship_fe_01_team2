// src/components/common/SingleDropdown.tsx

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
  onChange?: (selected: string) => void
  styleConfig?: StyleConfig
  disabled?: boolean
}

export default function SingleDropdown({
  options,
  placeholder,
  onChange,
  styleConfig = {},
  disabled = false,
}: SingleDropdownProps) {
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const {
    bgColor = '#fff',
    hoverBgColor = '#EFE6FC',
    borderColor = '#BDBDBD',
    selectedTextColor = '#6200E0',
    disabledBgColor = '#F0F0F0',
  } = styleConfig

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen)

  const getButtonStyle = () => ({
    backgroundColor: disabled ? disabledBgColor : bgColor,
    borderColor,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  const getOptionStyle = (option: string) => ({
    backgroundColor: selectedValue === option ? '#fff' 
      : hoveredOption === option ? hoverBgColor : '#fff',
    color: selectedValue === option ? selectedTextColor : '#121212',
  })

  const getIconFilter = () => selectedValue
    ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
    : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'

  const isSelected = (option: string) => selectedValue === option

  return (
    <div className="relative w-full">
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className="w-full rounded-lg px-4 py-3 flex items-center justify-between border transition-colors"
        style={getButtonStyle()}
      >
        <span style={{ color: selectedValue ? '#121212' : '#BDBDBD' }}>
          {selectedValue || placeholder}
        </span>
        <img
          src={`src/assets/icons/common/expand_${isOpen ? 'less' : 'more'}.svg`}
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
            >
              <span>{option}</span>
              {isSelected(option) && (
                <img
                  src="src/assets/icons/common/check_mark.svg"
                  alt="체크 표시"
                  width={16}
                  height={16}
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)',
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