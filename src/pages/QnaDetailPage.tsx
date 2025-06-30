import { ChevronRight, Link } from 'lucide-react'
import { useState } from 'react'
import UserDefaultImage from '../assets/images/common/img_user_default.png'
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button'
import AnswerCard from '../components/qna/AnswerCard'
import { useToast } from '../hooks/useToast'
import { formatRelativeTime } from '../utils/formatRelativeTime'

const QnaDetailPage = () => {
  const [user] = useState({
    name: '오즈오즈',
    userId: 'oz_oz',
    profileUrl: UserDefaultImage,
  })
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
      toast.show({ message: 'URL이 복사되었습니다!', type: 'success' })
    } catch {
      toast.show({ message: 'URL 복사 실패', type: 'error' })
    }
  }

  const qnaData = {
    id: 101,
    title: 'Django 마이그레이션 오류 질문입니다',
    content: 'migrate 명령 시 오류가 납니다. 해결 방법이 궁금합니다.',
    images: ['https://cdn.ozcoding.com/media/qnaDetails/101/1.jpg'],
    author: {
      id: 7,
      nickname: 'oz_student',
      profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
    },
    category: {
      depth_1: '백엔드',
      depth_2: 'Python',
      depth_3: 'Django 오류',
    },
    view_count: 24,
    created_at: '2025-06-23T05:00:00Z',
    answers: [
      {
        id: 201,
        content: '# Django 마이그레이션 오류 해결 방법',
        is_adopted: true,
        created_at: '2025-06-23T06:00:00Z',
        author: {
          id: 8,
          nickname: 'oz_helper',
          profile_image_url: 'https://cdn.ozcoding.com/profiles/user8.png',
        },
        comments: [
          {
            id: 301,
            content: '덕분에 해결했어요 감사합니다!',
            created_at: '2025-06-23T07:00:00Z',
            author: {
              id: 7,
              nickname: 'oz_student',
              profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
            },
          },
          {
            id: 301,
            content: '덕분에 해결했어요 감사합니다!',
            created_at: '2025-06-23T07:00:00Z',
            author: {
              id: 7,
              nickname: 'oz_student',
              profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
            },
          },
        ],
      },
      {
        id: 202,
        content:
          '마이그레이션 오류는 종종 데이터베이스 스키마와 모델 간의 불일치로 발생합니다. 다음 단계를 시도해 보세요:\n\n1. `python manage.py makemigrations` 명령어로 변경 사항을 적용하세요.\n2. `python manage.py migrate` 명령어로 마이그레이션을 실행하세요.\n3. 만약 여전히 오류가 발생한다면, 데이터베이스를 초기화하고 다시 마이그레이션을 시도해 보세요.',
        is_adopted: false,
        created_at: '2025-06-23T06:00:00Z',
        author: {
          id: 8,
          nickname: 'oz_helper',
          profile_image_url: 'https://cdn.ozcoding.com/profiles/user8.png',
        },
        comments: [
          {
            id: 301,
            content: '덕분에 해결했어요 감사합니다!',
            created_at: '2025-06-23T07:00:00Z',
            author: {
              id: 7,
              nickname: 'oz_student',
              profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
            },
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
      {/* 경로 네비게이션 */}
      <nav className="text-xl font-bold mb-5 flex items-center text-primary">
        <span>{qnaData.category.depth_1}</span>
        <ChevronRight />
        <span>{qnaData.category.depth_2}</span>
        <ChevronRight />
        <span>{qnaData.category.depth_3}</span>
      </nav>

      {/* 질문 */}
      <section className="mb-13 border-b border-gray-250 pb-6">
        <div className="border-b border-gray-250 pb-5">
          <div className="flex items-start gap-15 pb-13 justify-between">
            <h1 className="text-title-b">
              <span className="text-primary text-4xl mr-4">Q.</span>{' '}
              {qnaData.title}
            </h1>
            <div className="flex items-center gap-3 shrink-0">
              <Avatar
                name={qnaData.author.nickname}
                profileUrl={qnaData.author.profile_image_url}
              />
              <div className="text-gray-600">{qnaData.author.nickname} </div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            조회 {qnaData.view_count} · {formatRelativeTime(qnaData.created_at)}
          </div>
        </div>
        <p className="pt-10 text-body-rg pb-15">{qnaData.content}</p>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-semibold flex items-center gap-2 text-gray-400 py-2 px-3 rounded-full border border-gray-250 cursor-pointer"
            onClick={handleShare}
          >
            <Link />
            {copied ? '복사성공!' : '공유하기'}
          </button>
        </div>
      </section>

      {/* 답변 요청 안내 */}
      <div className="border border-gray-250 py-10 px-9 rounded-3xl flex items-center justify-between mb-25">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} profileUrl={user.profileUrl} />
          <div>
            <div className="text-primary text-xs">{user.name}님, </div>
            <div className="text-lg font-semibold text-gray-800">
              정보를 공유해 주세요.
            </div>
          </div>
        </div>
        <Button radius="48px" width="112px">
          답변하기
        </Button>
      </div>

      {/* 답변 개수 */}
      <h2 className="mb-10 flex items-center gap-4 text-2xl font-semibold">
        <span className="bg-primary rounded-full text-white w-12 h-12 flex items-center justify-center">
          A
        </span>
        <div className="text-title-b">
          {qnaData.answers.length}개의 답변이 있어요
        </div>
      </h2>

      {/* 답변 카드 목록 */}
      <div className="space-y-10">
        {qnaData.answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  )
}

export default QnaDetailPage
