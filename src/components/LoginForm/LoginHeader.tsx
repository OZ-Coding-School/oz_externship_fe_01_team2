import React from 'react'
import { Link } from 'react-router-dom'
import ozLogo from '../../assets/images/common/renewal_ozcoding_logo_black.svg'

const LoginHeader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-[64px]">
      <img
        src={ozLogo}
        alt="오즈코딩스쿨"
        className="w-[180px] h-[24px] mb-[27px]"
      />
      <div className="flex justify-center items-center h-[11px] gap-[12px]">
        <h3 className="font-medium">아직 회원이 아니신가요?</h3>
        <Link to="/signup" className="text-[#6201E0] no-underline font-medium">
          회원가입하기
        </Link>
      </div>
    </div>
  )
}

export default LoginHeader
