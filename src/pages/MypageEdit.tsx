import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Button from '../components/common/Button/Button'
import userAvatar from '../assets/images/common/img_user_default.png'
import CamaraIcon from '../assets/icons/Camera.svg'
import FormInput from '../components/common/FormInput/FormInput'

const MypageEdit = () => {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('오즈오즈')
  const [phone, setPhone] = useState('010-1234-1234')

  const [nicknameError, setNicknameError] = useState('')
  const [nicknameSuccess, setNicknameSuccess] = useState(false)

  const handleNicknameCheck = () => {
    if (nickname === '오즈오즈') {
      setNicknameError('*동일한 닉네임이 존재합니다.')
      setNicknameSuccess(false)
    } else {
      setNicknameError('')
      setNicknameSuccess(true)
    }
  }

  const handlePhoneChange = () => {
    alert('휴대전화 변경 버튼 클릭됨')
  }

  const handleSave = () => {
    alert('저장되었습니다!')
    navigate(-1)
  }

  return (
    <div className="flex mx-auto max-w-[944px] min-h-screen pt-[108px]">
      <Sidebar />

      <main className="flex-1 max-w-[744px] mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[32px] font-extrabold leading-[140%] tracking-[-0.03em] font-[Pretendard]">
            내 정보
          </h2>
          <Button
            className="w-[126px] h-[48px] rounded flex justify-center items-center"
            onClick={handleSave}
          >
            <span className="whitespace-nowrap text-[16px] font-semibold leading-[140%] tracking-[-0.03em]">
              저장하기
            </span>
          </Button>
        </div>

        {/* 프로필 수정 */}
        <section className="rounded-lg p-12 mb-5 border border-[#D1D1D1]">
          <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
            프로필 수정
          </h2>

          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center mb-[52px]">
            <div className="w-[188px] h-[188px] rounded-full flex justify-center items-center relative">
              <img
                src={userAvatar}
                alt="프로필 이미지"
                className="w-[188px] h-[188px] rounded-full"
              />
              <div className="w-[60px] h-[60px] rounded-full bg-[#BDBDBD]"></div>
              <button
                title="프로필 사진 변경"
                className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 border-4 border-white"
              >
                <img
                  src={CamaraIcon}
                  alt="사진 변경"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <p className="text-[16px] font-normal leading-[140%] tracking-[-0.03em] mb-5">
            닉네임
          </p>
          <div className="flex w-full items-start gap-3 mb-2">
            <FormInput
              value={nickname}
              onChange={setNickname}
              placeholder="오즈오즈"
              hasError={!!nicknameError}
              errorMessage={nicknameError}
              hasSuccess={nicknameSuccess && !nicknameError}
              className="w-full"
            />
            <button
              onClick={handleNicknameCheck}
              className="w-[112px] h-[48px] border border-[#cecece] bg-[#ececec] text-[16px] rounded hover:text-[#6201E0] hover:bg-[#EFE6FC] hover:border-[#6201E0] 
              font-semibold leading-[140%] tracking-[-0.03em] text-center text-gray-600"
            >
              중복확인
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-10">
            * 한글 8자, 영문 및 숫자 16자까지 혼용할 수 있어요.
          </p>

          {/* 이메일 (아이디) */}
          <p className="text-[16px] font-normal leading-[140%] tracking-[-0.03em] mb-5">
            이메일 (아이디)
          </p>
          <FormInput
            type="email"
            value="ozschool1234@gmail.com"
            disabled
            className="mb-[100px] w-full"
          />

          {/* 개인 정보 수정 */}
          <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
            개인 정보 수정
          </h2>

          {/* 이름 */}
          <p className="text-[16px] font-normal leading-[140%] tracking-[-0.03em] mb-5">
            이름
          </p>
          <FormInput
            type="text"
            value="김오즈"
            disabled
            className="mb-10 w-full"
          />

          {/* 휴대전화 */}
          <p className="text-[16px] font-normal leading-[140%] tracking-[-0.03em] mb-5">
            휴대전화
          </p>
          <div className="flex w-full items-start gap-3 mb-2">
            <FormInput
              type="text"
              value={phone}
              onChange={setPhone}
              placeholder="010-1234-1234"
              className="mb-10 w-full"
            />
            <button
              onClick={handlePhoneChange}
              className="w-[112px] h-[48px] bg-[#EFE6FC] border border-[#6201E0] text-[#6201E0] px-3 py-2 text-sm rounded hover:bg-[#e0d4fa]
              font-semibold leading-[140%] tracking-[-0.03em] text-center"
            >
              변경
            </button>
          </div>

          {/* 생년월일 */}
          <p className="text-[16px] font-normal leading-[140%] tracking-[-0.03em] mb-5">
            생년월일
          </p>
          <FormInput
            type="text"
            value="2000.12.25"
            disabled
            className="mb-10 w-full"
          />
        </section>
      </main>
    </div>
  )
}

export default MypageEdit
