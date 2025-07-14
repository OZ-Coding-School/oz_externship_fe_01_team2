import UserDefaultImage from '@assets/images/common/img_user_default.png'
import LogoImage from '@assets/images/common/renewal_ozcoding_logo_black.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 로그인 여부
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }
  return (
    <header className="border-b border-gray-200 bg-white">
      {/* 상단 공지 배너 */}
      <div className="bg-black text-white h-12 flex items-center justify-center">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>

      {/* 메인 헤더 */}
      <div className="container flex justify-between items-center h-16">
        {/* 좌측 로고 및 네비 */}
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

        {/* 우측 로그인 / 유저 메뉴 */}
        <div className="text-base text-gray-600">
          {!isLoggedIn ? (
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
              <button
                onClick={toggleDropdown}
                className="cursor-pointer text-purple-500 text-2xl rounded-full overflow-hidden"
              >
                <img src={UserDefaultImage} alt="" />
              </button>
              {showDropdown && (
                <div
                  className="absolute left-0 mt-7 bg-white rounded-md drop-shadow-xl py-6 px-4 z-10 text-sm"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="mb-2 border-b border-gray-200 pb-5">
                    <div className="font-semibold mb-3">오즈오즈</div>
                    <div className="text-gray-400 text-sm">
                      ozschool1234@gmail.com
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      {/* 수강등록 전 */}
                      <Link
                        to="/submit"
                        className="block bg-[#EFE6FC] text-[#6201E0] px-2 py-2.5 font-medium"
                      >
                        수강생 등록
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mypage"
                        className="block hover:bg-[#EFE6FC] transition-all duration-300 hover:text-[#6201E0] px-2 py-2.5 font-medium"
                      >
                        마이페이지
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full cursor-pointer transition-all duration-300 text-left block hover:text-[#6201E0] px-2 py-2.5 font-medium"
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
