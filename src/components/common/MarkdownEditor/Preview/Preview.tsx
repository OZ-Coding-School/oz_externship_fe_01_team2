// src/components/common/MarkdownEditor/Preview/Preview.tsx
import React from 'react'

interface PreviewProps {
  content: string
  onImageClick?: (imageId: string) => void
}

const Preview: React.FC<PreviewProps> = ({ content, onImageClick }) => {
  const parseInlineMarkdown = (text: string): string => {
    return text
      .replace(/<img([^>]*)>/g, '<img$1>')
      .replace(
        /!\[([^\]]*?)\]\(([^)]*?)\)/g,
        '<img alt="$1" src="$2" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />'
      )
      .replace(
        /\[([^\]]+?)\]\(([^)]+?)\)/g,
        '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /`([^`]+?)`/g,
        '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>'
      )
  }

  const parseHeading = (line: string): string | null => {
    if (line.startsWith('###'))
      return `<h3 class="text-lg font-semibold mt-4 mb-2">${parseInlineMarkdown(line.substring(3).trim())}</h3>`
    if (line.startsWith('##'))
      return `<h2 class="text-xl font-semibold mt-4 mb-2">${parseInlineMarkdown(line.substring(2).trim())}</h2>`
    if (line.startsWith('#'))
      return `<h1 class="text-2xl font-bold mt-4 mb-2">${parseInlineMarkdown(line.substring(1).trim())}</h1>`
    return null
  }

  const parseListItem = (
    line: string
  ): { type: 'numbered' | 'bullet' | null; content: string } => {
    const numbered = line.match(/^(\d+)\.\s+(.+)/)
    const bullet = line.match(/^[-*]\s+(.+)/)

    if (numbered) return { type: 'numbered', content: numbered[2] }
    if (bullet) return { type: 'bullet', content: bullet[1] }
    return { type: null, content: '' }
  }

  const getListTag = (
    type: 'numbered' | 'bullet'
  ): { tag: string; class: string } => {
    return type === 'numbered'
      ? { tag: 'ol', class: 'list-decimal list-inside' }
      : { tag: 'ul', class: 'list-disc list-inside' }
  }

  const parseMarkdown = (text: string): string => {
    if (!text)
      return '<p class="text-gray-400">미리보기가 여기에 표시됩니다...</p>'

    // 상태추적역할,const사용하면 assignment to constant variable 에러 -> 공부할것
    const lines = text.split('\n')
    let html = ''
    let inCodeBlock = false
    let inList = false
    let currentListType: 'numbered' | 'bullet' | null = null

    lines.forEach((line) => {
      // 코드 블록 처리
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          html += '</code></pre>'
          inCodeBlock = false
        } else {
          const lang = line.substring(3).trim()
          html += `<pre class="bg-gray-100 p-4 rounded overflow-x-auto my-4"><code class="language-${lang}">`
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        html += line + '\n'
        return
      }

      const listItem = parseListItem(line)
      if (listItem.type) {
        if (!inList || currentListType !== listItem.type) {
          if (inList) {
            const prevTag = getListTag(currentListType!)
            html += `</${prevTag.tag}>`
          }
          inList = true
          currentListType = listItem.type
          const { tag, class: listClass } = getListTag(listItem.type)
          html += `<${tag} class="${listClass} space-y-1 my-4">`
        }
        html += `<li>${parseInlineMarkdown(listItem.content)}</li>`
        return
      }

      if (inList) {
        const { tag } = getListTag(currentListType!)
        html += `</${tag}>`
        inList = false
        currentListType = null
      }

      if (line.trim() === '') {
        html += '<br>'
        return
      }

      if (line.includes('<img')) {
        html += `<div class="my-2">${line.replace(/class="[^"]*"/g, '')}</div>`
        return
      }

      const heading = parseHeading(line)
      if (heading) {
        html += heading
        return
      }

      if (line.startsWith('>')) {
        html += `<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">${parseInlineMarkdown(line.substring(2))}</blockquote>`
        return
      }

      html += `<p class="mb-2">${parseInlineMarkdown(line)}</p>`
    })

    if (inList && currentListType) {
      const { tag } = getListTag(currentListType)
      html += `</${tag}>`
    }

    return html
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') {
      const imageId = target.getAttribute('data-image-id')
      if (imageId && onImageClick) {
        onImageClick(imageId)
      }
    }
  }

  return (
    <div className="p-4 h-full overflow-auto prose prose-sm max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        onClick={handleImageClick}
      />
    </div>
  )
}

export default Preview
