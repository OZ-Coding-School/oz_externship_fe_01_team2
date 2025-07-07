import userAvatar from '../../assets/images/common/img_user_default.png'

const MypageProfile = () => {
  return (
    <section className="rounded-lg p-12 mb-5 border border-[#D1D1D1]">
      {/* 프로필 타이틀 */}
      <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
        프로필
      </h2>

      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center mb-[52px]">
        <div className="w-[184px] h-[184px] rounded-full flex items-center justify-center mb-6">
          <img
            src={userAvatar}
            alt="프로필 이미지"
            className="w-[184px] h-[184px] rounded-full"
          />
          {/* <Avatar
            name={question.nickname}
            profileUrl={userAvatar}
            className="w-[184px] h-[184px] rounded-full"
          /> */}
        </div>
      </div>

      {/* 닉네임 / 이메일 */}
      <div className="grid grid-cols-2 gap-y-6 max-w-[400px] mb-[100px] text-[#121212] text-[16px] font-normal leading-[140%] tracking-[-0.03em]">
        <p className="text-[18px]">닉네임</p>
        <p className="text-left">오즈오즈</p>
        <p className="text-[18px]">이메일</p>
        <p className="text-left">ozschool1234@gmail.com</p>
      </div>

      {/* 개인정보 타이틀 */}
      <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
        개인정보
      </h2>

      {/* 개인정보 목록 */}
      <div className="grid grid-cols-2 gap-y-6 max-w-[400px] text-[16px] font-normal leading-[140%] tracking-[-0.03em] text-[#121212]">
        <p className="text-[18px]">이름</p>
        <p className="text-left">김오조</p>
        <p className="text-[18px]">휴대전화</p>
        <p className="text-left">010 - 1234 - 1234</p>
        <p className="text-[18px]">생년월일</p>
        <p className="text-left">2000.12.25</p>
      </div>
    </section>
  )
}

export default MypageProfile
