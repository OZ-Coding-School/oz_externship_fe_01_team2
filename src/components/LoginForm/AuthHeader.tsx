import ozLogo from '@assets/images/common/renewal_ozcoding_logo_black.svg'
import { Link } from 'react-router-dom'

interface AuthHeaderProps {
  message: string
  linkText: string
  linkTo: string
}

const AuthHeader = ({ message, linkText, linkTo }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center mb-[64px]">
      <img
        src={ozLogo}
        alt="오즈코딩스쿨"
        className="w-[180px] h-[24px] mb-[27px]"
      />
      <div className="flex justify-center items-center h-[11px] gap-[12px]">
        <h3 className="font-medium">{message}</h3>
        <Link to={linkTo} className="text-[#6201E0] no-underline font-medium">
          {linkText}
        </Link>
      </div>
    </div>
  )
}

export default AuthHeader
