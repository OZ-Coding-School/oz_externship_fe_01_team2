import { get, post } from '../lib/fetcher'

// 질문 등록 API (이미지 있든 없든 FormData로 통일)
export async function createQuestion(
  categoryId: number,
  title: string,
  content: string,
  imageFiles: File[] = [] // 기본값을 빈 배열로 설정
) {
  const formData = new FormData()
  formData.append('category_id', categoryId.toString())
  formData.append('title', title)
  formData.append('content', content)

  // 이미지가 있을 때만 추가 (없어도 FormData로 전송)
  imageFiles.forEach((file) => {
    formData.append('images', file)
  })

  const response = await post('/qna/questions/create/', formData, {
    headers: { 'Content-Type': undefined },
  })

  return response.data
}

export async function getQuestionDetail(questionId: number) {
  const response = await get(`/qna/questions/${questionId}/`)
  return response.data
}

export async function getQuestionList(params?: {
  page?: number
  search?: string
  category?: string
  ordering?: string
}) {
  const response = await get('/qna/questions/', { params })
  return response.data
}
