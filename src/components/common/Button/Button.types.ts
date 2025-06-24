// Button.types.ts
export interface ButtonProps {
  variant?: 'fill' | 'outline' | 'ghost'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  radius?: string
  width?: string
  height?: string
  fontSize?: string
}
