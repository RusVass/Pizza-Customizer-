import { create } from 'zustand'
import type { ThemeMode } from '@/types/theme'
import { getInitialThemeMode, persistThemeMode, resolveTheme } from '@/utils/theme'

interface ThemeStore {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: getInitialThemeMode(),
  setMode: (mode) => {
    persistThemeMode(mode)
    set({ mode })
  },
  toggleMode: () => {
    const current = get().mode
    const resolved = resolveTheme(current)
    const next = resolved === 'dark' ? 'light' : 'dark'
    persistThemeMode(next)
    set({ mode: next })
  }
}))
