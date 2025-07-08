import { Link } from 'react-router-dom'
import AuthHeader from '../components/LoginForm/AuthHeader'
import SocialLoginButtons from '../components/LoginForm/SocialLoginButtons'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form>
        <AuthHeader
          message="현재 회원이신가요?"
          linkText="로그인하기"
          linkTo="/login"
        />

        <SocialLoginButtons />

        <div className="text-center">
          <Link
            to="/signupform"
            className="text-sm underline underline-offset-[2px] text-[16px] text-gray-600"
          >
            일반회원 가입
          </Link>
        </div>
      </form>
    </div>
  )
}
