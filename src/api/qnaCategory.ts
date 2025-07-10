import axios from 'axios'

export async function fetchCategories(token: string) {
  const res = await axios.get(
    'http://54.180.237.77/api/v1/qna/admin/categories/list/',
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data || []
}
