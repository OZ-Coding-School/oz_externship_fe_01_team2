// components/LoginForm/RegisterModal.tsx
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import SingleDropdown from '../common/SingleDropdown'
import { useToast } from '../../hooks/useToast'
import RegisterApi from '../../api/register/api'
import type { Course, Generation } from '../../api/register/types'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const toast = useToast()
  const accessToken = localStorage.getItem('accessToken')

  const [courses, setCourses] = useState<Course[]>([])
  const [generations, setGenerations] = useState<Generation[]>([])

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedGeneration, setSelectedGeneration] =
    useState<Generation | null>(null)

  const [isCourseOpen, setIsCourseOpen] = useState(false)
  const [isBatchOpen, setIsBatchOpen] = useState(false)

  // 과정 목록 불러오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await RegisterApi.getCourses()
        setCourses(data)
      } catch {
        toast.show({ message: '과정 목록 불러오기 실패', type: 'error' })
      }
    }
    fetchCourses()
  }, [])

  // 과정 선택 → 기수 목록 불러오기
  const handleCourseSelect = async (courseName: string) => {
    const course = courses.find((c) => c.name === courseName)
    if (!course) return

    setSelectedCourse(course)
    setSelectedGeneration(null)
    setIsCourseOpen(false)
    setIsBatchOpen(false)

    try {
      const data = await RegisterApi.getGenerations(course.id)
      setGenerations(data)
    } catch {
      toast.show({ message: '기수 목록 불러오기 실패', type: 'error' })
    }
  }

  // 기수 선택
  const handleGenerationSelect = (generationName: string) => {
    const generation = generations.find((g) => g.name === generationName)
    if (!generation) return

    setSelectedGeneration(generation)
    setIsBatchOpen(false)
  }

  // 수강 신청
  const handleRegister = async () => {
    if (!selectedGeneration) return

    try {
      await RegisterApi.register(
        { generation_id: selectedGeneration.id },
        accessToken || ''
      )
      toast.show({ message: '수강신청에 성공했습니다!', type: 'success' })
      onClose()
    } catch (err: any) {
      if (err?.response?.status === 400) {
        toast.show({ message: '이미 신청한 기수입니다.', type: 'error' })
      } else {
        toast.show({ message: '수강신청에 실패했습니다.', type: 'error' })
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
            options={courses.map((c) => c.name)}
            placeholder="수강중인 과정을 선택해 주세요."
            selected={selectedCourse?.name || ''}
            onChange={handleCourseSelect}
            isOpen={isCourseOpen}
            onToggle={() => {
              setIsCourseOpen((prev) => !prev)
              setIsBatchOpen(false)
            }}
            className="w-[348px] h-[48px]"
          />

          <SingleDropdown
            options={generations.map((g) => g.name)}
            placeholder="기수를 선택해 주세요."
            selected={selectedGeneration?.name || ''}
            onChange={handleGenerationSelect}
            isOpen={isBatchOpen}
            onToggle={() => {
              setIsBatchOpen((prev) => !prev)
              setIsCourseOpen(false)
            }}
            className="w-[348px] h-[48px]"
          />
        </div>

        <Button
          variant={selectedCourse && selectedGeneration ? 'fill' : 'ghost'}
          className="w-[348px] h-[52px] font-normal"
          disabled={!(selectedCourse && selectedGeneration)}
          onClick={handleRegister}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  )
}
