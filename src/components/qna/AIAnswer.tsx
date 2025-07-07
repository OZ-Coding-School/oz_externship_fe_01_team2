import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SendHorizonal from '../../assets/icons/message.png'
import AiAvatarImg from '../../assets/images/qna/img_ai_avatar.png'
import Avatar from '../common/Avatar'
import Textarea from '../common/Textarea'
const AIAnswer = () => {
  const [message, setMessage] = useState('') // 사용자 입력 메시지
  const [aiAnswer, setAiAnswer] = useState('') // AI 답변 데이터
  const [showFullAnswer, setShowFullAnswer] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGetAnswer = async () => {
    if (aiAnswer || loading) {
      setShowFullAnswer((prev) => !prev)
      return
    }

    setLoading(true)
    try {
      setAiAnswer(`AND 연산자는 두 개 이상의 조건이 모두 '참(True)'일 때만 결과를
                '참'으로 처리해야 하는 경우에 사용합니다. 둘 중 하나라도
                '거짓(False)'이면 결과는 '거짓'이 됩니다. 마치 "숙제를 끝내는 것
                그리고 방 청소를 하는 것" 두 가지를 모두 해야만 외출을 허락받는
                것과 같습니다.1. 여러 조건을 동시에 만족하는지 확인할 때 (if 문)
                가장 흔한 사용법입니다. 예를 들어, 로그인 시 아이디와 비밀번호가
                둘 다 일치해야 로그인이 성공합니다.2. 데이터 범위를 지정하거나
                필터링할 때`)
      setShowFullAnswer(true)
    } catch (e) {
      alert('답변 요청 중 오류 발생')
    } finally {
      setLoading(false)
    }
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
        {showFullAnswer ? (
          <div>
            {/* 상단: 챗봇 아이콘 + 이름 */}
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

            {/* 본문 텍스트 (답변) */}
            <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-6">
              <p>{aiAnswer || 'AI의 답변이 아직 준비되지 않았습니다.'}</p>
            </div>

            {/* 하단 입력 영역 */}
            <div className="relative">
              <Textarea
                rows={3}
                placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="absolute right-3 bottom-4 text-xs text-gray-400 flex items-center gap-1">
                <p>
                  <span className="text-primary">{message.length}</span>/1000
                </p>
                <img src={SendHorizonal} alt="send icon" />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGetAnswer}
            className="group w-full text-left leading-6 cursor-pointer"
          >
            <p className="text-gray-500">
              AND 연산자는 어떤 경우에 사용하는지 궁금합니다.
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
