import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PizzaCard } from '@/features/pizza/components/PizzaCard'
import { usePizzaStore } from '@/store/pizzaStore'

export const DashboardPage = () => {
  const pizzas = usePizzaStore((state) => state.pizzas)
  const deletePizza = usePizzaStore((state) => state.deletePizza)

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label">Dashboard</p>
          <h1 className="section-title">Your Pizzas</h1>
        </div>
        <Link to="/builder">
          <Button size="lg">Create Pizza</Button>
        </Link>
      </div>

      {pizzas.length === 0 ? (
        <div className="card flex flex-col gap-4 p-8 text-center">
          <h2 className="text-xl font-semibold">No orders yet</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Create your first pizza and return here to manage the list.
          </p>
          <Link to="/builder" className="mx-auto">
            <Button>Create Pizza</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} onDelete={deletePizza} />
          ))}
        </div>
      )}
    </section>
  )
}
