import { readStorage, writeStorage } from './storage'
import type { ThemeMode } from '@/types/theme'

export const THEME_STORAGE_KEY = 'pizza.theme'

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system'

export const getSystemTheme = (): Exclude<ThemeMode, 'system'> => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const resolveTheme = (mode: ThemeMode): Exclude<ThemeMode, 'system'> =>
  mode === 'system' ? getSystemTheme() : mode

export const getInitialThemeMode = (): ThemeMode => {
  const stored = readStorage(THEME_STORAGE_KEY)
  if (isThemeMode(stored)) return stored
  return 'system'
}

export const persistThemeMode = (mode: ThemeMode): void => {
  writeStorage(THEME_STORAGE_KEY, mode)
}

export const applyResolvedTheme = (resolved: Exclude<ThemeMode, 'system'>): void => {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.style.colorScheme = resolved
}
