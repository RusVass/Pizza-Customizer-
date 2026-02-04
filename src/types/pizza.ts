export type ToppingCategory = 'meat' | 'veggie' | 'cheese' | 'sauce' | 'other'

export interface Topping {
  id: string
  name: string
  price: number
  category: ToppingCategory
}

export interface ToppingGroup {
  id: ToppingCategory
  label: string
  items: Topping[]
}

export interface PizzaSize {
  id: 'S' | 'M' | 'L'
  label: string
  price: number
}

export interface DoughOption {
  id: 'thin' | 'classic' | 'cheese-crust'
  label: string
  price: number
}

export interface Pizza {
  id: string
  name: string
  sizeId: PizzaSize['id']
  doughId: DoughOption['id']
  toppingIds: string[]
  createdAt: string
  updatedAt: string
}

export interface PizzaDraft {
  name: string
  sizeId: PizzaSize['id']
  doughId: DoughOption['id']
  toppingIds: string[]
}
