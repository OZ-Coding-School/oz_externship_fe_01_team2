import type { Toast } from '@custom-types/toast'
import { createContext } from 'react'

export interface ToastContextProps {
  show: (toast: Omit<Toast, 'id'>) => void
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
)
