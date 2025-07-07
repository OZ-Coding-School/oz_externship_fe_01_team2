import Sidebar from '../components/common/Sidebar'
import MypageProfile from '../components/myPage/MypageProfile'
import MypageCourse from '../components/myPage/MypageCourse'
import Button from '../components/common/Button/Button'

const MyPage = () => {
  return (
    <div className="flex mx-auto max-w-[944px] min-h-screen pt-[108px]">
      <Sidebar />

      <main className="flex-1 max-w-[744px] mx-auto">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[32px] font-extrabold leading-[140%] tracking-[-0.03em] font-[Pretendard]">
            내 정보
          </h2>
          <Button className="w-[126px] h-[48px] rounded flex justify-center items-center">
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
          <button className="font-semibold w-[142px] h-[48px] border border-[#cecece] bg-[#ececec] text-[#4d4d4d] rounded text-[16px] leading-[140%] tracking-[-0.03em]">
            회원 탈퇴하기
          </button>
        </div>
      </main>
    </div>
  )
}

export default MyPage
