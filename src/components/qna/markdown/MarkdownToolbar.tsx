import React, { useState } from 'react';

interface MarkdownToolbarProps {
  onStyleClick: (
    style:
      | 'bold'
      | 'italic'
      | 'underline'
      | 'strike'
      | 'link'
      | 'image'
      | 'list'
      | 'alignLeft'
      | 'alignCenter'
      | 'alignRight'
      | 'justify'
      | 'h1'
      | 'h2'
      | 'h3'
    ) => void;
  onColorChange: (color: string) => void;
}

const COLORS = [
  '#000000', // Black
  '#ff0000', // Red
  '#ffa500', // Orange
  '#008000', // Green
  '#0000ff', // Blue
  '#800080', // Purple
];

export default function MarkdownToolbar({
    onStyleClick,
    onColorChange,
}: MarkdownToolbarProps) {
  const [showColors, setShowColors] = useState(false);

  return (
    <div className="relative flex flex-wrap items-center gap-3 p-3 bg-white">
      {[
        { style: 'bold', icon: '/Bold.svg', label: 'Bold' },
        { style: 'italic', icon: '/Italic.svg', label: 'Italic' },
        { style: 'underline', icon: '/Underline.svg', label: 'Underline' },
        { style: 'strike', icon: '/Strike.svg', label: 'Strikethrough' },
        { isColor: true, icon: '/Textcolor.svg', label: 'Text Color' },
        { style: 'link', icon: '/Link.svg', label: 'Link' },
        { style: 'image', icon: '/Picture.svg', label: 'Image' },
        { style: 'list', icon: '/List.svg', label: 'List' },
        { style: 'alignLeft', icon: '/AlignLeft.svg', label: 'Align Left' },
        { style: 'alignCenter', icon: '/AlignCenter.svg', label: 'Align Center' },
        { style: 'alignRight', icon: '/AlignRight.svg', label: 'Align Right' },
        { style: 'justify', icon: '/JustifyText.svg', label: 'Justify' },
      ].map(({ style, icon, label, isColor }) =>
        isColor ? (
          <div key={label} className="relative">
            <button
              onClick={() => setShowColors((prev) => !prev)}
              title={label}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
            >
              <img src={icon} alt={label} className="w-5 h-5" />
            </button>

            {showColors && (
              <div className="absolute top-10 left-0 z-10 bg-white p-2 border rounded shadow flex gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      onColorChange(color);
                      setShowColors(false);
                    }}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            key={label}
            onClick={() => onStyleClick(style as any)}
            title={label}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
          >
            <img src={icon} alt={label} className="w-5 h-5" />
          </button>
        )
      )}
    {/* 헤딩 텍스트 버튼 */}
    <div className="flex gap-2 ml-4">
      {[
        { style: 'h1', label: 'H1' },
        { style: 'h2', label: 'H2' },
        { style: 'h3', label: 'H3' },
      ].map(({ style, label }) => (
        <button
          key={style}
          onClick={() => onStyleClick(style as any)}
          className="px-2 py-1 text-xs font-bold border rounded hover:bg-gray-100 transition"
          title={label}
        >
          {label}
        </button>
      ))}
    </div>

    </div>
  );
}