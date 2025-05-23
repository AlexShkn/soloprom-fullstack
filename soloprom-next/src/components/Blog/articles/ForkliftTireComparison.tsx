'use client'
import React from 'react'

interface Props {
  className?: string
}

import Image from 'next/image'

const ForkliftTireComparison = () => {
  return (
    <div className="page-container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Выбор шин для вилочных погрузчиков: сравнительный обзор трех видов
      </h1>

      <p className="mb-4">
        Шины играют ключевую роль в обеспечении надежности и эффективности
        работы вилочных погрузчиков. Существует три основных типа шин, каждый из
        которых имеет свои особенности и подходит для определенных условий
        эксплуатации. Рассмотрим подробнее каждый вид шин.
      </p>

      {/* Пневматические шины */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Пневматические шины</h2>
        <div className="mb-4 flex items-center">
          <Image
            src="/images/pneumatic_tire.jpg" // Замените на фактический путь к изображению
            alt="Пневматическая шина для вилочного погрузчика"
            width={200}
            height={150}
            className="mr-4 rounded"
          />
          <p>
            Пневматические шины наполнены воздухом и обеспечивают хорошую
            амортизацию и сцепление с поверхностью. Их конструкция делает работу
            на мягких грунтах, песке и гравии комфортной и безопасной.
          </p>
        </div>

        <h3 className="mb-2 text-lg font-medium">Преимущества:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Обеспечивают высокую степень амортизации, снижают вибрации и удары.
          </li>
          <li>
            Хорошо подходят для работы вне помещений, на участках с неровными
            поверхностями.
          </li>
          <li>
            Оптимальны для длительных перемещений по значительным расстояниям.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Недостатки:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Риск прокола и выхода из строя вследствие механического воздействия
            острыми предметами.
          </li>
          <li>
            Требуют регулярного контроля давления воздуха и технического
            обслуживания.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Использование:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Стройплощадки, сельскохозяйственные поля, карьерах, песчаных зонах.
          </li>
          <li>
            Транспортировка грузов по бездорожью или труднопроходимым участкам.
          </li>
        </ul>
      </section>

      {/* Цельнолитые шины */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Цельнолитые шины</h2>
        <div className="mb-4 flex items-center">
          <Image
            src="/images/solid_tire.jpg" // Замените на фактический путь к изображению
            alt="Цельнолитая шина для вилочного погрузчика"
            width={200}
            height={150}
            className="mr-4 rounded"
          />
          <p>
            Цельнолитые шины представляют собой монолитные изделия из плотной
            резины, иногда усиленной металлом или армирующими элементами. Эти
            шины идеально подходят для стабильных рабочих условий, гарантируют
            высокий уровень износостойкости и долговечности.
          </p>
        </div>

        <h3 className="mb-2 text-lg font-medium">Преимущества:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>Исключают возможность проколов и разрывов.</li>
          <li>
            Надежны и устойчивы к агрессивному воздействию окружающей среды.
          </li>
          <li>Длительный срок службы, особенно при интенсивных нагрузках.</li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Недостатки:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Отсутствует амортизирующая способность, создают дополнительную
            нагрузку на подвеску и водителя.
          </li>
          <li>
            Издают больше шума и передают значительные вибрации оператору
            машины.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Использование:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Складские комплексы, промышленные предприятия, фармацевтическая
            отрасль.
          </li>
          <li>Перемещение тяжелых грузов на небольшие расстояния.</li>
          <li>Эксплуатация на ровных полах и гладких покрытиях.</li>
        </ul>
      </section>

      {/* Банджаные шины */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Банджаные шины</h2>
        <div className="mb-4 flex items-center">
          <Image
            src="/images/band_tire.jpg" // Замените на фактический путь к изображению
            alt="Банджаная шина для вилочного погрузчика"
            width={200}
            height={150}
            className="mr-4 rounded"
          />
          <p>
            Этот тип шин представляет собой комбинированное решение, объединяя
            свойства двух предыдущих вариантов. Внешняя оболочка бандажа
            изготавливается из мягкой резины, защищающей внутренний
            металлический сердечник (кольцо), выполняющий несущую функцию. Такие
            шины отличаются прочностью и универсальностью.
          </p>
        </div>

        <h3 className="mb-2 text-lg font-medium">Преимущества:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>Устойчивы к механическим повреждениям и проколам.</li>
          <li>Сохраняют хорошее сцепление с различными видами поверхностей.</li>
          <li>
            Благодаря своей жесткости хорошо выдерживают большие нагрузки.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Недостатки:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Меньшая эластичность и высокая жесткость приводят к повышенной
            усталости водителей.
          </li>
          <li>
            Необходимо внимательно следить за состоянием посадочной поверхности
            диска.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-medium">Использование:</h3>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Автоматизированные производства, где важна точность перемещения и
            контроль над транспортным средством.
          </li>
          <li>
            Использование на объектах с высокими требованиями к гигиене и
            чистоте.
          </li>
          <li>
            Применяются там, где важен долгий срок службы и минимизация рисков
            поломок.
          </li>
        </ul>
      </section>

      {/* Таблица сравнения характеристик */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Таблица сравнения характеристик
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Характеристики</th>
              <th className="px-4 py-2">Пневматические</th>
              <th className="px-4 py-2">Цельнолитые</th>
              <th className="px-4 py-2">Банджаные</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Проколы</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Проходимость</td>
              <td className="border px-4 py-2">🚗🛤</td>
              <td className="border px-4 py-2">🏃‍♂️</td>
              <td className="border px-4 py-2">🎯</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Уровень шума</td>
              <td className="border px-4 py-2">📈</td>
              <td className="border px-4 py-2">📉</td>
              <td className="border px-4 py-2">📇</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Цена</td>
              <td className="border px-4 py-2">💸</td>
              <td className="border px-4 py-2">💰</td>
              <td className="border px-4 py-2">💵</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Срок службы</td>
              <td className="border px-4 py-2">🕐</td>
              <td className="border px-4 py-2">🕑</td>
              <td className="border px-4 py-2">🕍</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Удобство управления</td>
              <td className="border px-4 py-2">🚘✨</td>
              <td className="border px-4 py-2">🚧🔥</td>
              <td className="border px-4 py-2">🚣🏼‍♀️</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Итоги */}
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Итоги</h2>
        <p className="mb-4">
          Каждый тип шин обладает своими уникальными характеристиками и
          применяется в разных ситуациях. Перед выбором шин для своего
          погрузчика обязательно учитывайте конкретные условия эксплуатации,
          виды работ и требуемый уровень защиты от внешних воздействий.
          Правильно подобранные шины значительно повысят производительность и
          надежность вашей техники.
        </p>
        <p>
          Желаем вам успешной эксплуатации и грамотного подхода к подбору
          комплектующих!
        </p>
      </section>
    </div>
  )
}

export default ForkliftTireComparison
