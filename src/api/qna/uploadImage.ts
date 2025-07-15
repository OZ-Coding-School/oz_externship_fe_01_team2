import { post } from '@lib/fetcher'

export async function uploadQnaImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image_files', file)

  try {
    const data = await post<{
      upload_success?: string[]
      url?: string
      image_url?: string
    }>('/qna/images/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const imageUrl = data.upload_success?.[0] || data.url || data.image_url

    if (!imageUrl) {
      throw new Error('이미지 URL을 받을 수 없습니다')
    }

    return imageUrl
  } catch (error) {
    throw new Error('이미지 업로드 실패')
  }
}
