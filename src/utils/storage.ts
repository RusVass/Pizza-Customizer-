export const readStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export const writeStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    return
  }
}

export const readJson = <T>(key: string, fallback: T): T => {
  const raw = readStorage(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const writeJson = (key: string, value: unknown): void => {
  try {
    writeStorage(key, JSON.stringify(value))
  } catch {
    return
  }
}
