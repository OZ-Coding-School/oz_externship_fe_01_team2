import Button from '@components/common/Button'
import MarkdownEditor from '@components/common/MarkdownEditor'
import QnaCategorySelect from '@components/qna/QnaCategorySelect'
import QnaTitleInput from '@components/qna/QnaTitleInput'
import { useState } from 'react'

export default function QnaCreatePage() {
  const [title, setTitle] = useState('')
  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 w-[944px]">
        <h1 className="text-2xl font-bold text-gray mb-3">질문 작성하기</h1>
        <hr className="border-gray-250 mb-8" />

        <div className="rounded-lg p-6 mb-6 border border-gray-250">
          <div className="mb-6">
            <QnaCategorySelect />
          </div>
          <QnaTitleInput value={title} onChange={setTitle} />
        </div>

        <div className="mb-6">
          <MarkdownEditor placeholder="내용을 입력해 주세요." showPreview />
        </div>

        <div className="flex justify-end">
          <Button>등록하기</Button>
        </div>
      </div>
    </div>
  )
}
