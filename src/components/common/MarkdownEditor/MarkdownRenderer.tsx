import '@styles/markdown.css'
import { cn } from '@utils/cn'
import 'highlight.js/styles/github.css'
import React, { type ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
  children?: React.ReactNode
}

const MarkdownRenderer = ({
  content,
  className = '',
}: MarkdownRendererProps) => {
  const components = {
    code({
      inline,
      className,
      children,
      ...props
    }: ComponentProps<'code'> & { inline?: boolean }) {
      return inline ? (
        <code className="bg--100 px-1 rounded text-sm">{children}</code>
      ) : (
        <code
          className={cn('hljs bg-gray-100! rounded-lg', className)}
          {...props}
        >
          {children}
        </code>
      )
    },
  }
  return (
    <div className={cn(`prose prose-sm max-w-none markdown-body ${className}`)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
