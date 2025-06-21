//src/components/common/Button/Button.tsx


// 기본 사용
// import Button from './components/common/Button'

// <Button>확인</Button>
// variant별 사용
// <Button variant="fill">가입하기</Button>
// <Button variant="outline">취소</Button>
// <Button variant="ghost">닫기</Button>
// 비활성화 (ghost만 지원)
// <Button variant="ghost" disabled>비활성화</Button>
// 크기 및 스타일 커스터마이징
// <Button variant="fill" width="200px" height="50px" fontSize="18px" radius="8px"></Button>
// 전체 너비 버튼
// <Button variant="fill" width="100%" height="60px" fontSize="16px"></Button>

import React from 'react';
import type {ButtonProps} from './Button.types';

const Button: React.FC<ButtonProps> = ({
    variant = 'fill',     // 기본값: fill
    disabled = false,     // 기본값: false
    children,             // 버튼 텍스트
    onClick,
    radius ='4px',
    width = '156px',
    height = '48px',
    fontSize = '16px'
  }) => {
    
    const baseStyles = "px-6 py-3 focus:outline-none transition-colors";
    
    const getVariantStyles = () => {
        if (disabled) {
            if (variant === 'ghost') {
                return "bg-[rgba(236,236,236,1)] text-[rgba(189,189,189,1)] cursor-not-allowed";
            }
            // 나중에 다른 variant의 disabled 추가
        }
        
        if (variant === 'fill') {
            return "bg-[rgba(98,1,224,1)] text-[rgba(255,255,255,1)] hover:bg-[rgba(78,1,179,1)] active:bg-[rgba(59,1,134,1)]";
        }
        
        if (variant === 'outline') {
            return "bg-[rgba(236,236,236,1)] border border-[rgba(206,206,206,1)] text-[rgba(77,77,77,1)] active:bg-[rgba(239,230,252,1)] active:border-[rgba(98,1,224,1)] active:text-[rgba(98,1,224,1)]";
        }
        
        if (variant === 'ghost') {
            return "bg-[rgba(250,250,250,1)] text-[rgba(98,1,224,1)] hover:bg-[rgba(236,236,236,1)] active:bg-[rgba(189,189,189,1)]";
        }
        
        return "";
    };
    
    return (
        <button 
          className={`${baseStyles} ${getVariantStyles()}`}
          style={{borderRadius: radius,
            width: width,
            height: height,
            fontSize: fontSize
          }}
          disabled={disabled}
          onClick={disabled ? undefined : onClick}
        >
          {children}
        </button>
      );
    };
     
    export default Button;

    