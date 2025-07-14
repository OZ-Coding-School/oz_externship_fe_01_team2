import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import MypageProfile from '../components/myPage/MypageProfile'
import MypageCourse from '../components/myPage/MypageCourse'
import Button from '../components/common/Button/Button'
import WithdrawalModal from '../components/myPage/WithdrawalModal'
import UserProfileApi from '../api/user-profile/api'
// import UserWithdrawalApi from '../api/user-withdrawal/api' // API 임포트
import type { UserProfile } from '../types/UserProfile.type'

const MyPage = () => {
  const [showModal, setShowModal] = useState(false)
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

  const navigate = useNavigate()

  // 탈퇴 API 호출 + 처리 함수
  const handleWithdrawConfirm = async (data: {
    reason: string
    comment: string
  }) => {
    try {
      // 서버에 탈퇴 요청
      await UserWithdrawalApi.withdraw({
        reason: data.reason,
        reason_detail: data.comment,
        email: userData.email, // 필요 시 이메일 같이 넘기기 (API 요구사항에 맞게)
      })
      alert('회원 탈퇴가 정상적으로 처리되었습니다.')
      setShowModal(false)
      navigate('/') // 탈퇴 후 메인페이지로 이동하거나 원하는 페이지로 이동
    } catch (error) {
      console.error('회원 탈퇴 실패', error)
      alert(
        '회원 탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      )
    }
  }

  const handleEditClick = () => {
    navigate('/mypage/edit')
  }

  const fetchUserProfile = async () => {
    try {
      const response = await UserProfileApi.getUserProfile()
      console.log(response)
      setUserData(response)
    } catch (error) {
      console.error('API 실패', error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <div className="flex mx-auto max-w-[944px] min-h-screen pt-[108px]">
      <Sidebar />
      <main className="flex-1 max-w-[744px] mx-auto ml-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[32px] font-extrabold leading-[140%] tracking-[-0.03em]">
            내 정보
          </h2>
          <Button
            onClick={handleEditClick}
            className="w-[126px] h-[48px] rounded flex justify-center items-center"
          >
            <span className="whitespace-nowrap text-[16px] font-semibold leading-[140%] tracking-[-0.03em]">
              수정하기
            </span>
          </Button>
        </div>

        <MypageProfile userData={userData} />
        <MypageCourse />

        <div className="flex justify-between items-center pt-[30px] pb-[30px] mb-[195px] leading-relaxed">
          <div>
            <h3 className="text-[#9D9D9D] text-[20px] pb-[20px] leading-[140%] tracking-[-0.03em]">
              회원 탈퇴 안내
            </h3>
            <p className="text-[#BDBDBD] text-[14px] text-left leading-[140%] tracking-[-0.03em]">
              탈퇴 처리 시, 수강 기간 / 포인트 / 쿠폰은 소멸되며 환불되지
              않습니다.
              <br />
              필요한 경우, 반드시 탈퇴 전에 문의 바랍니다.
            </p>
          </div>
          <button
            className="font-semibold w-[142px] h-[48px] border border-[#cecece] bg-[#ececec] text-[#4d4d4d] rounded text-[16px] leading-[140%] tracking-[-0.03em] cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            회원 탈퇴하기
          </button>
        </div>
      </main>

      {showModal && (
        <WithdrawalModal
          onClose={() => setShowModal(false)}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </div>
  )
}

export default MyPage
