export type User = {
  id: number
  name: string
  nickname: string
  profileUrl: string
  role: 'Student' | 'Mentor' | 'Admin'
}
export interface ValidationInput {
  value: string
  isValid: boolean
  setValue: (value: string) => void
}

export type ModalStep = 'form' | 'result'
