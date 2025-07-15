export interface Category {
  id: number
  name: string
  child_categories?: Category[]
}

export interface CreateQuestionRequest {
  categoryId: number
  title: string
  content: string
  image_urls?: string[]
}

export interface Question {
  id: number
  category: Category
  title: string
  content: string
  created_at: string
}
