import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="label">{label}</span>}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-base text-ink-light shadow-sm outline-none transition focus:border-accent-light focus:ring-2 focus:ring-accent-light/30 dark:border-white/10 dark:bg-black/20 dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark/30',
          className
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-black/50 dark:text-white/50">{hint}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
)

Input.displayName = 'Input'
