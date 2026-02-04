import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light/60 dark:focus-visible:ring-accent-dark/60 disabled:opacity-60 disabled:pointer-events-none'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-light text-white shadow-soft hover:shadow-none dark:bg-accent-dark dark:text-black',
  secondary:
    'bg-black/5 text-ink-light hover:bg-black/10 dark:bg-white/10 dark:text-ink-dark dark:hover:bg-white/20',
  ghost: 'bg-transparent text-ink-light hover:bg-black/5 dark:text-ink-dark dark:hover:bg-white/10',
  danger: 'bg-red-500 text-white hover:bg-red-600'
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) => (
  <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props} />
)
