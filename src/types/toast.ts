export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  isVisible?: boolean
}

export interface ToastInternal extends Toast {
  isVisible: boolean
}
