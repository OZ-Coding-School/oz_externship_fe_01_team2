import Avatar from '@components/common/Avatar'
import Button from '@components/common/Button'
import MarkdownEditor from '@components/common/MarkdownEditor'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@store/authStore'
import { useState } from 'react'
import { createAnswer } from '@api/qna/answerApi'

interface AnswerFormProps {
  questionId: number
  onAnswerSubmit?: () => void
}

const AnswerForm = ({ questionId, onAnswerSubmit }: AnswerFormProps) => {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [imageFiles, setImageFiles] = useState([] as File[])
  const [isReplying, setIsReplying] = useState(false)
  const toast = useToast()

  if (!user) {
    return null
  }
  const { nickname, profile_image_url: profileUrl } = user

  // 답변 작성 후 저장하는 함수
  const handleReset = () => {
    setContent('')
    setImageFiles([])
    setIsReplying(false)
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('content', content)
    imageFiles?.forEach((file) => {
      formData.append('image_files', file)
    })

    try {
      if (!content.trim()) {
        toast.show({ message: '답변 내용을 입력해주세요.', type: 'error' })
        return
      }

      await createAnswer(questionId, formData)

      handleReset()
      toast.show({ message: '답변이 저장되었습니다!', type: 'success' })

      onAnswerSubmit?.()
    } catch {
      toast.show({ message: '답변 저장 실패', type: 'error' })
    }
  }

  return (
    <div className="border border-gray-250 rounded-3xl mb-25">
      <div className="flex items-center justify-between py-10 px-9">
        <div className="flex items-center gap-3">
          <Avatar name={nickname} profileUrl={profileUrl} />
          <div>
            <div className="text-primary text-xs">{nickname}님, </div>
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
