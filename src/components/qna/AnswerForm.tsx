import { useState } from 'react'
import { useToast } from '../../hooks/useToast'
import type { User } from '../../types/auth'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import MarkdownEditor from '../common/MarkdownEditor'

interface AnswerFormProps {
  user: User
  questionId: number
}

const AnswerForm = ({ user, questionId }: AnswerFormProps) => {
  const [content, setContent] = useState('')
  const [imageFiles, setImageFiles] = useState([] as File[])
  const [isReplying, setIsReplying] = useState(false)
  const toast = useToast()

  // 답변 작성 후 저장하는 함수
  const handleReset = () => {
    setContent('')
    setImageFiles([])
    setIsReplying(false)
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('content', content) // 실제 텍스트 입력
    imageFiles?.forEach((file) => {
      formData.append('image_files', file) // 실제 File 객체 append
    })
    try {
      if (!content.trim()) {
        toast.show({ message: '답변 내용을 입력해주세요.', type: 'error' })
        return
      }
      // const response = await axios.post(
      //   `http://54.180.237.77/api/v1/qna/questions/${questionId}/answers/`,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       accept: 'application/json',
      //     },
      //   }
      // )
      handleReset()
      toast.show({ message: '답변이 저장되었습니다!', type: 'success' })
    } catch {
      toast.show({ message: '답변 저장 실패', type: 'error' })
    }
  }
  return (
    <div className="border border-gray-250 rounded-3xl mb-25">
      <div className="flex items-center justify-between py-10 px-9">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} profileUrl={user.profileUrl} />
          <div>
            <div className="text-primary text-xs">{user.name}님, </div>
            <div className="text-lg font-semibold text-gray-800">
              정보를 공유해 주세요.
            </div>
          </div>
        </div>
        {isReplying ? (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="px-0 rounded-full w-28"
              onClick={handleReset}
            >
              취소하기
            </Button>
            <Button className="px-0 rounded-full w-28" onClick={handleSubmit}>
              저장하기
            </Button>
          </div>
        ) : (
          <Button
            className="px-0 rounded-full w-28"
            onClick={() => setIsReplying(true)}
          >
            답변하기
          </Button>
        )}
      </div>
      {isReplying && (
        <MarkdownEditor
          placeholder="답변을 작성해주세요..."
          value={content}
          onChange={setContent}
          updateImageFiles={setImageFiles}
          showPreview
        />
      )}
    </div>
  )
}

export default AnswerForm
