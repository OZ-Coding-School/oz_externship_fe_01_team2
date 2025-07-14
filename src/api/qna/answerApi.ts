import { post } from '@lib/fetcher'
import type { AdoptAnswerParams, AdoptAnswerResponse } from './types'

export const fetchAdoptedAnswer = ({
  answer_id,
  question_id,
}: AdoptAnswerParams) => {
  return post<AdoptAnswerResponse>(
    `/qna/questions/${question_id}/answers/${answer_id}/adopt/`
  )
}
