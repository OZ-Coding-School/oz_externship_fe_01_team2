import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Button from '../components/common/Button/Button'
import userAvatar from '../assets/images/common/img_user_default.png'
import Avatar from '../components/common/Avatar'
import CamaraIcon from '../assets/icons/Camera.svg'
import FormInput from '../components/common/FormInput/FormInput'
import type { UserProfile } from '../types/UserProfile.type'
import UserProfileApi from '../api/user-profile/api'

const MypageEdit = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState<UserProfile>({
    profile_image_url: '',
    email: '',
    nickname: '',
    name: '',
    phone_number: '',
    birthday: '',
    course_name: '',
    generation: '',
  })

  const [nicknameError, setNicknameError] = useState('')
  const [nicknameSuccess, setNicknameSuccess] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인 후 이용 가능합니다.')
      navigate('/login')
      return
    }

    const fetchProfile = async () => {
      try {
        const data = await UserProfileApi.getUserProfile()
        setUserData(data)
      } catch (error) {
        console.error('프로필 정보를 불러오는 데 실패했습니다.', error)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleNicknameCheck = async () => {
    if (!userData.nickname.trim()) {
      setNicknameError('*닉네임을 입력해주세요.')
      setNicknameSuccess(false)
      return
    }

    try {
      const result = await UserProfileApi.checkNickname(userData.nickname)
      if (result.isDuplicated === false) {
        setNicknameError('')
        setNicknameSuccess(true)
      } else {
        setNicknameError('*동일한 닉네임이 존재합니다.')
        setNicknameSuccess(false)
      }
    } catch {
      setNicknameError('*중복 확인 중 오류가 발생했습니다.')
      setNicknameSuccess(false)
    }
  }

  const validatePhone = (phone: string) => {
    const regex = /^010-\d{4}-\d{4}$/
    return regex.test(phone)
  }

  const handleSave = async () => {
    if (!nicknameSuccess) {
      alert('닉네임 중복 확인을 해주세요.')
      return
    }

    if (!validatePhone(userData.phone_number)) {
      alert('올바른 휴대폰 번호 형식을 입력해주세요. 예: 010-1234-5678')
      return
    }

    try {
      await UserProfileApi.updateUserProfile({
        nickname: userData.nickname,
        phone_number: userData.phone_number,
        profile_image_file: profileImage || undefined,
      })
      alert('저장되었습니다!')
      navigate(-1)
    } catch (error) {
      console.error('저장 중 오류 발생:', error)
      alert('저장에 실패했습니다.')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profile_image_url: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex mx-auto max-w-[944px] min-h-screen pt-[108px]">
      <Sidebar />
      <main className="flex-1 max-w-[744px] mx-auto ml-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[32px] font-extrabold leading-[140%] tracking-[-0.03em]">
            내 정보
          </h2>
          <Button
            className="w-[126px] h-[48px] flex items-center justify-center"
            onClick={handleSave}
          >
            <span className="text-[16px] font-semibold whitespace-nowrap">
              저장하기
            </span>
          </Button>
        </div>

        {/* 프로필 수정 */}
        <section className="rounded-lg p-12 mb-5 border border-[#D1D1D1]">
          <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b pb-4">
            프로필 수정
          </h2>

          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center mb-[52px]">
            <div className="relative w-[188px] h-[188px]">
              <Avatar
                name={userData.nickname || '사용자'}
                profileUrl={userData.profile_image_url || userAvatar}
                className="w-[188px] h-[188px] rounded-full object-cover z-0"
              />

              <label
                htmlFor="profileUpload"
                className="absolute bottom-0 right-0 z-10 flex bg-gray-300 rounded-full p-2 border-4 border-white cursor-pointer"
              >
                <img
                  src={CamaraIcon}
                  alt="사진 변경"
                  className="w-[32px] h-[32px]"
                />
              </label>

              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* 닉네임 */}
          <p className="text-[16px] mb-2">닉네임</p>
          <div className="flex items-start gap-3 mb-2">
            <FormInput
              value={userData.nickname}
              onChange={(value: string) =>
                setUserData((prev) => ({ ...prev, nickname: value }))
              }
              placeholder="오즈오즈"
              hasError={!!nicknameError}
              errorMessage={nicknameError}
              hasSuccess={nicknameSuccess && !nicknameError}
              className="w-full"
            />
            <button
              onClick={handleNicknameCheck}
              className="w-[112px] h-[48px] border border-[#cecece] bg-[#ececec] rounded text-sm font-semibold hover:bg-[#EFE6FC] hover:border-[#6201E0] hover:text-[#6201E0]"
            >
              중복확인
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-10">
            * 한글 8자, 영문 및 숫자 16자까지 혼용할 수 있어요.
          </p>

          {/* 이메일 */}
          <p className="text-[16px] mb-2">이메일 (아이디)</p>
          <FormInput
            type="email"
            value={userData.email}
            disabled
            className="mb-[100px] w-full"
          />

          {/* 개인 정보 수정 */}
          <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b pb-4">
            개인 정보 수정
          </h2>

          {/* 이름 */}
          <p className="text-[16px] mb-2">이름</p>
          <FormInput
            type="text"
            value={userData.name}
            disabled
            className="mb-10 w-full"
          />

          {/* 휴대전화 */}
          <p className="text-[16px] mb-2">휴대전화</p>
          <FormInput
            type="text"
            value={userData.phone_number}
            onChange={(value: string) =>
              setUserData((prev) => ({ ...prev, phone_number: value }))
            }
            placeholder="010-1234-5678"
            className="mb-10 w-full"
          />

          {/* 생년월일 */}
          <p className="text-[16px] mb-2">생년월일</p>
          <FormInput
            type="text"
            value={userData.birthday}
            disabled
            className="mb-10 w-full"
          />
        </section>
      </main>
    </div>
  )
}

export default MypageEdit
