// src/components/qna/Dropdown.tsx

import {useState} from 'react';

export default function DropDown() {

    // 첫 번째 드롭다운
    const [firstDroDown, setFirstDropDown]  = useState(false);
    const [selectedFirst, setSelectedFirst] = useState('');  // 빈 상태로 시작!
    
    // 두 번째 드롭다운 
    const [secondDropDown, setSecondDropDown] = useState(false);
    const [selectedSecond, setSelectedSecond] = useState('');  // 빈 상태로 시작!
    
    // 세 번째 드롭다운 
    const [thirdDropDown, setThirdDropDown] = useState(false);
    const [selectedThird, setSelectedThird] = useState('');  // 빈 상태로 시작!

    const firstOptions = ['프론트엔드', '백엔드'];
    const secondOptions = ['프로그래밍 언어', '웹 프레임워크', 'Web'];
    const thirdOptions = ['Python', 'JavaScript', 'Java'];

    // 첫 번째 드롭다운에서 옵션을 선택했을 때
    const handleFirstSelect = (option) => {
        setSelectedFirst(option);     
        setFirstDropDown(false);      
    };
    
    // 두 번째 드롭다운 함수
    const handleSecondSelect = (option) => {
        setSelectedSecond(option);
        setSecondDropDown(false);
    };
    
    // 세 번째 드롭다운 함수
    const handleThirdSelect = (option) => {
        setSelectedThird(option);
        setThirdDropDown(false);
    };

    // 마우스 이벤트 핸들러들
    const handleMouseEnter = (e, isActive) => {
        if (isActive) {
            e.target.style.backgroundColor = 'rgba(250, 250, 250, 1)';
            const icon = e.target.querySelector('svg');
            const text = e.target.querySelector('span');
            if (icon) icon.style.color = 'rgba(18, 18, 18, 1)';
            if (text) text.style.color = 'rgba(18, 18, 18, 1)';
        }
    };

    const handleMouseLeave = (e, isActive, hasSelected) => {
        if (isActive) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            const icon = e.target.querySelector('svg');
            const text = e.target.querySelector('span');
            if (icon) icon.style.color = 'rgba(189, 189, 189, 1)';
            if (text && !hasSelected) text.style.color = 'rgba(189, 189, 189, 1)';
        }
    };

    const handleFocus = (e, isActive) => {
        if (isActive) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            const icon = e.target.querySelector('svg');
            const text = e.target.querySelector('span');
            if (icon) icon.style.color = 'rgba(18, 18, 18, 1)';
            if (text) text.style.color = 'rgba(18, 18, 18, 1)';
        }
    };

    const handleBlur = (e, isActive, hasSelected) => {
        if (isActive) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            const icon = e.target.querySelector('svg');
            const text = e.target.querySelector('span');
            if (icon) icon.style.color = 'rgba(189, 189, 189, 1)';
            if (text && !hasSelected) text.style.color = 'rgba(189, 189, 189, 1)';
        }
    };
     
    return(
        <div className = "p-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
                
                {/* 첫 번째 - 드롭다운 */}
                <div className="relative">
                    <button
                        onClick={() => setFirstDropDown(!firstDroDown)}
                        className="w-full rounded-lg px-4 py-3 flex items-center justify-between transition-colors"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            border: firstDroDown 
                                ? '1px solid rgba(112, 112, 112, 1)' 
                                : '1px solid rgba(189, 189, 189, 1)'
                        }}
                        onMouseEnter={(e) => !firstDroDown && handleMouseEnter(e, true)}
                        onMouseLeave={(e) => !firstDroDown && handleMouseLeave(e, true, selectedFirst)}
                        onFocus={(e) => !firstDroDown && handleFocus(e, true)}
                        onBlur={(e) => !firstDroDown && handleBlur(e, true, selectedFirst)}
                    >
                        <span 
                            style={{ 
                                color: firstDroDown 
                                    ? 'rgba(18, 18, 18, 1)' 
                                    : selectedFirst 
                                        ? 'rgba(18, 18, 18, 1)' 
                                        : 'rgba(189, 189, 189, 1)' 
                            }}
                        >
                            {selectedFirst || '대분류를 선택해 주세요.'}
                        </span>
                        {firstDroDown ? (
                            <img 
                                src="/top.svg" 
                                alt="위 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        ) : (
                            <img 
                                src="/bottom.svg" 
                                alt="아래 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: selectedFirst 
                                        ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                        : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        )}
                    </button>
                    
                    {firstDroDown && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg" style={{ border: '1px solid rgba(189, 189, 189, 1)' }}>
                            {firstOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleFirstSelect(option)}
                                    className="w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg flex items-center justify-between transition-colors"
                                    style={{
                                        backgroundColor: selectedFirst === option ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                        color: selectedFirst === option ? 'rgba(98, 1, 224, 1)' : 'rgba(18, 18, 18, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedFirst !== option) {
                                            e.target.style.backgroundColor = 'rgba(239, 230, 252, 1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedFirst !== option) {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                                        }
                                    }}
                                >
                                    <span>{option}</span>
                                    {selectedFirst === option && (
                                        <img 
                                            src="/vector.svg" 
                                            alt="체크 표시" 
                                            width={16} 
                                            height={16}
                                            style={{ 
                                                filter: 'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)'
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 두 번째 - 첫 번째가 선택되어야 활성화 */}
                <div className="relative">
                    <button
                        onClick={() => selectedFirst ? setSecondDropDown(!secondDropDown) : null}
                        disabled={!selectedFirst}
                        className="w-full rounded-lg px-4 py-3 flex items-center justify-between transition-colors"
                        style={{
                            backgroundColor: selectedFirst ? 'rgba(255, 255, 255, 1)' : 'rgba(240, 240, 240, 1)',
                            border: secondDropDown 
                                ? '1px solid rgba(112, 112, 112, 1)' 
                                : '1px solid rgba(189, 189, 189, 1)',
                            cursor: selectedFirst ? 'pointer' : 'not-allowed'
                        }}
                        onMouseEnter={(e) => !secondDropDown && handleMouseEnter(e, selectedFirst)}
                        onMouseLeave={(e) => !secondDropDown && handleMouseLeave(e, selectedFirst, selectedSecond)}
                        onFocus={(e) => !secondDropDown && handleFocus(e, selectedFirst)}
                        onBlur={(e) => !secondDropDown && handleBlur(e, selectedFirst, selectedSecond)}
                    >
                        <span 
                            style={{ 
                                color: secondDropDown 
                                    ? 'rgba(18, 18, 18, 1)' 
                                    : selectedSecond 
                                        ? 'rgba(18, 18, 18, 1)' 
                                        : 'rgba(189, 189, 189, 1)' 
                            }}
                        >
                            {selectedSecond || '중분류 선택'}
                        </span>
                        {secondDropDown ? (
                            <img 
                                src="/top.svg" 
                                alt="위 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        ) : (
                            <img 
                                src="/bottom.svg" 
                                alt="아래 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: selectedSecond 
                                        ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                        : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        )}
                    </button>
                    
                    {secondDropDown && selectedFirst && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg" style={{ border: '1px solid rgba(189, 189, 189, 1)' }}>
                            {secondOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSecondSelect(option)}
                                    className="w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg flex items-center justify-between transition-colors"
                                    style={{
                                        backgroundColor: selectedSecond === option ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                        color: selectedSecond === option ? 'rgba(98, 1, 224, 1)' : 'rgba(18, 18, 18, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedSecond !== option) {
                                            e.target.style.backgroundColor = 'rgba(239, 230, 252, 1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedSecond !== option) {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                                        }
                                    }}
                                >
                                    <span>{option}</span>
                                    {selectedSecond === option && (
                                        <img 
                                            src="/vector.svg" 
                                            alt="체크 표시" 
                                            width={16} 
                                            height={16}
                                            style={{ 
                                                filter: 'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)'
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 세 번째 - 두 번째가 선택되어야 활성화 */}
                <div className="relative">
                    <button
                        onClick={() => selectedSecond ? setThirdDropDown(!thirdDropDown) : null}
                        disabled={!selectedSecond}
                        className="w-full rounded-lg px-4 py-3 flex items-center justify-between transition-colors"
                        style={{
                            backgroundColor: selectedSecond ? 'rgba(255, 255, 255, 1)' : 'rgba(240, 240, 240, 1)',
                            border: thirdDropDown 
                                ? '1px solid rgba(112, 112, 112, 1)' 
                                : '1px solid rgba(189, 189, 189, 1)',
                            cursor: selectedSecond ? 'pointer' : 'not-allowed'
                        }}
                        onMouseEnter={(e) => !thirdDropDown && handleMouseEnter(e, selectedSecond)}
                        onMouseLeave={(e) => !thirdDropDown && handleMouseLeave(e, selectedSecond, selectedThird)}
                        onFocus={(e) => !thirdDropDown && handleFocus(e, selectedSecond)}
                        onBlur={(e) => !thirdDropDown && handleBlur(e, selectedSecond, selectedThird)}
                    >
                        <span 
                            style={{ 
                                color: thirdDropDown 
                                    ? 'rgba(18, 18, 18, 1)' 
                                    : selectedThird 
                                        ? 'rgba(18, 18, 18, 1)' 
                                        : 'rgba(189, 189, 189, 1)' 
                            }}
                        >
                            {selectedThird || '소분류 선택'}
                        </span>
                        {thirdDropDown ? (
                            <img 
                                src="/top.svg" 
                                alt="위 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        ) : (
                            <img 
                                src="/bottom.svg" 
                                alt="아래 화살표" 
                                width={16} 
                                height={16}
                                style={{ 
                                    filter: selectedThird 
                                        ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                        : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(167deg) brightness(95%) contrast(88%)'
                                }}
                            />
                        )}
                    </button>
                    
                    {thirdDropDown && selectedSecond && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg" style={{ border: '1px solid rgba(189, 189, 189, 1)' }}>
                            {thirdOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleThirdSelect(option)}
                                    className="w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg flex items-center justify-between transition-colors"
                                    style={{
                                        backgroundColor: selectedThird === option ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                        color: selectedThird === option ? 'rgba(98, 1, 224, 1)' : 'rgba(18, 18, 18, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedThird !== option) {
                                            e.target.style.backgroundColor = 'rgba(239, 230, 252, 1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedThird !== option) {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                                        }
                                    }}
                                >
                                    <span>{option}</span>
                                    {selectedThird === option && (
                                        <img 
                                            src="/vector.svg" 
                                            alt="체크 표시" 
                                            width={16} 
                                            height={16}
                                            style={{ 
                                                filter: 'brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7483%) hue-rotate(265deg) brightness(89%) contrast(114%)'
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
