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
    depth_1: string
    depth_2: string
    depth_3: string
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
  category: string // depth_1
  subCategory: string // depth_2
  language: string // depth_3
  answerCount: number
  viewCount: number
  nickname: string
  time: string // ex: "3시간 전"
  thumbnail?: string
}
