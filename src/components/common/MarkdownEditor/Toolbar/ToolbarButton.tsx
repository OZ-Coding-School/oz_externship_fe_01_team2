// ToolbarButton.tsx
import React from 'react'

interface ToolbarButtonProps {
  icon: React.ReactNode
  title: string
  onClick: () => void
  isActive?: boolean
  children?: React.ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  title,
  onClick,
  isActive = false,
  children,
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded transition-colors flex items-center gap-1 ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-600'
    }`}
  >
    {icon}
    {children}
  </button>
)

export default ToolbarButton
