import React from 'react';

interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    rows?: number;
}

export default function Textarea({
    value,
    onChange,
    placeholder = '',
    disabled = false,
    error,
    rows = 4,
  }: TextareaProps) {
    return (
      <div className="w-full">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`
            w-full px-4 py-3 text-sm rounded-lg transition-colors resize-none
            ${disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-black'}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}
            border focus:outline-none focus:ring-1
          `}
        />
       
        
      </div>
    );
  }