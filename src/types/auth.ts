export interface ValidationInput {
  value: string
  isValid: boolean
  setValue: (value: string) => void
}

export type ModalStep = 'form' | 'result'
