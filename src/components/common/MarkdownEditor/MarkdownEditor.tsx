// MarkdownEditor.tsx
// 사용방법
// import React, { useState } from 'react';
// import './App.css';
// import { MarkdownEditor } from './components/common/MarkdownEditor';

// function App() {
//   const [markdownContent, setMarkdownContent] = useState(`# 안녕하세요!

// **마크다운 에디터** 테스트입니다.`);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">마크다운 에디터</h1>

//         <MarkdownEditor
//           value={markdownContent}
//           onChange={setMarkdownContent}
//           width="100%"
//           height="600px"
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useCallback } from 'react'
import type { MarkdownEditorProps } from './MarkdownEditor.types'
import Toolbar from './Toolbar/Toolbar'
import Preview from './Preview/Preview'

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value = '',
  onChange = () => {},
  placeholder = '마크다운을 입력하세요...',
  height = '400px',
  width = '100%', // 기본값 100%
  showPreview: initialShowPreview = false,
  className = '',
}) => {
  const [content, setContent] = useState(value)
  const [showPreview, setShowPreview] = useState(initialShowPreview)
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
    null
  )

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent)
      onChange(newContent)
    },
    [onChange]
  )

  const insertText = useCallback(
    (before: string, after: string = '') => {
      if (!textareaRef) return

      const start = textareaRef.selectionStart
      const end = textareaRef.selectionEnd
      const selectedText = content.substring(start, end)

      const newText =
        content.substring(0, start) +
        before +
        selectedText +
        after +
        content.substring(end)

      handleContentChange(newText)

      // 커서 위치 조정
      setTimeout(() => {
        if (textareaRef) {
          const newCursorPos = start + before.length + selectedText.length
          textareaRef.focus()
          textareaRef.setSelectionRange(newCursorPos, newCursorPos)
        }
      }, 0)
    },
    [content, textareaRef, handleContentChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault()
            insertText('**', '**')
            break
          case 'i':
            e.preventDefault()
            insertText('*', '*')
            break
        }
      }
    },
    [insertText]
  )

  return (
    <div
      className={`border rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Toolbar
        onInsert={insertText}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

      <div className="flex" style={{ height: `calc(${height} - 50px)` }}>
        {/* Editor - 항상 왼쪽 50% */}
        <div className="flex-1 relative border-r border-gray-200">
          <textarea
            ref={setTextareaRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm"
          />
        </div>

        {/* Preview - 항상 오른쪽 50% */}
        <div className="flex-1 bg-white">
          <Preview content={content} />
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
