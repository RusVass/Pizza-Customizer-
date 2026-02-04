import type { DoughOption, PizzaSize, Topping, ToppingGroup } from '@/types/pizza'

export const SIZES: PizzaSize[] = [
  { id: 'S', label: 'Small 25 cm', price: 6 },
  { id: 'M', label: 'Medium 30 cm', price: 8.5 },
  { id: 'L', label: 'Large 35 cm', price: 11.5 }
]

export const DOUGHS: DoughOption[] = [
  { id: 'thin', label: 'Thin', price: 0 },
  { id: 'classic', label: 'Classic', price: 1 },
  { id: 'cheese-crust', label: 'Cheese crust', price: 2.5 }
]

const TOPPINGS: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', price: 1.6, category: 'meat' },
  { id: 'bacon', name: 'Bacon', price: 1.7, category: 'meat' },
  { id: 'chicken', name: 'Chicken', price: 1.5, category: 'meat' },
  { id: 'mushrooms', name: 'Mushrooms', price: 0.9, category: 'veggie' },
  { id: 'onions', name: 'Onions', price: 0.6, category: 'veggie' },
  { id: 'peppers', name: 'Peppers', price: 0.8, category: 'veggie' },
  { id: 'spinach', name: 'Spinach', price: 0.9, category: 'veggie' },
  { id: 'mozzarella', name: 'Mozzarella', price: 1.2, category: 'cheese' },
  { id: 'feta', name: 'Feta', price: 1.1, category: 'cheese' },
  { id: 'bbq', name: 'BBQ sauce', price: 0.7, category: 'sauce' },
  { id: 'pesto', name: 'Pesto', price: 0.9, category: 'sauce' },
  { id: 'olives', name: 'Olives', price: 0.8, category: 'other' },
  { id: 'jalapeno', name: 'Jalapeno', price: 0.7, category: 'other' }
]

export const TOPPING_GROUPS: ToppingGroup[] = [
  {
    id: 'meat',
    label: 'Meats',
    items: TOPPINGS.filter((topping) => topping.category === 'meat')
  },
  {
    id: 'veggie',
    label: 'Veggies',
    items: TOPPINGS.filter((topping) => topping.category === 'veggie')
  },
  {
    id: 'cheese',
    label: 'Cheese',
    items: TOPPINGS.filter((topping) => topping.category === 'cheese')
  },
  {
    id: 'sauce',
    label: 'Sauces',
    items: TOPPINGS.filter((topping) => topping.category === 'sauce')
  },
  {
    id: 'other',
    label: 'Other',
    items: TOPPINGS.filter((topping) => topping.category === 'other')
  }
]

export const TOPPING_MAP = new Map(TOPPINGS.map((topping) => [topping.id, topping]))
