import { get } from '../lib/fetcher'

export async function fetchCategories() {
  const response = await get('/qna/admin/categories/list/')
  return response.data || []
}
