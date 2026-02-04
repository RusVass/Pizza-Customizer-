import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { DOUGHS, SIZES, TOPPING_MAP } from '@/features/pizza/data/pizzaOptions'
import { calcPizzaPrice, formatPrice } from '@/utils/price'
import type { Pizza } from '@/types/pizza'

interface PizzaCardProps {
  pizza: Pizza
  onDelete: (id: string) => void
}

const getSizeLabel = (id: Pizza['sizeId']) => SIZES.find((size) => size.id === id)?.label ?? id
const getDoughLabel = (id: Pizza['doughId']) => DOUGHS.find((dough) => dough.id === id)?.label ?? id

export const PizzaCard = ({ pizza, onDelete }: PizzaCardProps) => {
  const toppings = pizza.toppingIds
    .map((toppingId) => TOPPING_MAP.get(toppingId)?.name)
    .filter(Boolean)
  const price = calcPizzaPrice({
    sizeId: pizza.sizeId,
    doughId: pizza.doughId,
    toppingIds: pizza.toppingIds
  })

  return (
    <article className="card flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{pizza.name}</h3>
          <p className="text-sm text-black/60 dark:text-white/60">
            {getSizeLabel(pizza.sizeId)} · {getDoughLabel(pizza.doughId)}
          </p>
        </div>
        <span className="rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-ink-light dark:bg-white/10 dark:text-ink-dark">
          {formatPrice(price)}
        </span>
      </div>
      <div className="flex-1">
        {toppings.length > 0 ? (
          <ul className="flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
            {toppings.map((topping) => (
              <li
                key={topping}
                className="rounded-full border border-black/10 px-3 py-1 dark:border-white/10"
              >
                {topping}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-black/50 dark:text-white/50">No extra toppings</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to={`/builder/${pizza.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            Edit
          </Button>
        </Link>
        <Button variant="danger" className="flex-1" onClick={() => onDelete(pizza.id)}>
          Delete
        </Button>
      </div>
    </article>
  )
}
