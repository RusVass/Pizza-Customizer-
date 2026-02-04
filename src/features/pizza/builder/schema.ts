import { z } from 'zod'

export const pizzaSchema = z.object({
  name: z
    .string()
    .min(2, 'Minimum 2 characters')
    .max(40, 'Maximum 40 characters')
    .trim(),
  sizeId: z.enum(['S', 'M', 'L']),
  doughId: z.enum(['thin', 'classic', 'cheese-crust']),
  toppingIds: z.array(z.string()).default([])
})

export type PizzaFormValues = z.infer<typeof pizzaSchema>
