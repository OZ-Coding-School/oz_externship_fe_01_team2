import React, { useState } from 'react'
import Button from '../components/common/Button'
import MarkdownEditor from '../components/common/MarkdownEditor'
import SingleDropdown from '../components/common/SingleDropdown'
// import Header from './components/common/Header'

// 타입 정의
interface TitleInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const TitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors"
      style={{
        fontSize: '16px',
        backgroundColor: 'rgba(247, 242, 255, 1)',
        borderColor: 'rgba(189, 189, 189, 1)',
        color: 'rgba(18, 18, 18, 1)',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'rgba(98, 1, 224, 1)'
        e.target.style.backgroundColor = 'rgba(250, 250, 250, 1)'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(189, 189, 189, 1)'
        e.target.style.backgroundColor = 'rgba(247, 242, 255, 1)'
      }}
    />
  )
}

const QuestionRegisterPage: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [category1, setCategory1] = useState<string>('')
  const [category2, setCategory2] = useState<string>('')
  // const [category3, setCategory3] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const category1Options: string[] = [
    '카테고리 선택',
    '개발',
    '디자인',
    '마케팅',
    '기획',
  ]
  const category2Options: string[] = [
    '상세 카테고리',
    'Frontend',
    'Backend',
    'DevOps',
    '모바일',
  ]
  const category3Options: string[] = [
    '세부 카테고리',
    'React',
    'Vue',
    'Angular',
    'Node.js',
  ]

  const handleSubmit = (): void => {
    // 등록
  }

  return (
    <div className="min-h-screen">
      {/* <Header /> */}

      <div
        className="mx-auto px-4 py-8"
        style={{
          width: '944px',
          height: '1095px',
        }}
      >
        <h1 className="text-2xl font-bold text-[#121212] mb-2">
          질문 작성하기
        </h1>
        <hr className="border-gray-300 mb-8" />

        <div
          className="bg-white rounded-lg p-6 mb-6"
          style={{
            border: '1px solid rgba(206, 206, 206, 1)',
          }}
        >
          <div className="grid grid-cols-3 gap-4 mb-6">
            <SingleDropdown
              options={category1Options}
              placeholder="대분류 선택"
              onChange={setCategory1}
            />
            <SingleDropdown
              options={category2Options}
              placeholder="중분류 선택"
              onChange={setCategory2}
              disabled={!category1}
            />
            <SingleDropdown
              options={category3Options}
              placeholder="소분류 선택"
              onChange={() => {}} // setCategory3
              disabled={!category2}
            />
          </div>

          <div className="mb-0">
            <TitleInput
              value={title}
              onChange={setTitle}
              placeholder="제목을 입력해 주세요"
            />
          </div>
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
            width="120px"
            height="48px"
          >
            등록하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionRegisterPage
