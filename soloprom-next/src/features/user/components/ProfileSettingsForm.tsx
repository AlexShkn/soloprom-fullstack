'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loading,
  Switch,
} from '@/components/ui'
import { useProfile } from '@/hooks/useProfile'

import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation'
import { SettingsSchema, TypeSettingsSchema } from '../schemes'
import { useLogoutMutation } from '../hooks/useLogoutMutation'
import { OrderList } from './OrderList'

export function ProfileSettingsForm() {
  const { user, isLoading } = useProfile()
  const { logout, isLoadingLogout } = useLogoutMutation()

  const router = useRouter()

  const form = useForm<TypeSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: '',
      email: '',
      isTwoFactorEnabled: false,
    },
  })

  const { update, isLoadingUpdate } = useUpdateProfileMutation()

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || '',
        email: user.email || '',
        isTwoFactorEnabled: user.isTwoFactorEnabled || false,
      })
    }
  }, [user, form.reset])

  useEffect(() => {
    if (!user && !isLoading) {
      logout()
    }
  }, [user, isLoading, router])

  const onSubmit = (values: TypeSettingsSchema) => {
    update(values)
  }

  if (isLoading) return <Loading classNames="mt-[50px] pt-[50px] pb-[50px]" />
  if (!user) return null

  return (
    <div className="border-t-1 border border-grayColor py-10">
      <div className="page-container mb-10 w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Настройки профиля</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </div>

      {!isLoading && user && <OrderList user={user} />}
    </div>
  )
}
