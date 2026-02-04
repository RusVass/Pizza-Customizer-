import type { PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/utils/cn'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-black/10 text-ink-light dark:bg-white/15 dark:text-ink-dark'
      : 'text-black/60 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10'
  )

export const AppLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen">
    <header className="sticky top-0 z-10 border-b border-black/5 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl font-semibold tracking-tight">
            Pizza Customizer
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/builder" className={navLinkClass}>
              Builder
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">{children}</main>
  </div>
)
