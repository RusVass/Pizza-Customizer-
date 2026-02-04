import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { DOUGHS, SIZES, TOPPING_GROUPS } from '@/features/pizza/data/pizzaOptions'
import { usePizzaStore } from '@/store/pizzaStore'
import type { PizzaDraft } from '@/types/pizza'
import { calcPizzaPrice, formatPrice } from '@/utils/price'
import { pizzaSchema, type PizzaFormValues } from './schema'
import { cn } from '@/utils/cn'

const emptyDraft: PizzaDraft = {
  name: '',
  sizeId: 'M',
  doughId: 'classic',
  toppingIds: []
}

export const BuilderPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const pizza = usePizzaStore((state) => (id ? state.getPizzaById(id) : undefined))
  const addPizza = usePizzaStore((state) => state.addPizza)
  const updatePizza = usePizzaStore((state) => state.updatePizza)

  const defaultValues = useMemo<PizzaDraft>(() => {
    if (!pizza) return emptyDraft
    return {
      name: pizza.name,
      sizeId: pizza.sizeId,
      doughId: pizza.doughId,
      toppingIds: pizza.toppingIds
    }
  }, [pizza])

  const form = useForm<PizzaFormValues>({
    resolver: zodResolver(pizzaSchema),
    defaultValues
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  const values = useWatch({ control: form.control })
  const price = calcPizzaPrice({
    sizeId: values.sizeId ?? defaultValues.sizeId,
    doughId: values.doughId ?? defaultValues.doughId,
    toppingIds: values.toppingIds ?? defaultValues.toppingIds
  })

  const handleSubmit = (data: PizzaFormValues) => {
    if (id && pizza) {
      updatePizza(id, data)
    } else {
      addPizza(data)
    }
    navigate('/')
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <div>
          <p className="label">Pizza Builder</p>
          <h1 className="section-title">{id && pizza ? 'Edit Pizza' : 'Create Pizza'}</h1>
          {!pizza && id && (
            <p className="mt-2 text-sm text-red-500">Pizza not found. Create a new one.</p>
          )}
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Input
            label="Name"
            placeholder="e.g. Italian Classic"
            error={form.formState.errors.name?.message}
            {...form.register('name')}
          />

          <div className="space-y-3">
            <p className="label">Size</p>
            <div className="grid gap-3 md:grid-cols-3">
              {SIZES.map((size) => (
                <label key={size.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    value={size.id}
                    className="peer sr-only"
                    {...form.register('sizeId')}
                  />
                  <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-sm transition peer-checked:border-accent-light peer-checked:bg-accent-light/10 dark:border-white/10 dark:bg-black/30 dark:peer-checked:border-accent-dark dark:peer-checked:bg-accent-dark/15">
                    <p className="font-medium">{size.label}</p>
                    <p className="text-xs text-black/50 dark:text-white/60">+ {formatPrice(size.price)}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="label">Dough</p>
            <select
              className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-base text-ink-light shadow-sm outline-none transition focus:border-accent-light focus:ring-2 focus:ring-accent-light/30 dark:border-white/10 dark:bg-black/20 dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark/30"
              {...form.register('doughId')}
            >
              {DOUGHS.map((dough) => (
                <option key={dough.id} value={dough.id}>
                  {dough.label} (+{formatPrice(dough.price)})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <p className="label">Toppings</p>
            <div className="space-y-6">
              {TOPPING_GROUPS.map((group) => (
                <fieldset key={group.id} className="space-y-3">
                  <legend className="text-sm font-semibold">{group.label}</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    {group.items.map((topping) => (
                      <label
                        key={topping.id}
                        className={cn(
                          'flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm transition hover:border-accent-light dark:border-white/10 dark:bg-black/30 dark:hover:border-accent-dark'
                        )}
                      >
                        <span>{topping.name}</span>
                        <span className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                          +{formatPrice(topping.price)}
                          <input
                            type="checkbox"
                            value={topping.id}
                            className="h-4 w-4 accent-accent-light dark:accent-accent-dark"
                            {...form.register('toppingIds')}
                          />
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg">
              {id && pizza ? 'Update Pizza' : 'Create Pizza'}
            </Button>
            <Link to="/">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card p-6">
          <p className="label">Live Price</p>
          <p className="mt-2 text-3xl font-semibold">{formatPrice(price)}</p>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Price updates when size, dough, or toppings change.
          </p>
        </div>
        <div className="card space-y-3 p-6 text-sm text-black/60 dark:text-white/60">
          <p>
            Tip: create multiple pizzas and manage them in the dashboard.
          </p>
        </div>
      </aside>
    </section>
  )
}
