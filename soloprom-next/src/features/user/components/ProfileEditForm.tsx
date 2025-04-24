'use client'

import { useState, useEffect } from 'react'
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
  Card,
  CardContent,
  CardFooter,
  FormDescription,
  Switch,
} from '@/components/ui'

import { SettingsSchema, TypeSettingsSchema } from '../schemes'
import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation'
import { IUser } from '@/features/auth/types'
import { SquarePen, UserRound } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

interface Props {
  user: IUser
}

export const ProfileEditForm: React.FC<Props> = () => {
  const { update, isLoadingUpdate } = useUpdateProfileMutation()
  const [isEditing, setIsEditing] = useState(false)

  const { userState, updateUserProfile } = useAuthStore()

  const form = useForm<TypeSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: '',
      email: '',
      isTwoFactorEnabled: false,
    },
  })

  useEffect(() => {
    if (userState) {
      form.reset({
        name: userState.displayName || '',
        email: userState.email || '',
        isTwoFactorEnabled: userState.isTwoFactorEnabled || false,
      })
    }
  }, [userState, form.reset])

  const onSubmit = (values: TypeSettingsSchema) => {
    update(values)
    updateUserProfile(values)
    setIsEditing(false)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    form.reset({
      name: userState.displayName || '',
      email: userState.email || '',
      isTwoFactorEnabled: userState.isTwoFactorEnabled || false,
    })
  }

  return (
    <Card className="flex flex-col items-start">
      <CardContent>
        {!isEditing ? (
          <div>
            <div className="flex w-full items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">Имя:</span>
              </div>
              {userState.displayName || 'Не указано'}
            </div>
            <div className="flex items-center gap-1">
              <div className="font-medium">Почта:</div>{' '}
              {userState.email || 'Не указано'}
            </div>
            <div className="flex items-center gap-1">
              <div className="font-medium">Двухфакторная аутентификация:</div>
              {userState.isTwoFactorEnabled ? (
                <span className="font-medium text-darkGreenColor">
                  Включена
                </span>
              ) : (
                'Отключена'
              )}
            </div>
          </div>
        ) : (
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
              {/* <FormField
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
              /> */}
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="shadow- flex flex-row items-center justify-between gap-2 rounded-lg border p-3">
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
              />
              <div className="flex justify-between">
                <Button type="submit" disabled={isLoadingUpdate}>
                  Сохранить
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancelClick}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex w-full justify-end">
        {!isEditing && (
          <Button
            onClick={handleEditClick}
            className="flex w-auto items-center gap-1"
          >
            <SquarePen className="h-4 w-4" />
            Редактировать
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
