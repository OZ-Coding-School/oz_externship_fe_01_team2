// Button.types.ts
export interface ButtonProps {
  variant?: 'fill' | 'outline' | 'ghost' | 'check'
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}
