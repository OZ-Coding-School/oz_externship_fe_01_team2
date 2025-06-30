// components/qna/QnaSortDropdown.tsx

import SortButton from '../common/Button/SortButton'

type Props = {
  currentSort: string
  onSelect: (val: '최신순' | '오래된순') => void
}

const QnaSortDropdown = ({ currentSort, onSelect }: Props) => {
  return (
    // QnaSortDropdown.tsx
    <div className="w-[138px] mr-[64px] bg-white p-4 rounded-xl shadow-lg flex flex-col gap-2 items-center">
      <SortButton
        label="최신순"
        selected={currentSort === '최신순'}
        onClick={() => onSelect('최신순')}
      />
      <SortButton
        label="오래된순"
        selected={currentSort === '오래된순'}
        onClick={() => onSelect('오래된순')}
      />
    </div>
  )
}

export default QnaSortDropdown
