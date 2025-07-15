import { post } from '@lib/fetcher'
import type {
  AdoptAnswerParams,
  AdoptAnswerResponse,
  CreateCommentResponse,
} from './types'

export const fetchAdoptedAnswer = ({
  answer_id,
  question_id,
}: AdoptAnswerParams) => {
  return post<AdoptAnswerResponse>(
    `/qna/questions/${question_id}/answers/${answer_id}/adopt/`
  )
}

export const fetchCreateComment = (
  answer_id: number,
  content: string
): Promise<CreateCommentResponse> => {
  return post<CreateCommentResponse>(
    `/qna/questions/answers/${answer_id}/comments/`,
    { content }
  )
}
