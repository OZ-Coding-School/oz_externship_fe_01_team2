// src/pages/QnaUpdatePage.tsx
import { useState } from 'react'
import QnaCategorySelect from '../components/qna/QnaCategorySelect'
import QnaTitleInput from '../components/qna/QnaTitleInput'
import MarkdownEditor from '../components/common/MarkdownEditor'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import { mockQuestionDetail } from '../components/Mocks/MockQuestionDetail'
import { mockCategories } from '../components/Mocks/MockCategories'

export default function QnaUpdatePage() {
  // 초기값 세팅 (카테고리 아이디는 minor만 바로 세팅, 나머지는 mockCategories로 역탐색)
  const initialMinorId = mockQuestionDetail.category.id

  // major, middle 찾기 (minor의 parent -> middle, middle의 parent -> major)
  const initialMiddleId =
    mockCategories.find((cat) => cat.id === initialMinorId)?.parent_id ?? null
  const initialMajorId =
    mockCategories.find((cat) => cat.id === initialMiddleId)?.parent_id ?? null

  const [majorId, setMajorId] = useState<number | null>(initialMajorId)
  const [middleId, setMiddleId] = useState<number | null>(initialMiddleId)
  const [minorId, setMinorId] = useState<number | null>(initialMinorId)

  const [title, setTitle] = useState(mockQuestionDetail.title)
  const [content, setContent] = useState(mockQuestionDetail.content)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // 저장(수정) 버튼 클릭 핸들러
  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !minorId) {
      setModalMsg('제목, 내용, 소분류를 모두 입력해주세요!')
      setModalOpen(true)
      return
    }

    setLoading(true)
    setTimeout(() => {
      // 실제 API 호출 시 여기서 PATCH 요청
      // 현재는 콘솔에 출력
      console.log('질문 수정 데이터:', {
        title,
        content,
        category_id: minorId,
      })
      setLoading(false)
      setModalMsg('질문이 정상적으로 수정되었습니다!')
      setModalOpen(true)
    }, 800)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-2">질문 수정하기</h1>
        <hr className="border-gray-250 mb-8" />
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-250">
          <QnaCategorySelect
            majorId={majorId}
            setMajorId={setMajorId}
            middleId={middleId}
            setMiddleId={setMiddleId}
            minorId={minorId}
            setMinorId={setMinorId}
          />
          <QnaTitleInput value={title} onChange={setTitle} />
        </div>

        <div className="mb-6">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해 주세요"
            height="500px"
            width="100%"
            showPreview
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="fill"
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !content.trim() || !minorId}
          >
            저장하기
          </Button>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center py-6 px-4">
          <h3 className="text-lg font-semibold text-gray mb-4">{modalMsg}</h3>
          <Button
            variant="fill"
            onClick={() => setModalOpen(false)}
            className="px-8"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  )
}
