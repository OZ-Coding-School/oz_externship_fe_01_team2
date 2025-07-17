import { cn } from '@utils/cn'
import { X } from 'lucide-react'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  className?: string
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, className, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        `fixed inset-0 bg-black/60 flex items-center justify-center z-50`,
        className
      )}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] shadow-xl mt-[280px] mb-[278px] p-[24px] gap-[10px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 transition hover:text-gray-600 text-xl cursor-pointer"
          aria-label="닫기"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
