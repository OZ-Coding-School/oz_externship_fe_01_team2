import { useRef, useState } from 'react'
import searchIcon from '../../assets/icons/search.svg'
import clearIcon from '../../assets/icons/x_mark.svg'
import pencilIcon from '../../assets/icons/pencil.svg'
import Button from '../common/Button/Button'

type Props = {
  query: string
  setQuery: (val: string) => void
}

const QnaSearch = ({ query, setQuery }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const isFilled = query.length > 0

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div
        className={`flex items-center w-full max-w-[472px] px-4 py-2 rounded-full
          border transition 
          ${isFocused ? 'border-[#6201E0]' : 'border-[#D1D1D1]'}
          bg-[#FAFAFA]
        `}
      >
        <img
          src={searchIcon}
          alt="검색 아이콘"
          className="w-[20px] h-[20px] mr-2 opacity-60"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="질문 검색"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 bg-transparent text-[14px] placeholder-[#C5C5C5] outline-none
            ${isFilled || isFocused ? 'text-black' : 'text-[#C5C5C5]'}
          `}
        />

        {(isFilled || isFocused) && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
            className="ml-2"
          >
            <img
              src={clearIcon}
              alt="입력 지우기"
              className="w-[20px] h-[20px] opacity-60 hover:opacity-100 transition"
            />
          </button>
        )}
      </div>

      <Button
        to="/qna/create"
        variant="fill"
        className="w-[126px] h-[48px] text-[16px] rounded-[4px] flex items-center justify-center gap-2"
        onClick={() => console.log('질문하기 클릭')}
      >
        <img src={pencilIcon} alt="질문하기" className="w-[20px] h-[20px]" />
        <span className="whitespace-nowrap">질문하기</span>
      </Button>
    </div>
  )
}

export default QnaSearch
