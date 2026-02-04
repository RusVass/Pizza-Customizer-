import { describe, expect, it } from 'vitest'
import { calcPizzaPrice } from '@/utils/price'

describe('calcPizzaPrice', () => {
  it('calculates base + toppings', () => {
    const price = calcPizzaPrice({
      sizeId: 'M',
      doughId: 'classic',
      toppingIds: ['pepperoni', 'mushrooms']
    })

    expect(price).toBe(12)
  })

  it('returns base price when toppings are empty', () => {
    const price = calcPizzaPrice({
      sizeId: 'S',
      doughId: 'thin',
      toppingIds: []
    })

    expect(price).toBe(6)
  })

  it('ignores unknown topping ids', () => {
    const price = calcPizzaPrice({
      sizeId: 'M',
      doughId: 'classic',
      toppingIds: ['unknown-1', 'unknown-2']
    })

    expect(price).toBe(8)
  })

  it('rounds to two decimals', () => {
    const price = calcPizzaPrice({
      sizeId: 'L',
      doughId: 'cheese-crust',
      toppingIds: ['pesto', 'goat-cheese']
    })

    expect(price).toBe(15.5)
  })
})
