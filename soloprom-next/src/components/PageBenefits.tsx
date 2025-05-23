import React from 'react'
import { Phone, Mail } from 'lucide-react'
import { Button } from './ui'
import { useModalsStore } from '@/store/useModalsStore'
import { PageDataTypes } from '@/types/products.types'
import { ProductsCategory } from '@/supports/adaptiveDto'
import { advantages, AdvantageTypes } from '../data/PageBenefitsData'

interface Props {
  pageData: PageDataTypes
}

type CategoryType = ProductsCategory

export const PageBenefits: React.FC<Props> = ({ pageData }) => {
  const { modalCallbackStateChange } = useModalsStore()

  const { h1, firstText, secondText, bottomText } = pageData.benefits

  const data: AdvantageTypes = advantages[pageData.category as CategoryType]

  return (
    <div className="bg-gray-100 py-12">
      <div className="page-container">
        <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          {h1}
        </h1>
        <p className="mb-8 text-center text-gray-600">{firstText}</p>
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <p className="mb-4 font-medium text-gray-700">{secondText}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr,400px]">
          <div className="w-full rounded-lg bg-white p-4 shadow-md">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.list.map((advantage, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-accentBlue p-4"
                >
                  <div className="mb-2 flex items-center">
                    <advantage.icon className="mr-2 h-6 w-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">
                      {advantage.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col justify-center rounded-lg bg-white p-6 text-center shadow-md lg:max-w-xl">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              Закажите прямо сейчас и обеспечьте надежную работу техники!
            </h2>
            <p className="mb-4 text-gray-700">{bottomText}</p>
            <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
              <a
                href="tel:+79036569393"
                className="button flex w-full items-center gap-2 px-4 py-2 font-bold mds:w-auto"
              >
                <Phone className="inline-block h-4 w-4" />
                Позвонить
              </a>

              <Button
                onClick={() => modalCallbackStateChange(true)}
                className="button ml-0 w-full bg-greenColor px-4 py-2 font-bold hover:bg-green-700 mds:w-auto"
              >
                <Mail className="mr-1 inline-block h-4 w-4" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
