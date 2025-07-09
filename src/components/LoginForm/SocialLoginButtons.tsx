import React from 'react'

interface SocialLoginButtonsProps {
  className?: string
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  className,
}) => {
  return (
    <div className="flex flex-col gap-[12px] mb-[40px]">
      <button
        type="button"
        className={`w-[348px] h-[52px] flex items-center justify-center gap-[4px] bg-[#FEE500] text-black font-normal rounded-[4px] ${className || ''}`}
      >
        <svg
          width="16"
          height="214"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16px] h-[14px]"
        >
          <path
            d="M6.99533 0C3.39972 0 0.5 2.31659 0.5 5.12896C0.5 6.95447 1.70628 8.55295 3.51571 9.46564L2.90328 11.7499C2.89174 11.7841 2.88997 11.8209 2.89816 11.856C2.90636 11.8912 2.92419 11.9235 2.94969 11.9491C2.98685 11.9818 3.03468 11.9999 3.08423 12C3.12532 11.9968 3.1643 11.9805 3.19557 11.9537L5.83084 10.1792C6.21984 10.2328 6.61196 10.2606 7.00469 10.2626C10.5957 10.2626 13.5 7.94599 13.5 5.12896C13.5 2.31196 10.5863 0 6.99533 0Z"
            fill="#392020"
          />
        </svg>
        카카오 간편 로그인 / 가입
      </button>

      <button
        type="button"
        className={`w-[348px] h-[52px] flex items-center justify-center gap-[4px] bg-[#03C75A] text-white font-normal rounded-[4px] ${className || ''}`}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[20px] h-[21px]"
        >
          <rect width="20" height="21" fill="none" />
          <path
            d="M5.015 18.4h4.765v-6.457L14.21 18.4h4.78V5.6h-4.765v6.458L9.78 5.6H5.015v12.8z"
            fill="white"
          />
        </svg>
        네이버 간편 로그인 / 가입
      </button>
    </div>
  )
}

export default SocialLoginButtons
