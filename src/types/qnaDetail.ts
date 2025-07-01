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
