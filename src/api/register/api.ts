import axios from 'axios'
import type { Course, Generation, RegisterRequest } from './types'

const API_URL = import.meta.env.VITE_API_URL

const EnrollmentsApi = {
  // 과정 목록 불러오기
  getCourses: async (): Promise<Course[]> => {
    const res = await axios.get(`${API_URL}/api/v1/courses`)
    return res.data
  },

  // 특정 과정의 기수 목록
  getGenerations: async (courseId: number): Promise<Generation[]> => {
    const res = await axios.get(
      `${API_URL}/api/v1/courses/${courseId}/generations`
    )
    return res.data
  },

  // 수강 신청
  register: async (
    data: RegisterRequest,
    accessToken: string
  ): Promise<void> => {
    await axios.post(
      `${API_URL}/api/v1/auth/users/student/enrollments/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  },
}

export default EnrollmentsApi
