import React, { useState } from 'react'

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-[472px]">
      <img
        src="src/assets/icons/common/search.svg"
        alt="검색"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="질문 검색"
        className="w-[472px] h-[42px] border rounded-[1000px] bg-[rgba(250,250,250,1)] border-[rgba(189,189,189,1)] focus:outline-none focus:border-[rgba(98,1,224,1)] pl-12 pr-12 font-normal text-[14px] leading-none tracking-[-0.03em] text-[rgba(18,18,18,1)]"
      />
      {inputValue && isFocused && (
        <img
          src="src/assets/icons/common/x_mark.svg"
          alt="지우기"
          onClick={() => setInputValue('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
        />
      )}
    </div>
  )
}

export default SearchInput
