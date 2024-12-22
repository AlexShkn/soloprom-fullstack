import React from 'react'
import Link from 'next/link'

interface AuthBottomNavProps {
  login?: boolean
  register?: boolean
  restore?: boolean
}

export const AuthBottomNav: React.FC<AuthBottomNavProps> = ({
  login,
  register,
  restore,
}) => {
  if (register && !restore) {
    return (
      <div className="mt-5">
        <div className="flex flex-col text-center font-medium">
          <p>
            Есть аккаунт?{' '}
            <Link
              href="/login"
              className="text-accentBlue transition-colors hover:text-darkBlue hover:underline"
            >
              Войдите
            </Link>
          </p>
        </div>
      </div>
    )
  }
  if (register && restore) {
    return (
      <div className="mt-5">
        <div className="flex flex-col text-center font-medium">
          <p>
            Новый пользователь?{' '}
            <Link
              href="/register"
              className="text-accentBlue transition-colors hover:text-darkBlue hover:underline"
            >
              Зарегистрируйтесь
            </Link>
          </p>
        </div>
      </div>
    )
  }
  if (login && !restore) {
    return (
      <div className="mt-5">
        <div className="flex flex-col text-center font-medium">
          <p>
            Новый пользователь?{' '}
            <Link
              href="/register"
              className="text-accentBlue transition-colors hover:text-darkBlue hover:underline"
            >
              Зарегистрируйтесь
            </Link>
          </p>
          <p>
            или{' '}
            <Link
              href="/restore"
              className="text-accentBlue transition-colors hover:text-darkBlue hover:underline"
            >
              Восстановите доступ
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return null
}
