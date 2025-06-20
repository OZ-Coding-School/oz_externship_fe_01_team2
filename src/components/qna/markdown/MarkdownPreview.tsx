import React from 'react';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')      
      .replace(/(^|[^*_])_(.*?)_([^*_]|$)/g, '$1<em>$2</em>$3')                  
      .replace(/~~(.*?)~~/g, '<del>$1</del>')                 
      .replace(/\n/g, '<br />');                            
  };

  return (
    <div
      className="p-4  rounded-md bg-gray-50 text-sm"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}