import { Check } from 'lucide-react'
import { type ToastInternal } from '../../../types/toast'
import { cn } from '../../../utils/cn'

interface Props {
  toasts: ToastInternal[]
}

const ToastPortal = ({ toasts }: Props) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-20 space-y-2 z-50">
      {toasts.map(({ id, message, type, isVisible }) => (
        <div
          key={id}
          className={cn(
            'flex items-center gap-2 rounded-md border bg-gray-100 px-4 py-3 font-medium text-sm shadow-md transition-all duration-300',

            isVisible ? 'animate-slide-in' : 'animate-slide-out',

            type === 'success' && 'border-gray-200 text-gray-600',
            type === 'error' && 'border-red-200 text-danger',
            !type && 'border-gray-200 text-gray-700'
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-full',
              type === 'success' && 'bg-success text-white',
              type === 'error' && 'bg-danger text-white',
              !type && 'bg-gray-400 text-white'
            )}
          >
            <Check className="h-4 w-4" />
          </div>
          <span>{message}</span>
        </div>
      ))}
    </div>
  )
}

export default ToastPortal
