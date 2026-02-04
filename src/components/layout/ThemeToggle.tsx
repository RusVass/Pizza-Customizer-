import { Toggle } from '@/components/ui/Toggle'
import { useThemeStore } from '@/store/themeStore'
import type { ThemeMode } from '@/types/theme'

const MODE_LABELS: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
}

export const ThemeToggle = () => {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full bg-black/5 p-1 dark:bg-white/10">
      {(['light', 'dark', 'system'] as ThemeMode[]).map((value) => (
        <Toggle key={value} pressed={mode === value} onClick={() => setMode(value)}>
          {MODE_LABELS[value]}
        </Toggle>
      ))}
    </div>
  )
}
