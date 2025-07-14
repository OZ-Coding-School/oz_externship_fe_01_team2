import { get } from '../../lib/fetcher'
import type { Category, QuestionRawResponse } from './types.ts'

export interface QnaListParams {
  ordering?: string
  page?: number
  page_size?: number
  search?: string
}
export const fetchQnaList = (params: QnaListParams) => {
  return get<QuestionRawResponse>('/qna/questions/', { params })
}

export const fetchCategories = () => {
  return get<Category[]>('/qna/questions/categories/')
}
