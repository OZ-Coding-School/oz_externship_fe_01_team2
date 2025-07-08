import Sidebar from '../components/common/Sidebar'
import PasswordChangeForm from '../components/myPage/ChangePasswordForm'

const PasswordChangePage = () => {
  return (
    <div className="flex max-w-[944px] min-h-screen pt-[108px] mx-auto">
      <Sidebar />
      <main className="flex-1 px-10">
        {/* 비밀번호 변경 타이틀 */}
        <h2 className="text-[32px] font-extrabold leading-[140%] tracking-[-0.03em] font-[Pretendard] mb-5">
          비밀번호 변경
        </h2>
        <PasswordChangeForm />
      </main>
    </div>
  )
}

export default PasswordChangePage

// const MypageProfile = () => {
//   return (
//     <section className="rounded-lg p-12 mb-5 border border-[#D1D1D1]">
//       {/* 프로필 타이틀 */}
//       <h2 className="text-[#721AE3] text-[20px] font-bold mb-[52px] border-b border-[#bdbdbd] pb-4">
//         프로필
//       </h2>
