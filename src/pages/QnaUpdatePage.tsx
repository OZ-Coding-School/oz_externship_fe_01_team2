import React, { useState } from 'react'
import { cn } from '../utils/cn'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import MarkdownEditor from '../components/common/MarkdownEditor'
import SingleDropdown from '../components/common/SingleDropdown'

interface QuestionImage {
  id: number
  img_url: string
}

interface QuestionData {
  title: string
  content: string
  category_id: number // 백엔드 기준
  images?: QuestionImage[] // 기존 첨부 이미지 (미리보기 용)
}

interface QnaUpdatePageProps {
  initialQuestion: QuestionData
}

const categoryOptions = [
  { id: 0, name: '카테고리 선택' },
  { id: 1, name: '개발' },
  { id: 2, name: '디자인' },
  { id: 3, name: '마케팅' },
  { id: 4, name: '기획' },
  // ... 실제 소분류(id)를 써야 함
]

const QnaUpdatePage: React.FC<QnaUpdatePageProps> = ({ initialQuestion }) => {
  const [title, setTitle] = useState(initialQuestion.title)
  const [content, setContent] = useState(initialQuestion.content)
  const [categoryId, setCategoryId] = useState(initialQuestion.category_id)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<QuestionImage[]>(
    initialQuestion.images || []
  )

  // 이미지 파일 첨부 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setImageFiles(files)
    // 미리보기 (첨부된 파일들만)
    // 만약 기존 이미지+새로 첨부한 이미지 둘 다 보여주고 싶으면 previewImages와 병합 가능
  }

  // 저장 버튼 클릭시 (현재는 디자인만)
  const handleUpdate = () => {
    if (!title.trim() || !content.trim() || !categoryId) {
      setModalMessage('모든 필수값을 입력해주세요.')
      setShowModal(true)
      return
    }
    setModalMessage('질문이 수정되었습니다! (실제 저장은 API 연동 필요)')
    setShowModal(true)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-2">질문 수정하기</h1>
        <hr className="border-gray-250 mb-8" />

        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-250">
          {/* 카테고리 드롭다운 (실제 소분류 id 기준) */}
          <div className="mb-6 w-1/3">
            <SingleDropdown
              options={categoryOptions.map((c) => c.name)}
              selected={
                categoryOptions.find((c) => c.id === categoryId)?.name || ''
              }
              placeholder="카테고리 선택"
              onChange={(value) => {
                const cat = categoryOptions.find((c) => c.name === value)
                setCategoryId(cat ? cat.id : 0)
              }}
            />
          </div>

          {/* 제목 입력 */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요 (최대 50자)"
            maxLength={50}
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors',
              'text-base bg-primary-50 border-gray-disabled text-gray',
              'focus:border-primary focus:bg-gray-50'
            )}
          />

          {/* 기존 이미지 미리보기 */}
          {previewImages.length > 0 && (
            <div className="mt-4 flex gap-3">
              {previewImages.map((img) => (
                <img
                  key={img.id}
                  src={img.img_url}
                  alt="첨부 이미지"
                  className="w-24 h-24 object-cover rounded border border-gray-250"
                />
              ))}
            </div>
          )}

          {/* 이미지 파일 첨부 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              이미지 첨부 (최대 5개)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-100 file:text-primary
                hover:file:bg-primary-50
              "
            />
            {/* 첨부한 이미지 파일명 보여주기 */}
            {imageFiles.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                {imageFiles.map((file, i) => (
                  <div key={i}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 내용(마크다운 에디터) */}
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

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <Button variant="fill" onClick={handleUpdate}>
            저장하기
          </Button>
        </div>
      </div>

      {/* 모달 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center py-6 px-4">
          <h3 className="text-lg font-semibold text-gray mb-4">
            {modalMessage}
          </h3>
          <Button
            variant="fill"
            onClick={() => setShowModal(false)}
            className="px-8"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default QnaUpdatePage
