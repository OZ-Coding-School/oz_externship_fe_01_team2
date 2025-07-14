import sortIcon from '@assets/icons/arrow-up-down.svg'
import filterIcon from '@assets/icons/options.svg'
import React, { useState } from 'react'
import QnaSortDropdown from './QnaSortDropdown'

type QnaTabProps = {
  selectedTab: string
  onSelectTab: (tab: string) => void
  sortOrder: '최신순' | '오래된순'
  onSortChange: (order: '최신순' | '오래된순') => void
  onClickFilter: () => void
}

const tabs = ['전체보기', '답변완료', '답변 대기중']

const QnaTab: React.FC<QnaTabProps> = ({
  selectedTab,
  onSelectTab,
  sortOrder,
  onSortChange,
  onClickFilter,
}) => {
  const [showSortModal, setShowSortModal] = useState(false)

  return (
    <div className="relative flex justify-between items-center border-b border-[#cecece] ">
      {/* 탭 버튼들 */}
      <div className="flex gap-10 text-[20px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSelectTab(tab)}
            className={`pb-1 border-b-2 transition font-bold cursor-pointer
              ${
                selectedTab === tab
                  ? 'border-[#6201E0] text-[#721ae3]'
                  : 'border-transparent text-[#bdbdbd]'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 정렬 + 필터 */}
      <div className="flex items-center gap-3 text-[16px] text-[#303030] cursor-pointer">
        {/* 최신순 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowSortModal((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer"
          >
            {sortOrder}
            <img
              src={sortIcon}
              alt="정렬 아이콘"
              className="w-[20px] h-[20px]"
            />
          </button>

          {/* ✅ 드롭다운 정중앙 정렬 */}
          {showSortModal && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-10">
              <QnaSortDropdown
                currentSort={sortOrder}
                onSelect={(val) => {
                  onSortChange(val)
                  setShowSortModal(false)
                }}
              />
            </div>
          )}
        </div>

        {/* 필터 버튼 */}
        <button
          onClick={onClickFilter}
          className="flex items-center gap-1 cursor-pointer"
        >
          필터
          <img
            src={filterIcon}
            alt="필터 아이콘"
            className="w-[20px] h-[20px]"
          />
        </button>
      </div>
    </div>
  )
}

export default QnaTab
