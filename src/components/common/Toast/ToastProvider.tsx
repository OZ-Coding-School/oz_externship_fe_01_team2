import type { Toast } from '@custom-types/toast'
import '@styles/animation.css'
import { useCallback, useState } from 'react'
import { ToastContext } from './ToastContext'
import ToastPortal from './ToastPortal'

type ToastWithVisibility = Toast & { isVisible: boolean }

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastWithVisibility[]>([])

  const show = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, ...toast, isVisible: true }])

    // 1. 2.7초 뒤에 isVisible을 false로 바꿔 애니메이션 시작
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isVisible: false } : t))
      )
    }, 2700)

    // 2. 3초 뒤에 실제로 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastPortal toasts={toasts} />
    </ToastContext.Provider>
  )
}
