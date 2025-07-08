import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import MypageProfile from '../components/myPage/MypageProfile'
import MypageCourse from '../components/myPage/MypageCourse'
import Button from '../components/common/Button/Button'
import WithdrawalModal from '../components/myPage/WithdrawalModal' // 모달 import

const MyPage = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // handleWithdrawConfirm 함수가 이제 객체(data)를 인자로 받도록 수정합니다.
  const handleWithdrawConfirm = (data: { reason: string; comment: string }) => {
    console.log('탈퇴 사유:', data.reason)
    console.log('추가 의견:', data.comment) // 추가 의견도 이제 접근 가능
    // 여기에 실제 탈퇴 로직 (예: API 호출)을 추가합니다.
    setShowModal(false) // 모달 닫기
  }

  const handleEditClick = () => {
    navigate('/mypage/edit')
  }

  return (
    <div className="flex mx-auto max-w-[944px] min-h-screen pt-[108px]">
      <Sidebar />

      <main className="flex-1 max-w-[744px] mx-auto">
        {/* 헤더 영역 */}
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

        {/* 프로필 및 수강 정보 */}
        <MypageProfile />
        <MypageCourse />

        {/* 탈퇴 안내 */}
        <div className="flex justify-between items-center pt-[30px] pb-[30px] mb-[195px] leading-relaxed">
          {/* 왼쪽 안내 텍스트 */}
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

          {/* 오른쪽 버튼 */}
          <button
            className="font-semibold w-[142px] h-[48px] border border-[#cecece] bg-[#ececec] text-[#4d4d4d] rounded text-[16px] leading-[140%] tracking-[-0.03em] cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            회원 탈퇴하기
          </button>
        </div>
      </main>

      {/* 모달 렌더링 */}
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
