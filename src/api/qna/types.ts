import type { Question } from '@custom-types/qnaDetail'

export interface QuestionRawResponse {
  count: number
  next: string | null
  previous: string | null
  results: Question[]
}

export enum CategoryType {
  Major = 'major',
  Middle = 'middle',
  Minor = 'minor',
}

export interface Category {
  id: number
  name: string
  category_type: CategoryType
  parent_ctg?: ParentCategory
  child_categories?: Category[]
}

export interface ParentCategory {
  id: number
  name: string
}

export interface CreateQuestionRequest {
  category_id: number
  title: string
  content: string
}
export interface createCommentParams {
  answer_id: number
  content: string
}

export interface CreateCommentResponse {
  message: string
}
export interface QnaListParams {
  ordering?: string
  page?: number
  page_size?: number
  search?: string
}
export interface AdoptAnswerParams {
  answer_id: number
  question_id: number
}

export interface AdoptAnswerResponse {
  message: string
}

export interface CreateAnswerResponse {
  id: number
  question_id: number
  author: {
    id: number
    nickname: string
    profile_image_url: string
    role: string
  }
  content: string
  is_adopted: boolean
  created_at: string
  updated_at: string
  comments: string[]
}