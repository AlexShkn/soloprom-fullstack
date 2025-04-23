import React from 'react'
import {
  Truck,
  ShieldCheck,
  Search,
  Phone,
  Mail,
  Clock,
  CheckCircle,
} from 'lucide-react' // Временные иконки
import { cn } from '@/lib/utils'
import { Button } from '../ui'
import { useModalsStore } from '@/store/useModalsStore'

export const PageBenefits = () => {
  const { modalCallbackStateChange } = useModalsStore()
  const advantages = [
    {
      title: 'Увеличенный срок службы',
      description:
        'Спецшины разработаны для интенсивной эксплуатации и способны выдерживать высокие нагрузки.',
      icon: Clock,
    },
    {
      title: 'Повышенная безопасность',
      description:
        'Обеспечивают стабильное сцепление с поверхностью, снижая риск аварий.',
      icon: ShieldCheck,
    },
    {
      title: 'Улучшенная проходимость',
      description:
        'Спецшины для экскаваторов и другой спецтехники способны работать в сложных условиях, преодолевая препятствия.',
      icon: Truck,
    },
    {
      title: 'Энергоэффективность',
      description: 'Сокращение сопротивления качению снижает расход топлива.',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="bg-gray-100 py-12">
      <div className="page-container">
        {/* Заголовок */}
        <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          Шины и камеры для спецтехники: надежность и производительность
        </h1>

        {/* Вводный абзац */}
        <p className="mb-8 text-center text-gray-600">
          Надежные шины – залог бесперебойной работы вашей спецтехники.
          Подберите идеальные шины и камеры для вилочных погрузчиков,
          экскаваторов и другой специализированной техники в нашем магазине. Мы
          предлагаем широкий ассортимент, гарантирующий максимальную отдачу и
          долговечность.
        </p>

        {/* Описание спецшин */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <p className="mb-4 text-gray-700">
            Спецшины – это не просто резина, это инвестиция в безопасность и
            долговечность вашей техники. Наш ассортимент включает шины для
            вилочных погрузчиков различных моделей и камеры для экскаваторов и
            строительной техники. Мы используем только высококачественные
            материалы и применяем строгий контроль качества на всех этапах
            производства, чтобы гарантировать превосходную производительность и
            надежность.
          </p>
        </div>

        {/* Преимущества спецшин (Карточки) */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            Преимущества наших спецшин:
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {advantages.map((advantage, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center">
                  <advantage.icon className="mr-2 h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            Быстрый поиск нужной шины!
          </h2>
          <p className="mb-4 text-gray-700">
            Найдите идеальные шины для вашего вилочного погрузчика или
            экскаватора всего в несколько кликов! Просто укажите модель техники,
            размер и тип шины, и мы поможем вам с выбором.
          </p>
          <div className="flex items-center justify-center">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Введите модель техники или размер шины..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/2"
            />
          </div>
        </div> */}

        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            Закажите прямо сейчас и обеспечьте надежную работу техники!
          </h2>
          <p className="mb-4 text-gray-700">
            Не ждите, пока износ шин приведет к простоям! Закажите новые шины
            для спецтехники сегодня и забудьте о проблемах.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="tel:+79036569393" className="button px-4 py-2 font-bold">
              <Phone className="mr-1 inline-block h-4 w-4" />
              Позвонить
            </a>

            <Button
              onClick={() => modalCallbackStateChange(true)}
              className="button w-auto bg-greenColor px-4 py-2 font-bold hover:bg-green-700"
            >
              <Mail className="mr-1 inline-block h-4 w-4" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
