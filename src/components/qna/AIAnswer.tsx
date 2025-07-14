import { getAiAnswerStream } from '@api/getAiAnswerStream'
import SendHorizonal from '@assets/icons/message.png'
import AiAvatarImg from '@assets/images/qna/img_ai_avatar.png'
import Avatar from '@components/common/Avatar'
import MarkdownRenderer from '@components/common/MarkdownEditor/MarkdownRenderer'
import Textarea from '@components/common/Textarea'
import { useToast } from '@hooks/useToast'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AIAnswerSkeleton from './AIAnswerSkeleton'

const AIAnswer = ({ question }: { question: string }) => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [displayText, setDisplayText] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const handleGetAnswer = async (message = '') => {
    if (isOpen || isStreaming) return

    setIsOpen(true)
    setDisplayText('')

    try {
      setIsStreaming(true)
      setIsLoading(true)

      let started = false
      if (message.trim() === '') {
        // 질문이 비어있으면 기본 질문으로 설정
        message = question
      }
      await getAiAnswerStream(message, (chunk: string) => {
        if (!started) {
          // 스트리밍 시작 시 로딩 상태 해제
          setIsLoading(false)
          started = true
        }
        // 스트리밍 응답을 받으면 displayText와 aiAnswer에 누적
        setDisplayText((prev) => prev + chunk)
      })
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        toast.show({
          message: error.message || 'AI 응답 중 오류가 발생했습니다.',
          type: 'error',
        })
      }
    } finally {
      setIsStreaming(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isStreaming) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [displayText, isStreaming])

  const handleAddMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim() === '') return
    if (message.length > 1000) {
      toast.show({
        message: '메시지는 1000자 이하여야 합니다.',
        type: 'error',
      })
      return
    }
    // 메시지 전송 로직
    handleGetAnswer(message)
    setMessage('')
  }

  return (
    <div className="flex gap-2 mb-6">
      <Avatar
        name="AI"
        profileUrl={AiAvatarImg}
        className="w-15 h-15 p-3 bg-primary-200 drop-shadow-lg"
      />
      <div className="w-176 bg-white rounded-xl drop-shadow-lg  p-4 relative ml-3">
        <div className="absolute -left-3 top-5 w-0 h-0 border-y-8 border-r-14 border-y-transparent border-r-white" />
        {isOpen ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Avatar
                name="AI"
                profileUrl={AiAvatarImg}
                className="w-6 h-6 p-1 bg-primary-200 drop-shadow-sm"
              />
              <span className="font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                AI OZ
              </span>
            </div>

            <div className="mb-6">
              {isLoading && !isStreaming ? (
                <AIAnswerSkeleton />
              ) : (
                <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                  <MarkdownRenderer content={displayText} />
                  {!isStreaming && displayText && (
                    <p className="text-xs text-right text-gray-400 mt-2">
                      ✅ AI 답변 완료
                    </p>
                  )}
                  <div ref={scrollRef} className="h-20" />
                </div>
              )}
            </div>

            {/* 하단 입력 영역 */}
            <form className="relative" onSubmit={handleAddMessage}>
              <Textarea
                disabled={isStreaming}
                rows={3}
                placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="
                          h-12
                          focus:h-20
                          transition-all duration-300 ease-in-out
                          focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute right-3 bottom-5 text-xs text-gray-400 flex items-center gap-1">
                <p>
                  <span className="text-primary">{message.length}</span>/1000
                </p>
                <img src={SendHorizonal} alt="send icon" />
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => handleGetAnswer()}
            className="group w-full text-left leading-6 cursor-pointer"
          >
            <p className="text-gray-500">
              {question.length > 50 ? `${question.slice(0, 50)}...` : question}
            </p>
            <div className="flex text-gray-600 font-bold">
              <p>질문에 대한</p>
              <div className="flex items-center gap-2 mb-6 ml-2">
                <Avatar
                  name="AI"
                  profileUrl={AiAvatarImg}
                  className="w-6 h-6 p-1 bg-primary-200 drop-shadow-sm"
                />
                <span className="font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  AI OZ
                </span>
              </div>
              <p>의 답변 보기</p>
              <ChevronDown className="animate-none group-hover:animate-slide-down" />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default AIAnswer
