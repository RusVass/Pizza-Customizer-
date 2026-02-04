import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean
}

export const Toggle = ({ pressed = false, className, ...props }: ToggleProps) => (
  <button
    type="button"
    aria-pressed={pressed}
    className={cn(
      'rounded-full px-4 py-2 text-sm font-medium transition',
      pressed
        ? 'bg-accent-light text-white shadow-soft dark:bg-accent-dark dark:text-black'
        : 'bg-black/5 text-ink-light hover:bg-black/10 dark:bg-white/10 dark:text-ink-dark dark:hover:bg-white/20',
      className
    )}
    {...props}
  />
)
