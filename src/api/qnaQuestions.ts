import axios from 'axios'

// 질문 등록 API (이미지 있든 없든 FormData로 통일)
export async function createQuestion(
  token: string,
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

  const res = await axios.post(
    'http://54.180.237.77/api/v1/qna/questions/create/',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // Content-Type은 FormData 사용 시 자동으로 설정됨 (multipart/form-data)
      },
    }
  )
  return res.data
}
