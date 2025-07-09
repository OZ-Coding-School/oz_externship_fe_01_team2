// Button.types.ts
export interface ButtonProps {
  variant?: 'fill' | 'outline' | 'ghost' | 'check'
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}
