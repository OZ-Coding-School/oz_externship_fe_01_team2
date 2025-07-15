import UserDefaultImage from '@assets/images/common/img_user_default.png'
import LogoImage from '@assets/images/common/renewal_ozcoding_logo_black.svg'
import { useDropdownPosition } from '@hooks/useDropdownPosition'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@store/authStore'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterModal from '../LoginForm/RegisterModal'
import Avatar from './Avatar'

const Header = () => {
  const { user, logout: authLogout } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const { ref, position } = useDropdownPosition<HTMLDivElement>(showDropdown)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  const toast = useToast()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await authLogout()
      toast.show({ message: '로그아웃 했습니다!', type: 'success' })
      navigate('/')
      setShowDropdown(false)
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        toast.show({
          message: error.message || '로그아웃 중 오류가 발생했습니다.',
          type: 'error',
        })
      } else {
        toast.show({
          message: '알 수 없는 오류가 발생했습니다.',
          type: 'error',
        })
      }
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="bg-black text-white h-12 flex items-center justify-center">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>

      <div className="container flex justify-between items-center h-16">
        <div className="flex items-center gap-15">
          <Link to="/">
            <img src={LogoImage} alt="oz코딩스쿨" />
          </Link>
          <nav className="flex gap-15 text-lg font-medium text-gray-800">
            <Link to="/community" className="p-2.5">
              커뮤니티
            </Link>
            <Link to="/qna" className="p-2.5">
              질의응답
            </Link>
          </nav>
        </div>

        <div className="text-base text-gray-600">
          {!user ? (
            <div className="flex gap-2.5 items-center">
              <Link to="/login" className="p-2">
                로그인
              </Link>
              <span>|</span>
              <Link to="/signup" className="p-2">
                회원가입
              </Link>
            </div>
          ) : (
            <div className="relative w-10 h-10 ">
              <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
              />
              <button
                onClick={toggleDropdown}
                className="cursor-pointer w-full h-full"
              >
                <Avatar
                  name={user.nickname}
                  profileUrl={user.profile_image_url || UserDefaultImage}
                  className="w-full h-full"
                />
              </button>
              {showDropdown && (
                <div
                  ref={ref}
                  className={`absolute mt-7 bg-white rounded-md drop-shadow-xl py-6 px-4 z-10 text-sm
                    ${position === 'right' ? 'right-0' : 'left-0'}
                  `}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="mb-2 border-b border-gray-200 pb-5">
                    <div className="font-semibold mb-3">{user.nickname}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      {/* 수강등록 전 */}
                      <button
                        onClick={() => setIsRegisterOpen(true)}
                        className="cursor-pointer block w-full bg-primary-100 text-primary px-2 py-2.5 font-medium text-left"
                      >
                        수강생 등록
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/mypage"
                        className="cursor-pointer block w-full transition-all duration-300 hover:text-primary px-2 py-2.5 font-medium"
                      >
                        마이페이지
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full cursor-pointer transition-all duration-300 text-left block hover:text-primary px-2 py-2.5 font-medium"
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
