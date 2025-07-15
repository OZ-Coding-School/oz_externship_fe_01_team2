import { post } from '@lib/fetcher'
import type {
  AdoptAnswerParams,
  AdoptAnswerResponse,
  CreateCommentResponse,
  CreateAnswerResponse,
} from './types'

export const fetchAdoptedAnswer = ({
  answer_id,
  question_id,
}: AdoptAnswerParams) => {
  return post<AdoptAnswerResponse>(
    `/qna/questions/${question_id}/answers/${answer_id}/adopt/`
  )
}

export const createComment = (
  answer_id: number,
  content: string
): Promise<CreateCommentResponse> => {
  return post<CreateCommentResponse>(
    `/qna/questions/answers/${answer_id}/comments/`,
    { content }
  )
}

export const createAnswer = (
  question_id: number,
  formData: FormData
): Promise<CreateAnswerResponse> => {
  return post<CreateAnswerResponse>(
    `/qna/questions/${question_id}/answers/`,
    formData
  )
}
