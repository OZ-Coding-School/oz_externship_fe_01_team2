import Button from '@components/common/Button'
import { UserRound } from 'lucide-react'

interface IdSuccessProps {
  email: string
  onFindPw: () => void
  onClose: () => void
}

export default function IdSuccess({
  email,
  onFindPw,
  onClose,
}: IdSuccessProps) {
  function maskEmail(email: string): string {
    const [id, domain] = email.split('@')
    if (id.length <= 2) {
      return '*'.repeat(id.length) + '@' + domain
    }
    const visible = id.slice(0, 2)
    const masked = '*'.repeat(id.length - 2)
    return `${visible}${masked}@${domain}`
  }
  return (
    <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[24px]">
      <div className="flex flex-col items-center gap-[5px]">
        <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] flex items-center justify-center rounded-full p-1">
          <UserRound />
        </div>
        <h2 className="font-bold text-[18px]">아이디 찾기</h2>
        <p className="text-[14px] font-normal text-[#4D4D4D]">
          입력하신 정보와 일치하는 아이디입니다.
        </p>
      </div>
      <div className="flex justify-center items-center w-[348px] h-[93px] border border-[#BDBDBD] rounded-[4px] bg-[#ECECEC] text-[18px] font-semibold">
        {maskEmail(email)}
      </div>
      <div className="flex gap-[12px]">
        <Button
          variant="check"
          className="w-[168px] h-[48px]"
          onClick={onClose}
        >
          로그인
        </Button>
        <Button
          variant="fill"
          className="w-[168px] h-[48px] p-0"
          onClick={onFindPw}
        >
          비밀번호찾기
        </Button>
      </div>
    </div>
  )
}
