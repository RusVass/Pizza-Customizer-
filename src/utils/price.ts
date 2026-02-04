import { DOUGHS, SIZES, TOPPING_MAP } from '@/features/pizza/data/pizzaOptions'
import type { PizzaDraft } from '@/types/pizza'

export interface PriceInput extends Pick<PizzaDraft, 'sizeId' | 'doughId' | 'toppingIds'> {}

const roundToTwo = (value: number): number => Math.round(value * 100) / 100

export const calcPizzaPrice = ({ sizeId, doughId, toppingIds }: PriceInput): number => {
  const sizePrice = SIZES.find((size) => size.id === sizeId)?.price ?? 0
  const doughPrice = DOUGHS.find((dough) => dough.id === doughId)?.price ?? 0
  const toppingsPrice = toppingIds.reduce((total, toppingId) => {
    const topping = TOPPING_MAP.get(toppingId)
    return total + (topping?.price ?? 0)
  }, 0)

  return roundToTwo(sizePrice + doughPrice + toppingsPrice)
}

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
