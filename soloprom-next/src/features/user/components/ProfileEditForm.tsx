'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'

import { SettingsSchema, TypeSettingsSchema } from '../schemes'
import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation'
import { IUser } from '@/features/auth/types'

interface Props {
  user: IUser
}

export const ProfileEditForm: React.FC<Props> = ({ user }) => {
  const { update, isLoadingUpdate } = useUpdateProfileMutation()

  const form = useForm<TypeSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: '',
      email: '',
      isTwoFactorEnabled: false,
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || '',
        email: user.email || '',
        isTwoFactorEnabled: user.isTwoFactorEnabled || false,
      })
    }
  }, [user, form.reset])

  const onSubmit = (values: TypeSettingsSchema) => {
    update(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-2 space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  placeholder="Иван"
                  disabled={isLoadingUpdate}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input
                  placeholder="ivan@example.com"
                  disabled={isLoadingUpdate}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
				control={form.control}
				name="isTwoFactorEnabled"
				render={({ field }) => (
					<FormItem className="shadow- flex flex-row items-center justify-between rounded-lg border p-3">
						<div className="space-y-0.5">
							<FormLabel>Двухфакторная аутентификация</FormLabel>
							<FormDescription>
								Включите двухфакторную аутентификацию для вашей учетной
								записи
							</FormDescription>
						</div>
						<FormControl>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
					</FormItem>
				)}
			/> */}
        <Button type="submit" disabled={isLoadingUpdate}>
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
