import { z } from 'zod'

export const OrderSchema = z.object({
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
  family: z.string().optional(),
  patronymic: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  personType: z.enum(['Физ.лицо', 'Юр.лицо']),
  deliveryMethods: z.array(z.string()).optional(),
})

export type TypeOrderSchema = z.infer<typeof OrderSchema>
