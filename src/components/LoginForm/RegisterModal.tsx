// components/LoginForm/WithdrawnAccountModal.tsx
import Modal from '../common/Modal'
import Button from '../common/Button'
import { Check } from 'lucide-react'
import SingleDropdown from '../common/SingleDropdown'
import { useState } from 'react'
import { useToast } from '@hooks/useToast'
import axios, { AxiosError } from 'axios'
import { getAccessToken } from '@store/authStore'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const courseOptions = [
    '웹 개발 초격차 프론트엔드 부트캠프',
    '웹 개발 초격차 백엔드 부트캠프',
    'IT스타트업 실무형 사업 개발자(BD) 부트캠프',
    '스타트업 맞춤형 프로덕트 디자이너',
  ]
  const toast = useToast()
  const batchOptions = ['10기', '11기', '12기', '13기', '14기', '15기']

  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')

  const [isCourseOpen, setIsCourseOpen] = useState(false)
  const [isBatchOpen, setIsBatchOpen] = useState(false)

  const accessToken = getAccessToken()

  const handleCourseSelect = (value: string) => {
    setSelectedCourse(value)
    setIsCourseOpen(false)
  }

  const handleBatchSelect = (value: string) => {
    setSelectedBatch(value)
    setIsBatchOpen(false)
  }

  const handleRegister = async () => {
    try {
      const generationNumber = parseInt(selectedBatch.replace('기', ''), 10)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/users/student/enrollments/`,
        { generation: generationNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (response.status === 201) {
        toast.show({
          message: '수강신청에 성공했습니다!',
          type: 'success',
        })
        onClose()
      }
    } catch (err) {
      const error = err as AxiosError

      if (error.response?.status === 400) {
        toast.show({ message: '이미 신청한 기수입니다.', type: 'error' })
      } else {
        toast.show({
          message: '수강신청에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        })
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
        <div className="flex flex-col items-center gap-[16px] mt-[10px]">
          <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] flex items-center justify-center rounded-full p-1">
            <Check />
          </div>
          <h2 className="text-[20px] text-[#121212] font-bold">
            내 과정 선택하기
          </h2>
          <p className="text-[14px] font-normal text-center text-[#4D4D4D]">
            해당하는 과정과 기수를 선택해 주세요.
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          <SingleDropdown
            options={courseOptions}
            placeholder="수강중인 과정을 선택해 주세요."
            onChange={handleCourseSelect}
            selected={selectedCourse}
            isOpen={isCourseOpen}
            onToggle={() => {
              setIsCourseOpen((prev) => !prev)
              setIsBatchOpen(false) // 다른 드롭다운 닫기
            }}
            className="w-[348px] h-[48px]"
          />

          <SingleDropdown
            options={batchOptions}
            placeholder="기수를 선택해 주세요."
            onChange={handleBatchSelect}
            selected={selectedBatch}
            isOpen={isBatchOpen}
            onToggle={() => {
              setIsBatchOpen((prev) => !prev)
              setIsCourseOpen(false)
            }}
          />
        </div>
        <Button
          variant={selectedCourse && selectedBatch ? 'fill' : 'ghost'}
          className="w-[348px] h-[52px] font-normal"
          disabled={!(selectedCourse && selectedBatch)}
          onClick={handleRegister}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  )
}
