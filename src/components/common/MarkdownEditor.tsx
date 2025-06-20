import { useRef, useState } from 'react';
import MarkdownToolbar from '../qna/markdown/MarkdownToolbar';
import MarkdownPreview from '../qna/markdown/MarkdownPreview';

interface StyleTag {
  open: string;
  close?: string;
}

const styleMap: Record<string, StyleTag> = {
  bold: { open: '**' },
  italic: { open: '_' },
  strike: { open: '~~' },
  underline: { open: '<u>', close: '</u>' },
  alignLeft: { open: '<div style="text-align: left;">', close: '</div>' },
  alignCenter: { open: '<div style="text-align: center;">', close: '</div>' },
  alignRight: { open: '<div style="text-align: right;">', close: '</div>' },
  justify: { open: '<div style="text-align: justify;">', close: '</div>' },
  h1: { open: '# ' },
  h2: { open: '## ' },
  h3: { open: '### ' },
};

export default function MarkdownEditor() {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyWrapper = (open: string, close: string = open) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);

    const newText = selectedText
      ? `${content.slice(0, start)}${open}${selectedText}${close}${content.slice(end)}`
      : `${content.slice(0, start)}${open}${close}${content.slice(end)}`;

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const cursorStart = start + open.length;
      if (selectedText) {
        textarea.setSelectionRange(cursorStart, cursorStart + selectedText.length);
      } else {
        textarea.setSelectionRange(cursorStart, cursorStart);
      }
    }, 0);
  };

  const applyList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lines = content.split('\n');

    const currentLineIndex = content.slice(0, start).split('\n').length - 1;
    const currentLine = lines[currentLineIndex];

    const isList = currentLine.startsWith('- ');
    lines[currentLineIndex] = isList
      ? currentLine.slice(2)
      : `- ${currentLine}`;

    const newText = lines.join('\n');
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const offset = isList ? -2 : 2;
      textarea.setSelectionRange(start + offset, end + offset);
    }, 0);
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden  bg-white">
      {/* 툴바 (border-b로 아래와 구분) */}
      <div className="w-full flex justify-center border">
        <MarkdownToolbar
          onStyleClick={(style) => {
            if (style === 'list') {
              applyList();
              return;
            }
            const tag = styleMap[style];
            if (tag) applyWrapper(tag.open, tag.close);
          }}
          onColorChange={(color) => {
            applyWrapper(`<span style="color:${color}">`, `</span>`);
          }}
        />
      </div>
  
      {/* 입력 + 미리보기 영역 */}
      <div className="flex">
        {/* 입력창 */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          className="w-1/2 h-[400px] p-4 text-sm resize-none focus:outline-none"
        />
  
        {/* 미리보기 */}
        <div className="w-1/2 h-[400px] p-4 text-sm bg-gray-50 overflow-auto">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
}