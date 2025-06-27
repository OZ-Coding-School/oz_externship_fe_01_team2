// MarkdownEditor.types.ts

import type React from 'react'

export interface MarkdownEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  height?: string
  width?: string
  showPreview?: boolean
  className?: string
}

export interface ToolbarButtonProps {
  icon: React.ReactNode
  title: string
  onClick: () => void
  isActive?: boolean
}

export interface ToolbarProps {
  onInsert: (before: string, after?: string) => void
  showPreview: boolean
  onTogglePreview: () => void
  onImageUpload?: (files: FileList) => void
}

export interface PreviewProps {
  content: string
  onImageClick?: (imageId: string) => void
}

export interface ImageItem {
  id: string
  file: File
  url: string
  width?: number
  height?: number
}
