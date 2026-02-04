import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { applyResolvedTheme, resolveTheme } from '@/utils/theme'

export const useThemeEffect = (): void => {
  const mode = useThemeStore((state) => state.mode)

  useEffect(() => {
    applyResolvedTheme(resolveTheme(mode))
  }, [mode])

  useEffect(() => {
    if (mode !== 'system' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyResolvedTheme(resolveTheme(mode))

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode])
}
