export type User = {
  name: string
  userId: string
  profileUrl: string
}
export interface ValidationInput {
  value: string
  isValid: boolean
  setValue: (value: string) => void
}

export type ModalStep = 'form' | 'result'
