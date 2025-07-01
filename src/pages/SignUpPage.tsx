import { Link } from 'react-router-dom'
import OzLogo from '../assets/images/common/renewal_ozcoding_logo_black.svg'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form>
        <div className="w-87 flex flex-col justify-center items-center mb-[64px]">
          <img
            src={OzLogo}
            alt="오즈코딩스쿨"
            className="w-[180px] h-[24px] mb-[27px]"
          />
          <div className="flex justify-center items-center h-[11px] gap-[12px]">
            <h3 className="font-medium">현재 회원이신가요?</h3>
            <Link to="*" className="text-[#6201E0] no-underline font-medium">
              로그인하기
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <button
            type="submit"
            className="flex items-center justify-center p-[8px] gap-[4px] bg-[#FEE500] rounded-[4px] w-full h-[52px] text-black font-normal"
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
            카카오로 3초만에 가입하기
          </button>

          <button
            type="submit"
            className="flex items-center justify-center mb-[36px] gap-[4px] bg-[#03C75A] h-[52px] p-[8px] text-white rounded-[4px] w-full font-normal"
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
            네이버로 가입하기
          </button>
        </div>
        <div className="text-center">
          <Link
            to="*"
            className="text-sm underline underline-offset-[2px] text-[16px] text-gray-600"
          >
            일반회원 가입
          </Link>
        </div>
      </form>
    </div>
  )
}
