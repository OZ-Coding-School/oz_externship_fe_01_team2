import React from 'react';

interface MarkdownInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function MarkdownInput({ value, onChange }: MarkdownInputProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="w-full h-64 p-4 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="여기에 마크다운을 입력하세요..."
    />
  );
}