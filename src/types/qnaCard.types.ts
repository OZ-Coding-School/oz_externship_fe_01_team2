// types/qnaCard.types.ts
export type QuestionCard = {
  id: number
  title: string
  content: string
  author: {
    nickname: string
    profile_image_url: string
  }
  category: {
    major: string
    middle: string
    minor: string
  }
  answer_count: number
  view_count: number
  created_at: string
  thumbnail?: string
}

export type FlatQuestionCard = {
  id: number
  title: string
  content: string
  category: {
    major: string
    middle: string
    minor: string
  }
  answerCount: number
  viewCount: number
  nickname: string
  time: string // ex: "3시간 전"
  thumbnail?: string
}
