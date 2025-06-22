// Toolbar/ToolbarButton.tsx

import React from 'react';
import type { ToolbarButtonProps } from '../MarkdownEditor.types';

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  title, 
  onClick, 
  isActive = false 
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`
      p-2 rounded hover:bg-gray-100 transition-colors
      ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}
    `}
  >
    {icon}
  </button>
);

export default ToolbarButton;