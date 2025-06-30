import React, { useState } from 'react'
import { cn } from '../utils/cn'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import MarkdownEditor from '../components/common/MarkdownEditor'
import SingleDropdown from '../components/common/SingleDropdown'

interface Category {
  id: number
  name: string
  parent_id?: number
}

interface TitleInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

interface CreateQuestionRequest {
  category_id: number
  title: string
  content: string
  image_files?: File[]
}

interface CreateQuestionResponse {
  id: number
  title: string
  content: string
  author: number
  category: number
  view_count: number
  created_at: string
  updated_at: string
  images: Array<{
    id: number
    img_url: string
    created_at: string
    updated_at: string
  }>
}

const TitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={cn(
      'w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors',
      'text-base bg-primary-50 border-gray-disabled text-gray',
      'focus:border-primary focus:bg-gray-50'
    )}
    maxLength={50}
  />
)

const QnaCreatePage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const categoryOptions = {
    category1: [
      { id: 0, name: '카테고리 선택' },
      { id: 1, name: '개발' },
      { id: 2, name: '디자인' },
      { id: 3, name: '마케팅' },
      { id: 4, name: '기획' },
    ],
    category2: [
      { id: 0, name: '상세 카테고리' },
      { id: 11, name: 'Frontend', parent_id: 1 },
      { id: 12, name: 'Backend', parent_id: 1 },
      { id: 13, name: 'DevOps', parent_id: 1 },
      { id: 14, name: '모바일', parent_id: 1 },
    ],
    category3: [
      { id: 0, name: '세부 카테고리' },
      { id: 111, name: 'React', parent_id: 11 },
      { id: 112, name: 'Vue', parent_id: 11 },
      { id: 113, name: 'Angular', parent_id: 11 },
      { id: 121, name: 'Django', parent_id: 12 },
      { id: 122, name: 'Node.js', parent_id: 12 },
    ],
  }

  const extractImageUrlsFromMarkdown = (content: string): string[] => {
    const imageRegex = /(?:!\[.*?\]\((.*?)\)|<img[^>]*src=["'](.*?)["'])/g
    const urls: string[] = []
    let match

    while ((match = imageRegex.exec(content)) !== null) {
      urls.push(match[1] || match[2])
    }

    return urls.filter(Boolean)
  }

  const downloadImageAsFile = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url)
      if (!response.ok) return null

      const blob = await response.blob()
      const extension = blob.type.split('/')[1] || 'jpg'
      const fileName = url.startsWith('blob:')
        ? `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${extension}`
        : url.split('/').pop()?.split('?')[0] || `image_${Date.now()}.jpg`

      return new File([blob], fileName, { type: blob.type })
    } catch {
      return null
    }
  }

  const extractImagesFromMarkdown = async (
    content: string
  ): Promise<File[]> => {
    const imageUrls = extractImageUrlsFromMarkdown(content)
    if (!imageUrls.length) return []

    const files = await Promise.all(imageUrls.map(downloadImageAsFile))
    return files.filter(Boolean) as File[]
  }

  const createQuestion = async (
    data: CreateQuestionRequest
  ): Promise<CreateQuestionResponse> => {
    const formData = new FormData()
    formData.append('category_id', data.category_id.toString())
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image_files && data.image_files.length > 0) {
      data.image_files.forEach((file) => {
        formData.append('image_files', file)
      })
    }

    const response = await fetch('/api/v1/qna/questions/create/', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('질문 등록에 실패했습니다.')
    }

    return response.json()
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setModalMessage('질문 제목과 내용을 입력해주세요')
      setShowModal(true)
      return
    }

    const selectedCategory = categoryOptions.category3.find(
      (cat) => cat.name === category3
    )
    if (!selectedCategory || selectedCategory.id === 0) {
      setModalMessage('유효한 소분류 카테고리를 선택해주세요.')
      setShowModal(true)
      return
    }

    setIsLoading(true)

    try {
      const markdownImages = await extractImagesFromMarkdown(content)
      const requestData: CreateQuestionRequest = {
        category_id: selectedCategory.id,
        title: title.trim(),
        content: content.trim(),
        image_files: markdownImages.length > 0 ? markdownImages : undefined,
      }

      await createQuestion(requestData)

      setTitle('')
      setContent('')
      setCategory1('')
      setCategory2('')
      setCategory3('')
      setModalMessage('질문이 등록되었습니다!')
      setShowModal(true)
    } catch (err) {
      setModalMessage(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      )
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const getFilteredCategories = (level: 'category2' | 'category3') => {
    const parentLevel = level === 'category2' ? 'category1' : 'category2'
    const parentValue = level === 'category2' ? category1 : category2
    const defaultCategory = categoryOptions[level][0]

    const selected = (
      categoryOptions[parentLevel as keyof typeof categoryOptions] as Category[]
    ).find((cat: Category) => cat.name === parentValue)

    if (!selected || selected.id === 0) return [defaultCategory]
    return categoryOptions[level].filter(
      (cat) => cat.id === 0 || cat.parent_id === selected.id
    )
  }

  const isButtonDisabled =
    isLoading ||
    !category1 ||
    !category2 ||
    !category3 ||
    category1 === '카테고리 선택' ||
    category2 === '상세 카테고리' ||
    category3 === '세부 카테고리'

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-2">질문 작성하기</h1>
        <hr className="border-gray-250 mb-8" />

        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-250">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <SingleDropdown
              options={categoryOptions.category1.map((cat) => cat.name)}
              placeholder="대분류 선택"
              onChange={(value) => {
                setCategory1(value)
                setCategory2('')
                setCategory3('')
              }}
            />
            <SingleDropdown
              options={getFilteredCategories('category2').map(
                (cat) => cat.name
              )}
              placeholder="중분류 선택"
              onChange={(value) => {
                setCategory2(value)
                setCategory3('')
              }}
              disabled={!category1 || category1 === '카테고리 선택'}
            />
            <SingleDropdown
              options={getFilteredCategories('category3').map(
                (cat) => cat.name
              )}
              placeholder="소분류 선택"
              onChange={setCategory3}
              disabled={!category2 || category2 === '상세 카테고리'}
            />
          </div>

          <TitleInput
            value={title}
            onChange={setTitle}
            placeholder="제목을 입력해 주세요 (최대 50자)"
          />
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
            disabled={isButtonDisabled}
          >
            {isLoading ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>

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

export default QnaCreatePage
