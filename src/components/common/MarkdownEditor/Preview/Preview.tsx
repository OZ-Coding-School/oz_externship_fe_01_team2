// Preview/Preview.tsx

import React from 'react'
import type { PreviewProps } from '../MarkdownEditor.types'

const Preview: React.FC<PreviewProps> = ({ content }) => {
  // 간단한 마크다운 파싱 (실제로는 react-markdown 사용 권장)
  const parseMarkdown = (text: string): string => {
    return (
      text
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code
        .replace(
          /`([^`]+?)`/g,
          '<code class="bg-gray-100 px-1 rounded">$1</code>'
        )
        // Links
        .replace(
          /\[([^\]]*?)\]\(([^)]*?)\)/g,
          '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
        )
        // Images
        .replace(
          /!\[([^\]]*?)\]\(([^)]*?)\)/g,
          '<img alt="$1" src="$2" class="max-w-full h-auto" />'
        )
        // Lists
        .replace(/^- (.+$)/gim, '<li>$1</li>')
        .replace(/^(\d+)\. (.+$)/gim, '<li>$1. $2</li>')
        // Blockquotes
        .replace(
          /^> (.+$)/gim,
          '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>'
        )
        // Line breaks
        .replace(/\n/gim, '<br>')
    )
  }

  return (
    <div
      className="p-4 h-full overflow-auto prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: content
          ? parseMarkdown(content)
          : '<p class="text-gray-400">미리보기가 여기에 표시됩니다...</p>',
      }}
    />
  )
}

export default Preview
