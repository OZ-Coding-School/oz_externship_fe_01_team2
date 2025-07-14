// components/LoginForm/WithdrawnAccountModal.tsx
import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import { Meh } from 'lucide-react'

interface WithdrawnAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onRecoverClick: () => void
}

export default function WithdrawnAccountModal({
  isOpen,
  onClose,
  onRecoverClick,
}: WithdrawnAccountModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
        <div className="flex flex-col items-center gap-[16px] mt-[10px]">
          <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] p-[4px] flex items-center justify-center rounded-full">
            <Meh />
          </div>
          <h2 className="text-[20px] text-[#121212] font-bold">
            해당 계정은 탈퇴된 상태예요.
          </h2>
          <p className="text-[14px] font-normal text-center text-[#4D4D4D]">
            2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.
            <br />
            계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
          </p>
        </div>

        <Button
          variant="fill"
          className="w-[348px] h-[52px] font-normal
        "
          onClick={onRecoverClick}
        >
          계정 다시 사용하기
        </Button>
      </div>
    </Modal>
  )
}
