// Toolbar.tsx
import React, { useRef } from 'react'
import {
  Upload,
  Bold,
  Italic,
  Link,
  Code,
  List,
  Eye,
  EyeOff,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'
import type { ToolbarProps } from '../MarkdownEditor.types'
import ToolbarButton from './ToolbarButton'

interface ToolButton {
  icon: React.ReactNode
  title: string
  onClick: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  onInsert,
  showPreview,
  onTogglePreview,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onImageUpload) {
      onImageUpload(e.target.files)
    }
  }

  const headingButtons: ToolButton[] = [
    {
      icon: <Heading1 size={16} />,
      title: 'Heading 1',
      onClick: () => onInsert('# '),
    },
    {
      icon: <Heading2 size={16} />,
      title: 'Heading 2',
      onClick: () => onInsert('## '),
    },
    {
      icon: <Heading3 size={16} />,
      title: 'Heading 3',
      onClick: () => onInsert('### '),
    },
  ]

  const formatButtons: ToolButton[] = [
    {
      icon: <Bold size={16} />,
      title: 'Bold (Ctrl+B)',
      onClick: () => onInsert('**', '**'),
    },
    {
      icon: <Italic size={16} />,
      title: 'Italic (Ctrl+I)',
      onClick: () => onInsert('*', '*'),
    },
    {
      icon: <Link size={16} />,
      title: 'Link',
      onClick: () => onInsert('[링크텍스트](URL)'),
    },
    {
      icon: <Code size={16} />,
      title: 'Code',
      onClick: () => onInsert('`', '`'),
    },
    {
      icon: <List size={16} />,
      title: 'List',
      onClick: () => onInsert('- '),
    },
  ]

  const Divider = () => <div className="w-px h-6 bg-gray-300 mx-2" />

  return (
    <div className="bg-gray-50 border-b p-2 flex items-center gap-2 flex-wrap">
      {headingButtons.map((button, index) => (
        <ToolbarButton
          key={`heading-${index}`}
          icon={button.icon}
          title={button.title}
          onClick={button.onClick}
        />
      ))}

      <Divider />

      {formatButtons.map((button, index) => (
        <ToolbarButton
          key={`format-${index}`}
          icon={button.icon}
          title={button.title}
          onClick={button.onClick}
        />
      ))}

      <Divider />

      <ToolbarButton
        icon={<Upload size={16} />}
        title="Upload Image"
        onClick={handleImageUploadClick}
      >
        <span className="text-sm">이미지 (드래그앤드롭 가능)</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        icon={showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        title="Toggle Preview"
        onClick={onTogglePreview}
        isActive={showPreview}
      >
        <span className="text-sm">미리보기</span>
      </ToolbarButton>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default Toolbar
