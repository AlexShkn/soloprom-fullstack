import { z } from 'zod'

// Схема для первого этапа (регистрация)
export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: 'Введите имя' }),
    email: z.string().email({ message: 'Некорректная почта' }),
    password: z.string().min(6, { message: 'Пароль минимум 6 символов' }),
    passwordRepeat: z
      .string()
      .min(6, { message: 'Пароль подтверждения минимум 6 символов' }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })

// Схема для второго этапа (ввод кода)
export const ConfirmCodeSchema = z.object({
  code: z.string().length(6, { message: 'Код должен быть длиной 6 символов' }),
})

// Типы для форм
export type RegisterFormValues = z.infer<typeof RegisterSchema>
export type ConfirmCodeFormValues = z.infer<typeof ConfirmCodeSchema>
