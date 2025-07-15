import type { QuestionDetail } from '@custom-types/qnaDetail.ts'
import { get, post, patch } from '@lib/fetcher'
import type {
  Category,
  CreateQuestionRequest,
  QuestionRawResponse,
} from './types.ts'

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

export const fetchQnaDetail = (id: number) => {
  return get<QuestionDetail>(`/qna/questions/${id}/`)
}
export const createQuestion = (payload: CreateQuestionRequest) => {
  return post('/qna/questions/create/', payload)
}
export const updateQuestion = (
  questionId: number,
  payload: CreateQuestionRequest
) => {
  return patch(`/qna/questions/${questionId}/update/`, payload)
}
