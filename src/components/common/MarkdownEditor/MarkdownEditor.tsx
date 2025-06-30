// src/components/common/MarkdownEditor/MarkdownEditor.tsx
import React, { useState, useRef, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import type { MarkdownEditorProps, ImageItem } from './MarkdownEditor.types'
import Toolbar from './Toolbar/Toolbar'
import Preview from './Preview/Preview'

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value = '',
  onChange = () => {},
  placeholder,
  height = '500px',
  width = '100%',
  showPreview: initialShowPreview = false,
  className = '',
}) => {
  const [content, setContent] = useState(value)
  const [images, setImages] = useState<ImageItem[]>([])
  const [showPreview, setShowPreview] = useState(initialShowPreview)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [editorHeight, setEditorHeight] = useState(
    parseInt(height as string) || 500
  )
  const [isResizing, setIsResizing] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent)
      onChange(newContent)
    },
    [onChange]
  )

  const getImageCountInMarkdown = useCallback(() => {
    const imgTagMatches = content.match(/<img[^>]*>/g) || []
    const markdownImgMatches = content.match(/!\[[^\]]*\]\([^)]*\)/g) || []
    return imgTagMatches.length + markdownImgMatches.length
  }, [content])

  const insertText = useCallback(
    (before: string, after: string = '') => {
      if (!textareaRef.current) return

      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)

      const newText =
        content.substring(0, start) +
        before +
        selectedText +
        after +
        content.substring(end)

      handleContentChange(newText)

      setTimeout(() => {
        const newCursorPos = start + before.length + selectedText.length
        textarea.focus()
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    },
    [content, handleContentChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const shortcuts: Record<string, () => void> = {
          b: () => insertText('**', '**'),
          i: () => insertText('*', '*'),
        }

        if (shortcuts[e.key]) {
          e.preventDefault()
          shortcuts[e.key]()
        }
      }
    },
    [insertText]
  )

  const createImageMarkdown = useCallback((imageItem: ImageItem) => {
    return `<img src="${imageItem.url}" width="${imageItem.width}" height="${imageItem.height}" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" alt="이미지" data-image-id="${imageItem.id}" />`
  }, [])

  const insertImageMarkdown = useCallback(
    (imageItem: ImageItem, index: number) => {
      setTimeout(() => {
        if (textareaRef.current) {
          const textarea = textareaRef.current
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          const markdown = createImageMarkdown(imageItem)

          const newContent =
            content.substring(0, start) +
            '\n' +
            markdown +
            '\n' +
            content.substring(end)

          handleContentChange(newContent)

          setTimeout(() => {
            const newCursorPos = start + markdown.length + 2
            textarea.focus()
            textarea.setSelectionRange(newCursorPos, newCursorPos)
          }, 0)
        }
      }, 100 * index)
    },
    [content, handleContentChange, createImageMarkdown]
  )

  const processImageFiles = useCallback(
    (files: FileList) => {
      const currentImageCount = getImageCountInMarkdown()

      if (currentImageCount + files.length > 5) {
        alert(
          `마크다운에는 최대 5개의 이미지만 삽입할 수 있습니다. (현재 ${currentImageCount}개, 추가하려는 이미지 ${files.length}개)`
        )
        return
      }

      Array.from(files).forEach((file, index) => {
        if (!file.type.startsWith('image/')) return

        const imageItem: ImageItem = {
          id: `img_${Date.now()}_${index}`,
          file,
          url: URL.createObjectURL(file),
          width: 300,
          height: 200,
        }

        setImages((prev) => [...prev, imageItem])
        insertImageMarkdown(imageItem, index)
      })
    },
    [getImageCountInMarkdown, insertImageMarkdown]
  )

  const dragHandlers = {
    onDragOver: useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(true)
    }, []),

    onDragLeave: useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
    }, []),

    onDrop: useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
          processImageFiles(files)
        }
      },
      [processImageFiles]
    ),
  }

  const handleImageClick = useCallback((imageId: string) => {
    setSelectedImageId(imageId)
  }, [])

  const updateImageSize = useCallback(
    (id: string, property: 'width' | 'height', value: number) => {
      setImages((prev) => {
        const updated = prev.map((img) =>
          img.id === id ? { ...img, [property]: value } : img
        )

        const targetImage = updated.find((img) => img.id === id)
        if (targetImage) {
          const newImageTag = createImageMarkdown(targetImage)
          const updatedContent = content.replace(
            new RegExp(`<img[^>]*data-image-id="${id}"[^>]*/>`, 'g'),
            newImageTag
          )
          handleContentChange(updatedContent)
        }

        return updated
      })
    },
    [content, handleContentChange, createImageMarkdown]
  )

  const resetImageProperties = useCallback(
    (id: string) => {
      updateImageSize(id, 'width', 300)
      updateImageSize(id, 'height', 200)
    },
    [updateImageSize]
  )

  const closeImageModal = useCallback(() => setSelectedImageId(null), [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsResizing(true)
      const startY = e.clientY
      const startHeight = editorHeight

      const handleMouseMove = (e: MouseEvent) => {
        const deltaY = e.clientY - startY
        const newHeight = Math.max(300, Math.min(1000, startHeight + deltaY))
        setEditorHeight(newHeight)
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [editorHeight]
  )

  const selectedImage = selectedImageId
    ? images.find((img) => img.id === selectedImageId)
    : null

  const ResizeHandle = () => (
    <div
      className={`w-full h-2 bg-gray-200 hover:bg-gray-300 cursor-row-resize flex items-center justify-center transition-colors ${
        isResizing ? 'bg-blue-300' : ''
      }`}
      onMouseDown={handleMouseDown}
    >
      <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
    </div>
  )

  const DragOverlay = () => (
    <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center z-10 pointer-events-none">
      <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-500 border-dashed">
        <div className="text-center">
          <Upload size={48} className="mx-auto mb-4 text-blue-500" />
          <p className="text-lg font-medium text-blue-700">
            이미지를 여기에 드롭하세요
          </p>
          <p className="text-sm text-blue-600 mt-2">최대 5개까지 가능합니다</p>
        </div>
      </div>
    </div>
  )

  const ImageEditModal = () => {
    if (!selectedImage) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">이미지 편집</h3>
            <button
              onClick={closeImageModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4 text-center">
            <img
              src={selectedImage.url}
              alt="편집할 이미지"
              className="max-w-full max-h-96 mx-auto"
              style={{
                width: selectedImage.width,
                height: selectedImage.height,
              }}
            />
          </div>

          <div className="flex gap-4 items-center justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm">너비:</label>
              <input
                type="number"
                min="100"
                max="800"
                value={selectedImage.width || 300}
                onChange={(e) =>
                  updateImageSize(
                    selectedImage.id,
                    'width',
                    Number(e.target.value)
                  )
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-sm">px</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">높이:</label>
              <input
                type="number"
                min="100"
                max="600"
                value={selectedImage.height || 200}
                onChange={(e) =>
                  updateImageSize(
                    selectedImage.id,
                    'height',
                    Number(e.target.value)
                  )
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-sm">px</span>
            </div>

            <div className="w-full flex gap-2 justify-center mt-4">
              <button
                onClick={() => resetImageProperties(selectedImage.id)}
                className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                원본 크기로 되돌리기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ width }}>
      <div
        className={`border rounded-lg overflow-hidden relative ${
          isDragOver ? 'border-blue-500 border-2 bg-blue-50' : ''
        }`}
        {...dragHandlers}
      >
        {isDragOver && <DragOverlay />}

        <Toolbar
          onInsert={insertText}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
          onImageUpload={processImageFiles}
        />

        <div className="flex" style={{ height: `${editorHeight}px` }}>
          <div
            className={`${showPreview ? 'w-1/2' : 'w-full'} border-r border-gray-200`}
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm leading-relaxed"
            />
          </div>

          {showPreview && (
            <div className="w-1/2">
              <Preview content={content} onImageClick={handleImageClick} />
            </div>
          )}
        </div>

        <ResizeHandle />
      </div>

      <ImageEditModal />
    </div>
  )
}

export default MarkdownEditor
