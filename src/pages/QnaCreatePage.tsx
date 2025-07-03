// src/pages/QnaCreatePage.tsx
import { useState } from 'react'
import QnaCategorySelect from '../components/qna/QnaCategorySelect'
import QnaTitleInput from '../components/qna/QnaTitleInput'
import MarkdownEditor from '../components/common/MarkdownEditor'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'

export default function QnaCreatePage() {
  const [majorId, setMajorId] = useState<number | null>(null)
  const [middleId, setMiddleId] = useState<number | null>(null)
  const [minorId, setMinorId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !minorId) {
      setModalMsg('제목, 내용, 소분류를 모두 입력해주세요!')
      setModalOpen(true)
      return
    }
    setLoading(true)
    setTimeout(() => {
      // 실제로는 여기에 API 호출을 넣으면 됨
      // (개발 중에는 아래 log를 살려도 되고, 배포 시에는 주석처리/삭제)
      // eslint-disable-next-line no-console
      console.log('질문 등록 데이터:', {
        title,
        content,
        category_id: minorId,
      })
      setLoading(false)
      setModalMsg('질문이 정상적으로 등록되었습니다!')
      setModalOpen(true)
      setTitle('')
      setContent('')
      setMajorId(null)
      setMiddleId(null)
      setMinorId(null)
    }, 800)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-2">질문 작성하기</h1>
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
            {loading ? '등록 중...' : '등록하기'}
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
