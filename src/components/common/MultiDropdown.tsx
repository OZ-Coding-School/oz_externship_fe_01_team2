// src/components/common/MultiDropdown.tsx

import { useState } from 'react';

interface DropdownLevel {
  options: string[];
  placeholder: string;
}

interface StyleConfig {
  bgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  selectedTextColor?: string;
  disabledBgColor?: string;
}

interface MultiDropdownProps {
  levels: DropdownLevel[];
  direction?: 'row' | 'column';
  onChange?: (selected: string[]) => void;
  styleConfig?: StyleConfig;
}

export default function MultiDropdown({
  levels,
  direction = 'row',
  onChange,
  styleConfig = {}
}: MultiDropdownProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(Array(levels.length).fill(''));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const {
    bgColor = '#fff',
    hoverBgColor = '#EFE6FC',
    borderColor = '#BDBDBD',
    selectedTextColor = '#6200E0',
    disabledBgColor = '#F0F0F0'
  } = styleConfig;

  const handleSelect = (stepIndex: number, option: string) => {
    const newSelected = [...selectedValues];
    newSelected[stepIndex] = option;
    for (let i = stepIndex + 1; i < newSelected.length; i++) {
      newSelected[i] = '';
    }
    setSelectedValues(newSelected);
    setOpenIndex(null);
    onChange?.(newSelected);
  };

  return (
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} gap-4`}>
      {levels.map((level, i) => {
        const isDisabled = i > 0 && !selectedValues[i - 1];
        const isOpen = openIndex === i;
        const selected = selectedValues[i];

        return (
          <div key={i} className="relative w-full">
            <button
              disabled={isDisabled}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full rounded-lg px-4 py-3 flex items-center justify-between border transition-colors"
              style={{
                backgroundColor: isDisabled ? disabledBgColor : bgColor,
                borderColor: borderColor,
                cursor: isDisabled ? 'not-allowed' : 'pointer'
              }}
            >
              <span style={{ color: selected ? '#121212' : '#BDBDBD' }}>
                {selected || level.placeholder}
              </span>
              <img
                src={isOpen ? '/top.svg' : '/bottom.svg'}
                width={16}
                height={16}
                style={{
                  filter: selected
                    ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                    : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                }}
              />
            </button>

            {isOpen && (
              <div
                className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow"
                style={{ border: `1px solid ${borderColor}` }}
              >
                {level.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(i, option)}
                    className="w-full px-4 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
                    style={{
                      backgroundColor: selected === option ? bgColor : '#fff',
                      color: selected === option ? selectedTextColor : '#121212'
                    }}
                    onMouseEnter={(e) => {
                      if (selected !== option) e.currentTarget.style.backgroundColor = hoverBgColor;
                    }}
                    onMouseLeave={(e) => {
                      if (selected !== option) e.currentTarget.style.backgroundColor = '#fff';
                    }}
                  >
                    <span>{option}</span>
                    {selected === option && (
                      <img
                        src="/vector.svg"
                        alt="체크 표시"
                        width={16}
                        height={16}
                        style={{
                          filter:
                            'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)'
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


// 이런식으로 작성하시면 됩니다
// import MultiDropdown from '../common/MultiDropdown';

// export default function DropdownExample() {
//   return (
//     <div className="p-8">
//       <h2 className="text-xl font-bold mb-4">3단 드롭다운 (가로 배치)</h2>

//       <MultiDropdown
//         direction="row" // 👈 가로 배치
//         levels={[
//           {
//             options: ['프론트엔드', '백엔드'],
//             placeholder: '대분류 선택',
//           },
//           {
//             options: ['JavaScript', 'HTML', 'CSS'],
//             placeholder: '중분류 선택',
//           },
//           {
//             options: ['React', '배열'],
//             placeholder: '소분류 선택',
//           },
//         ]}
//         styleConfig={{
//           bgColor: '#fff',
//           hoverBgColor: '#EFE6FC',
//           borderColor: '#BDBDBD',
//           selectedTextColor: '#6200E0',
//           disabledBgColor: '#F0F0F0',
//         }}
//         onChange={(selected) => {
//           console.log('선택된 값:', selected);
//         }}
//       />
//     </div>
//   );
// }