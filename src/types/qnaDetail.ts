export interface Comment {
  id: number
  content: string
  created_at: string
  author: {
    id: number
    nickname: string
    profile_image_url: string
  }
}

export interface Answer {
  id: number
  content: string
  is_adopted: boolean
  created_at: string
  author: {
    id: number
    nickname: string
    profile_image_url: string
  }
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
