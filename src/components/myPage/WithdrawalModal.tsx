import { useState, useEffect } from 'react' // useEffect 임포트 추가
import { X } from 'lucide-react'
import type { WithdrawalModalProps } from '../../types/withdrawalModal.types'
import SingleDropdown from '../common/SingleDropdown'
import Textarea from '../common/Textarea'
import Button from '../common/Button/Button'

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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleConfirm = () => {
    onConfirm({ reason: selectedReason, comment: additionalComment })
    onClose()
  }

  const isTextareaDisabled = selectedReason !== '기타(직접 입력)'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/60">
      <div
        className={`bg-white rounded-xl w-[646px] p-6 shadow-xl relative transition-all duration-300
          ${selectedReason ? 'h-auto' : 'h-[535px]'}
        `}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 items-end"
        >
          <X />
        </button>
        {/* 제목 및 설명 */}
        <h2 className="text-xl font-bold pt-[10px] mb-10 text-left leading-normal tracking-tight">
          오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
        </h2>

        <p className="text-base font-normal text-[#bdbdbd] mb-10 leading-normal tracking-tight text-left">
          계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 / 포인트
          / 쿠폰 내역이 사라지며 환불되지 않습니다. 삭제된 정보는 복구할 수
          없습니다.
        </p>
        {/* SingleDropdown 적용 */}
        <div className="h-[48px] pb-[16px]">
          <SingleDropdown
            options={reasons}
            selected={selectedReason}
            onChange={(selected) => {
              setSelectedReason(selected)
              // '기타(직접 입력)'이 아닌 다른 이유를 선택하면 추가 의견 초기화
              if (selected !== '기타(직접 입력)') {
                setAdditionalComment('')
              }
            }}
            placeholder="해당되는 항목을 선택해 주세요."
          />
        </div>
        {/* 선택 이후 의견 입력 영역 */}
        {selectedReason && (
          <div>
            <p className="text-base font-normal text-gray-600 mt-10 mb-5 leading-[140%] tracking-[-0.03em] text-left">
              서비스를 이용하시면서 불편했거나 보완할 수 있는 방안을 알려주시면,
              서비스 개선에 적극적으로 반영하겠습니다. 감사합니다!
            </p>

            {/* Textarea 컴포넌트에 disabled 프롭스 적용 */}
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
              >
                회원 탈퇴하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WithdrawalModal
