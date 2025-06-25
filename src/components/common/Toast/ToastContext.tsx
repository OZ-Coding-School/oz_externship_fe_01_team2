import { createContext } from 'react'
import type { Toast } from '../../../types/toast'

export interface ToastContextProps {
  show: (toast: Omit<Toast, 'id'>) => void
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
)
