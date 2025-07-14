export interface Image {
  id: number
  img_url: string
  created_at: string
  updated_at: string
}

export interface Author {
  id?: number // 질문 작성자엔 id 없음, 답변/댓글 작성자엔 id 있음
  nickname: string
  profile_image_url: string
}

export interface Comment {
  id: number
  answer_id: number
  author: Author
  content: string
  created_at: string
  updated_at: string
}
export interface AnswerImage {
  id: number
  img_url: string
}
export interface Answer {
  id: number
  question_id: number
  author: Author
  content: string
  is_adopted: boolean
  created_at: string
  updated_at: string
  img_url: AnswerImage[]
  comments: Comment[]
}

export interface Question {
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
  thumbnail: string
}

export interface QuestionDetail {
  id: number
  title: string
  content: string
  images: Image[]
  author: Author
  category: {
    major: string
    middle: string
    minor: string
  }
  view_count: number
  created_at: string
  answers: Answer[]
}
