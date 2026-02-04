import { describe, expect, it, beforeEach } from 'vitest'
import { usePizzaStore } from '@/store/pizzaStore'

const resetStore = () => usePizzaStore.setState({ pizzas: [] })

describe('pizzaStore', () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
  })

  it('adds and deletes pizza', () => {
    const created = usePizzaStore.getState().addPizza({
      name: 'Test',
      sizeId: 'S',
      doughId: 'thin',
      toppingIds: []
    })

    expect(usePizzaStore.getState().pizzas).toHaveLength(1)

    usePizzaStore.getState().deletePizza(created.id)
    expect(usePizzaStore.getState().pizzas).toHaveLength(0)
  })

  it('updates pizza', () => {
    const created = usePizzaStore.getState().addPizza({
      name: 'Test',
      sizeId: 'S',
      doughId: 'thin',
      toppingIds: []
    })

    const updated = usePizzaStore.getState().updatePizza(created.id, {
      name: 'Updated',
      sizeId: 'L',
      doughId: 'classic',
      toppingIds: ['pepperoni']
    })

    expect(updated?.name).toBe('Updated')
    expect(usePizzaStore.getState().pizzas[0].sizeId).toBe('L')
  })

  it('returns null when updating missing pizza', () => {
    const updated = usePizzaStore.getState().updatePizza('missing', {
      name: 'Missing',
      sizeId: 'S',
      doughId: 'thin',
      toppingIds: []
    })

    expect(updated).toBeNull()
    expect(usePizzaStore.getState().pizzas).toHaveLength(0)
  })

  it('keeps list unchanged when deleting missing pizza', () => {
    const created = usePizzaStore.getState().addPizza({
      name: 'Test',
      sizeId: 'M',
      doughId: 'classic',
      toppingIds: []
    })

    usePizzaStore.getState().deletePizza('missing')
    expect(usePizzaStore.getState().pizzas).toHaveLength(1)
    expect(usePizzaStore.getState().pizzas[0].id).toBe(created.id)
  })

  it('persists pizzas to localStorage', () => {
    usePizzaStore.getState().addPizza({
      name: 'Persisted',
      sizeId: 'S',
      doughId: 'thin',
      toppingIds: ['pepperoni']
    })

    const stored = localStorage.getItem('pizza.pizzas')
    expect(stored).toContain('Persisted')
  })
})
