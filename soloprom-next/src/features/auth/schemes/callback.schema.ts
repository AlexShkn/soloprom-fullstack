import { z } from 'zod'

export const CallbackSchema = z.object({
  name: z.string().min(1, { message: 'Введите имя' }),
  phone: z
    .string()
    .min(1, { message: 'Введите номер телефона' })
    .transform((val) => val.replace(/\D/g, ''))
    .refine(
      (val) => {
        return /^(8|7)?(\d{11})$/.test(val)
      },
      { message: 'Неверный формат номера телефона' },
    ),
  email: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
})

export type TypeCallbackSchema = z.infer<typeof CallbackSchema>
