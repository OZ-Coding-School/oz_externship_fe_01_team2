// Button.types.ts
export interface ButtonProps {
  variant?: 'fill' | 'outline' | 'ghost' | 'check'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  radius?: string
  width?: string
  height?: string
  fontSize?: string
}
