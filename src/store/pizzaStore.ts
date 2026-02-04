import { create } from 'zustand'
import type { Pizza, PizzaDraft } from '@/types/pizza'
import { createId } from '@/utils/id'
import { readJson, writeJson } from '@/utils/storage'

interface PizzaStore {
  pizzas: Pizza[]
  addPizza: (draft: PizzaDraft) => Pizza
  updatePizza: (id: string, draft: PizzaDraft) => Pizza | null
  deletePizza: (id: string) => void
  getPizzaById: (id: string) => Pizza | undefined
}

const nowIso = (): string => new Date().toISOString()
const STORAGE_KEY = 'pizza.pizzas'

const isPizza = (value: unknown): value is Pizza => {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>

  const hasValidSize = record.sizeId === 'S' || record.sizeId === 'M' || record.sizeId === 'L'
  const hasValidDough =
    record.doughId === 'thin' || record.doughId === 'classic' || record.doughId === 'cheese-crust'

  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    hasValidSize &&
    hasValidDough &&
    Array.isArray(record.toppingIds) &&
    record.toppingIds.every((id) => typeof id === 'string') &&
    typeof record.createdAt === 'string' &&
    typeof record.updatedAt === 'string'
  )
}

const loadPizzas = (): Pizza[] => {
  const raw = readJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(raw)) return []
  return raw.filter(isPizza)
}

const persistPizzas = (pizzas: Pizza[]): void => {
  writeJson(STORAGE_KEY, pizzas)
}

export const usePizzaStore = create<PizzaStore>((set, get) => ({
  pizzas: loadPizzas(),
  addPizza: (draft) => {
    const timestamp = nowIso()
    const pizza: Pizza = {
      id: createId(),
      name: draft.name,
      sizeId: draft.sizeId,
      doughId: draft.doughId,
      toppingIds: draft.toppingIds,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    set((state) => {
      const pizzas = [pizza, ...state.pizzas]
      persistPizzas(pizzas)
      return { pizzas }
    })

    return pizza
  },
  updatePizza: (id, draft) => {
    const existing = get().pizzas.find((pizza) => pizza.id === id)
    if (!existing) return null

    const updated: Pizza = {
      ...existing,
      ...draft,
      updatedAt: nowIso()
    }

    set((state) => {
      const pizzas = state.pizzas.map((pizza) => (pizza.id === id ? updated : pizza))
      persistPizzas(pizzas)
      return { pizzas }
    })

    return updated
  },
  deletePizza: (id) => {
    set((state) => {
      const pizzas = state.pizzas.filter((pizza) => pizza.id !== id)
      persistPizzas(pizzas)
      return { pizzas }
    })
  },
  getPizzaById: (id) => get().pizzas.find((pizza) => pizza.id === id)
}))
