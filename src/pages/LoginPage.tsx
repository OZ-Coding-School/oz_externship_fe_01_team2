import { Link } from 'react-router-dom'
import Modal from '../components/common/Modal'
import { useState } from 'react'

export default function LoginPage() {
  const [isFindIdModalOpen, setIsFindIdModalOpen] = useState(false)
  const [isFindPwModalOpen, setIsFindPwModalOpen] = useState(false)

  const handleOpenFindIdModal = () => setIsFindIdModalOpen(true)
  const handleCloseFindIdModal = () => setIsFindIdModalOpen(false)

  const handleOpenFindPwModal = () => setIsFindPwModalOpen(true)
  const handleCloseFindPwModal = () => setIsFindPwModalOpen(false)

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="p-8 mt-15 w-full max-w-md">
        <h1 className="text-2xl font-black text-gray-800 mb-5 text-center">
          OZ<span className="text-[#8e62c6]">.</span> 오즈코딩스쿨
        </h1>
        <form className="space-y-4">
          <div className="flex justify-center items-center gap-2">
            <h3>아직 회원이 아니신가요?</h3>
            <Link to="*" className="text-[#6201E0] no-underline">
              회원가입하기
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-15">
            <button
              type="submit"
              style={{ backgroundColor: '#FEE500' }}
              className="flex items-center justify-center gap-2 hover:bg-yellow-400 py-4 rounded w-full text-black font-normal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M6.99533 0C3.39972 0 0.5 2.31659 0.5 5.12896C0.5 6.95447 1.70628 8.55295 3.51571 9.46564L2.90328 11.7499C2.89174 11.7841 2.88997 11.8209 2.89816 11.856C2.90636 11.8912 2.92419 11.9235 2.94969 11.9491C2.98685 11.9818 3.03468 11.9999 3.08423 12C3.12532 11.9968 3.1643 11.9805 3.19557 11.9537L5.83084 10.1792C6.21984 10.2328 6.61196 10.2606 7.00469 10.2626C10.5957 10.2626 13.5 7.94599 13.5 5.12896C13.5 2.31196 10.5863 0 6.99533 0Z"
                  fill="#391C1A"
                />
              </svg>
              카카오 간편 로그인 / 가입
            </button>

            <button
              type="submit"
              style={{ backgroundColor: '#03C75A' }}
              className="flex items-center justify-center gap-2 hover:bg-green-600 text-white py-4 rounded w-full font-normal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  d="M5.015 18.4h4.765v-6.457L14.21 18.4h4.78V5.6h-4.765v6.458L9.78 5.6H5.015v12.8z"
                  fill="white"
                />
              </svg>
              네이버 간편 로그인 / 가입
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-10">
            <input
              id="passwordCheck"
              type="password"
              placeholder="아이디 (example@gmail.com)"
              className="border p-3 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
            />

            <input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              className="border p-3 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleOpenFindIdModal}
              className="text-sm underline-none text-gray-600"
            >
              아이디 찾기
            </button>
            <span className="text-gray-600"> | </span>
            <button
              type="button"
              onClick={handleOpenFindPwModal}
              className="text-sm no-underline text-gray-600"
            >
              비밀번호 찾기
            </button>

            {/* 아이디 찾기 모달 */}
            <Modal isOpen={isFindIdModalOpen} onClose={handleCloseFindIdModal}>
              <div className="flex flex-col items-center gap-4 max-w-[396px] max-h-[522px]">
                <div className="text-center">
                  <p>아이콘</p>
                  <h2>아이디찾기</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm">
                    이름<span className="text-[#f04141]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    className="border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
                  />
                </div>
              </div>
            </Modal>

            {/* 비밀번호 찾기 모달 */}
            <Modal isOpen={isFindPwModalOpen} onClose={handleCloseFindPwModal}>
              <div>비밀번호 찾기 내용</div>
            </Modal>
          </div>

          <button
            type="submit"
            className=" mb-5 w-full py-4 bg-[#ECECEC] text-[#BDBDBD] p-3 rounded-sm font-normal text-sm"
          >
            일반회원 로그인
          </button>
        </form>
      </div>
    </div>
  )
}
