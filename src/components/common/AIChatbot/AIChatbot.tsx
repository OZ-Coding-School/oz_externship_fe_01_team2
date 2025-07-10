import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getAiAnswerStream } from '../../../api/getAiAnswerStream'
import SendHorizonal from '../../../assets/icons/message.png'
import ChatbotBtnImg from '../../../assets/images/common/floating_btn_kakao.png'
import AiAvatarImg from '../../../assets/images/qna/img_ai_avatar.png'
import { useToast } from '../../../hooks/useToast'
import Avatar from '../Avatar'
import Textarea from '../Textarea'

const AIChatbot = () => {
  const user = {
    nickname: 'oz_user',
    profileUrl: '',
  }

  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요. 무엇을 도와드릴까요?' },
  ])
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const toast = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleGetAnswer = async (message = '') => {
    if (isStreaming) return

    setIsLoading(true)

    setMessages((prev) => [...prev, { sender: 'user', text: message }])
    setMessages((prev) => [...prev, { sender: 'bot', text: '' }])
    try {
      let fullAnswer = ''
      await getAiAnswerStream(message, (chunk: string) => {
        setIsStreaming(true)
        fullAnswer += chunk

        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.sender === 'bot') {
            updated[updated.length - 1] = {
              ...last,
              text: fullAnswer,
            }
          }
          return updated
        })
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.show({
          message: e.message || 'AI 응답 중 오류가 발생했습니다.',
          type: 'error',
        })
      }
    } finally {
      setIsStreaming(false)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmed = message.trim()
      if (!trimmed) return
      handleGetAnswer(trimmed)
      setMessage('')
    }
  }

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
    handleGetAnswer(message)
    setMessage('')
  }

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50">
      <button
        className="w-37 cursor-pointer"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <img
          src={ChatbotBtnImg}
          alt="챗봇 상담"
          className="inline-block mr-2"
        />
        <p className="hidden">문의하기</p>
      </button>

      {isChatOpen && (
        <div className="flex flex-col w-90 h-140 rounded-xl shadow-lg border border-gray-300 overflow-hidden absolute mb-2 bottom-full right-0 bg-primary-50">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 pt-6 pb-2">
            <Avatar
              name="AI"
              profileUrl={AiAvatarImg}
              className="w-10 h-10 p-2 bg-primary-200 drop-shadow-sm"
            />
            <span className="font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              AI OZ
            </span>
            <button
              className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setIsChatOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* Message Area */}
          <div className="px-4 py-6 overflow-y-auto space-y-4 h-[calc(100% - 80px)] flex-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end gap-2' : 'justify-start'}`}
              >
                <div
                  className={`w-3/4 rounded-xl px-4 py-2 relative text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 border border-gray-300'
                  }`}
                >
                  {isLoading && !isStreaming && idx === messages.length - 1 ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                  <div ref={scrollRef} className="h-20 absolute" />
                </div>
                {msg.sender === 'user' && (
                  <Avatar
                    name={user.nickname}
                    profileUrl={user.profileUrl}
                    className="w-8 h-8 mr-2 bg-primary-200 drop-shadow-sm"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form
            className="relative w-[calc(100%-1.5rem)] mx-auto mb-3"
            onSubmit={handleAddMessage}
          >
            <Textarea
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus:ring-primary"
            />
            <div className="absolute right-3 bottom-5 text-xs text-gray-400 flex items-center gap-1">
              <p>
                <span className="text-primary">{message.length}</span>/1000
              </p>
              <img src={SendHorizonal} alt="send icon" />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AIChatbot
