'use client'
import { useEffect, useState } from 'react' // Импортируем useEffect и useState
import Link from 'next/link'
import PageWrapper from './PageWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'

import { Home, Search } from 'lucide-react' // Импортируем иконки
import Image from 'next/image'
import { Button } from '@/ui'

export default function NotFound() {
  const [mounted, setMounted] = useState(false) // Добавляем useState для отслеживания монтирования

  useEffect(() => {
    setMounted(true) // Устанавливаем mounted в true после монтирования
  }, [])

  if (!mounted) {
    return null // Возвращаем null пока компонент не смонтируется
  }

  return (
    <TransitionWrapper>
      <PageWrapper>
        <div className="flex min-h-screen flex-col items-center bg-gray-100 py-8">
          <div className="relative mb-2 h-52 w-64">
            <Image
              src="/img/not-found.webp"
              alt="404 - Колесо"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 mds:text-4xl">
            Страница не найдена
          </h1>
          <p className="mb-8 max-w-[500px] text-center text-gray-600">
            К сожалению, запрашиваемая вами страница не существует. Возможно, вы
            ошиблись в адресе или страница была удалена.
          </p>

          <div className="flex space-x-4">
            <Button asChild variant="link">
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            <Button asChild>
              <Link href="/catalog" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Каталог
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-center text-gray-500">
            <p>
              Если вы считаете, что это ошибка, пожалуйста, свяжитесь с нами.
            </p>
            {/* <a href="/contact" className="text-blue-500 hover:underline">
              Связаться с поддержкой
            </a> */}
          </div>
        </div>
      </PageWrapper>
    </TransitionWrapper>
  )
}
