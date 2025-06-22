// Toolbar/Toolbar.tsx

import React from 'react';
import { 
  Bold, 
  Italic, 
  Link, 
  Image, 
  List, 
  ListOrdered,
  Quote,
  Code,
  Eye,
  Edit
} from 'lucide-react';
import type { ToolbarProps } from '../MarkdownEditor.types';
import ToolbarButton from './ToolbarButton';

const Toolbar: React.FC<ToolbarProps> = ({ onInsert, showPreview, onTogglePreview }) => (
  <div className="flex items-center gap-1 p-2 border-b bg-gray-50 rounded-t-lg">
    <ToolbarButton
      icon={<Bold size={16} />}
      title="Bold (Ctrl+B)"
      onClick={() => onInsert('**', '**')}
    />
    <ToolbarButton
      icon={<Italic size={16} />}
      title="Italic (Ctrl+I)"
      onClick={() => onInsert('*', '*')}
    />
    <div className="w-px h-6 bg-gray-300 mx-1" />
    <ToolbarButton
      icon={<Link size={16} />}
      title="Link"
      onClick={() => onInsert('[', '](url)')}
    />
    <ToolbarButton
      icon={<Image size={16} />}
      title="Image"
      onClick={() => onInsert('![alt](', ')')}
    />
    <div className="w-px h-6 bg-gray-300 mx-1" />
    <ToolbarButton
      icon={<List size={16} />}
      title="Bullet List"
      onClick={() => onInsert('- ')}
    />
    <ToolbarButton
      icon={<ListOrdered size={16} />}
      title="Numbered List"
      onClick={() => onInsert('1. ')}
    />
    <ToolbarButton
      icon={<Quote size={16} />}
      title="Quote"
      onClick={() => onInsert('> ')}
    />
    <ToolbarButton
      icon={<Code size={16} />}
      title="Code"
      onClick={() => onInsert('`', '`')}
    />
    <div className="flex-1" />
    <ToolbarButton
      icon={showPreview ? <Edit size={16} /> : <Eye size={16} />}
      title={showPreview ? "편집 모드로 전환" : "미리보기 모드로 전환"}
      onClick={onTogglePreview}
      isActive={showPreview}
    />
  </div>
);

export default Toolbar;