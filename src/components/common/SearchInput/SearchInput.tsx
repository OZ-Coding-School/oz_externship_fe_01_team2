// SearchInput.tsx

// 포커스되면 x 아이콘 생기면서, 테두리 색깔변경
// 텍스트입력 후 바깥쪽 클릭하면 x 아이콘 사라지며, 테두리 색깔변경

// 사용방법
// import SearchInput from './components/common/SearchInput
// <SearchInput />

import React, {useState} from 'react'; // 추가

const SearchInput: React.FC = () => {

    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleClear = () => {
        setInputValue('');
    };


    return (
        <div className="relative w-[472px]">
            
            <img 
                src="/Search.svg" 
                alt="검색" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            
            
            <input 
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="질문 검색"
                className="w-[472px] h-[42px] border rounded-[1000px] bg-[rgba(250,250,250,1)] border-[rgba(189,189,189,1)] focus:outline-none focus:border-[rgba(98,1,224,1)] pl-12 pr-12 font-normal text-[14px] leading-none tracking-[-0.03em] text-[rgba(18,18,18,1)]"
            />
            
           
            {inputValue && isFocused && (
                <img 
                    src="/X.svg" 
                    alt="지우기" 
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                />
            )}
        </div>
    );
};


export default SearchInput;