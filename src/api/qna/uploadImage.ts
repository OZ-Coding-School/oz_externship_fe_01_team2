const API_URL = import.meta.env.VITE_API_URL

export async function uploadQnaImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const res = await fetch(`${API_URL}/api/v1/qna/images/upload/`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('이미지 업로드 실패')
  const data = await res.json()
  return data.url || data.image_url
}
