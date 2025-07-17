import UserWithdrawalApi from '@api/user-withdrawal/api'
import Button from '@components/common/Button/Button'
import SingleDropdown from '@components/common/SingleDropdown'
import Textarea from '@components/common/Textarea'
import type { WithdrawalModalProps } from '@custom-types/withdrawalModal.types'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@store/authStore'
import { isAxiosError } from 'axios'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const reasons = [
  '원하는 클래스가 없어서',
  '기대했던 클래스와 실제가 달라서',
  '사이트 UI/UX가 불편해서',
  '브랜드를 신뢰할 수 없어서',
  '부트캠프를 수강 완료해서',
  '기타(직접 입력)',
]

const WithdrawalModal = ({ onClose, onConfirm }: WithdrawalModalProps) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [additionalComment, setAdditionalComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const userEmail = useAuthStore().user?.email

  const toast = useToast()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleConfirm = async () => {
    if (!selectedReason || !userEmail) return

    setLoading(true)
    try {
      const payload = {
        email: userEmail,
        reason: selectedReason,
        reason_detail: additionalComment || '',
        due_date: new Date().toISOString().split('T')[0],
      }

      await UserWithdrawalApi.withdraw(payload)

      onConfirm({ reason: selectedReason, comment: additionalComment })
      onClose()
    } catch (error: unknown) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.show({
          message: error.message || '탈퇴 요청 중 오류가 발생했습니다.',
          type: 'error',
        })
      } else {
        toast.show({
          message: '알 수 없는 오류가 발생했습니다.',
          type: 'error',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const isTextareaDisabled = selectedReason !== '기타(직접 입력)'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/60">
      <div
        className={`bg-white rounded-xl w-[646px] p-6 shadow-xl relative transition-all duration-300
          ${selectedReason ? 'h-auto' : 'h-[535px]'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 items-end"
          type="button"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold pt-[10px] mb-10 text-left leading-normal tracking-tight">
          오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
        </h2>

        <p className="text-base font-normal text-[#bdbdbd] mb-10 leading-normal tracking-tight text-left">
          계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 / 포인트
          / 쿠폰 내역이 사라지며 환불되지 않습니다. 삭제된 정보는 복구할 수
          없습니다.
        </p>

        <div className="h-[48px] pb-[16px]">
          <SingleDropdown
            options={reasons}
            selected={selectedReason}
            onChange={(selected) => {
              setSelectedReason(selected)
              if (selected !== '기타(직접 입력)') {
                setAdditionalComment('')
              }
              setDropdownOpen(false)
            }}
            placeholder="해당되는 항목을 선택해 주세요."
            isOpen={isDropdownOpen}
            onToggle={toggleDropdown}
            disabled={loading}
          />
        </div>

        {selectedReason && (
          <div>
            <p className="text-base font-normal text-gray-600 mt-10 mb-5 leading-[140%] tracking-[-0.03em] text-left">
              서비스를 이용하시면서 불편했거나 보완할 수 있는 방안을 알려주시면,
              서비스 개선에 적극적으로 반영하겠습니다. 감사합니다!
            </p>

            <Textarea
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              placeholder="소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다."
              rows={6}
              disabled={isTextareaDisabled}
            />

            <div className="flex justify-center mt-6">
              <Button
                onClick={handleConfirm}
                variant="outline"
                className="px-6 py-3 rounded-md text-base font-semibold mb-6"
                disabled={loading}
              >
                {loading ? '처리 중...' : '회원 탈퇴하기'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WithdrawalModal
