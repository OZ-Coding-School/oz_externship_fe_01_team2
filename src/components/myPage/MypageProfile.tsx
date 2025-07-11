// components/myPage/MypageProfile.tsx
import Avatar from '../common/Avatar'
import userAvatar from '../../assets/images/common/img_user_default.png'
import type { UserProfile } from '../../types/UserProfile.type'

interface MypageProfileProps {
  userData: UserProfile
}

const MypageProfile = ({ userData }: MypageProfileProps) => {
  return (
    <section className="rounded-lg p-12 mb-5 border border-[#D1D1D1]">
      {/* 프로필 타이틀 */}
      <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
        프로필
      </h2>

      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center mb-[52px]">
        <div className="w-[184px] h-[184px] rounded-full flex items-center justify-center mb-6">
          <Avatar
            name={userData.nickname || '사용자'}
            profileUrl={userData.profile_image_url || userAvatar}
            className="w-[184px] h-[184px] rounded-full"
          />
        </div>
      </div>

      {/* 닉네임 / 이메일 */}
      <div className="grid grid-cols-2 gap-y-6 max-w-[400px] mb-[100px] text-[#121212] text-[16px] font-normal leading-[140%] tracking-[-0.03em]">
        <p className="text-[18px]">닉네임</p>
        <p className="text-left">{userData.nickname || '정보 없음'}</p>
        <p className="text-[18px]">이메일</p>
        <p className="text-left">{userData.email || '정보 없음'}</p>
      </div>

      {/* 개인정보 */}
      <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
        개인정보
      </h2>
      <div className="grid grid-cols-2 gap-y-6 max-w-[400px] text-[16px] font-normal leading-[140%] tracking-[-0.03em] text-[#121212]">
        <p className="text-[18px]">이름</p>
        <p className="text-left">{userData.name || '정보 없음'}</p>
        <p className="text-[18px]">휴대전화</p>
        <p className="text-left">{userData.phone_number || '정보 없음'}</p>
        <p className="text-[18px]">생년월일</p>
        <p className="text-left">{userData.birthday || '정보 없음'}</p>
        <p className="text-[18px]">수강 과정</p>
        <p className="text-left">{userData.course_name || '정보 없음'}</p>
        <p className="text-[18px]">기수</p>
        <p className="text-left">{userData.generation || '정보 없음'}</p>
      </div>
    </section>
  )
}

export default MypageProfile
