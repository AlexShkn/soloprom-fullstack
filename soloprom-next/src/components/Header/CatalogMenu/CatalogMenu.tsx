'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import './CatalogMenu.scss'
import CloseButton from '@/components/ui/CloseButton'

import TabCategory from './TabCategory'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'

export interface CategoryTab {
  id: string
  alt: string
  title: string
}

export interface CategoryProduct {
  href: string
  title: string
}

const categoryList: CategoryTab[] = [
  { id: 'battery', alt: 'купить тяговый акб', title: 'Аккумуляторы' },
  { id: 'tires', alt: 'шина для погрузчика', title: 'Шины' },
  { id: 'oils', alt: 'моторные масла', title: 'Масла и антифризы' },
]

const productsList: Record<string, CategoryProduct[]> = {
  battery: [
    { href: '/catalog/battery', title: 'Аккумуляторы' },
    {
      href: '/catalog/accumulyatori-tyagovie',
      title: 'Тяговые аккумуляторы',
    },
    {
      href: '/catalog/accumulyatori-polutyagovie',
      title: 'Полутяговые аккумуляторы',
    },
    {
      href: '/catalog/accumulyatori-dlya-pogruzchikov',
      title: 'Аккумуляторы для погрузчиков',
    },
    {
      href: '/catalog/accumulyatori-dlya-electrotelezhek',
      title: 'Аккумуляторы для электротележек',
    },
    {
      href: '/catalog/accumulyatori-dlya-polomoechnih-mashin',
      title: 'Аккумуляторы для поломоечных машин',
    },
    {
      href: '/catalog/accumulyatori-dlya-shtabelerov',
      title: 'Аккумуляторы для штабелеров',
    },
    {
      href: '/catalog/accumulyatori-dlya-richtrakov',
      title: 'Аккумуляторы для ричтраков',
    },
    {
      href: '/catalog/accumulyatori-dlya-polletoperevozchikov',
      title: 'Аккумуляторы для паллетоперевозчика',
    },
  ],
  tires: [
    { href: '/catalog/tires', title: 'Шины для спецтехники' },
    {
      href: '/catalog/shini-celnolitie',
      title: 'Шины цельнолитые (суперэластик)',
    },
    {
      href: '/catalog/shini-pnevmatichesckie',
      title: 'Шины пневматические',
    },
    { href: '/catalog/shini-legkovie', title: 'Шины легковые' },
    { href: '/catalog/shini-bandazhnie', title: 'Бандажные шины' },
    {
      href: '/catalog/shini-dlya-vilochnih-pogruzchikov',
      title: 'Шины для вилочных погрузчиков',
    },
    {
      href: '/catalog/shini-dlya-minipogruzchikov',
      title: 'Шины для минипогрузчиков',
    },
    {
      href: '/catalog/shini-dlya-ekskavator-pogruzchikov',
      title: 'Шины для экскаватор - погрузчиков',
    },
    {
      href: '/catalog/shini-dlya-frontalnih-pogruzchikov',
      title: 'Шины для фронтальных погрузчиков',
    },
    {
      href: '/catalog/shini-dlya-greiderov',
      title: 'Шины для грейдеров',
    },
    {
      href: '/catalog/shini-dlya-selhoztehniki',
      title: 'Шины для сельхозтехники',
    },
    {
      href: '/catalog/shini-dlya-kolesnih-ekskavatorov',
      title: 'Шина для колесных экскаваторов',
    },
    {
      href: '/catalog/shini-dlya-sochlenennih-samosvalov',
      title: 'Шины для сочлененных самосвалов',
    },
    {
      href: '/catalog/shini-dlya-teleskopicheskih-pogruzchikov',
      title: 'Шины для телескопических погрузчиков',
    },
    {
      href: '/catalog/shini-dlya-portov-i-terminalov',
      title: 'Шины для портов и терминалов',
    },
    {
      href: '/catalog/shini-dlya-asfaltoukladchikov-i-katkov',
      title: 'Шины для асфальтоукладчиков и катков',
    },
    {
      href: '/catalog/shini-dlya-zhestkoramnih-samosvalov',
      title: 'Шины для жесткорамных самосвалов',
    },
  ],
  oils: [
    { href: '/catalog/oils', title: 'Масла' },
    { href: '/catalog/masla-motornie', title: 'Моторные масла' },
    {
      href: '/catalog/masla-transmissionnie',
      title: 'Масла трансмиссионные',
    },
    {
      href: '/catalog/masla-gidravlichecskie',
      title: 'Масла гидравлические',
    },
    {
      href: '/catalog/masla-industrialnie',
      title: 'Масла индустриальные',
    },
    { href: '/catalog/antifreezi', title: 'Охлаждающие жидкости' },
  ],
}

const CatalogMenu = () => {
  const [currentTab, setCurrentTab] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const { catalogMenuStateChange } = useCatalogMenuStore()

  const isTablet = useMediaQuery('(max-width: 991.98px)')
  const is650 = useMediaQuery('(max-width: 650px)')

  useEffect(() => {
    if (!is650) setCurrentTab('battery')
  }, [is650, setCurrentTab])

  const setCatalogTab = (tabName: string) => {
    if (is650) {
      if (currentTab === tabName) {
        setCurrentTab('')
      } else {
        setCurrentTab(tabName)
      }
    } else {
      setCurrentTab(tabName)
    }
  }

  const menuClose = () => {
    catalogMenuStateChange(false, isTablet)
  }

  return (
    <div
      ref={menuRef}
      className="catalog-menu scroll-bar fixed left-0 top-0 z-20 h-full min-h-[65vh] w-full overscroll-contain rounded bg-white shadow-[0_4px_30px_0_rgba(0,0,0,0.1)] lg:absolute lg:top-[85px] lg:h-auto"
    >
      <div className="tb:min-h-[100vh] h-full min-h-[65vh]">
        <CloseButton
          onClick={menuClose}
          classNames="hidden sm:block catalog-menu__close absolute top-[5px] right-[5px] -margin-1 z-10"
          iconClass="w-7 h-7 fill-darkBlue cursor-pointer"
        />

        <div className="catalog-menu__body relative grid h-full min-h-screen grid-cols-1 justify-between gap-2.5 overflow-y-auto sm:grid-cols-2 md:grid-cols-[40%,calc(60%-20px)] lg:grid-cols-[30%,calc(70%-20px)] 2xl:min-h-[65vh] 2xl:grid-cols-[25%,calc(75%-20px)]">
          <div className="border-1 flex h-full flex-col items-start gap-2.5 border border-grayColor bg-[#dfefff] px-5 pb-5 pt-20 lg:bg-none lg:pb-7 lg:pt-10 xl:px-7 xl:pb-7 xl:pt-10">
            <Link
              onClick={() => catalogMenuStateChange(false, false)}
              href="/catalog"
              className="rounded-custom flex max-w-48 items-center justify-between gap-2.5 bg-accentBlue px-2.5 py-4 text-sm font-medium sm:mb-2.5 sm:max-w-max md:text-base"
            >
              <span className="flex items-center gap-2.5 text-white">
                <img
                  src="/img/icons/catalog-link.svg"
                  alt=""
                  className="h-5 w-5 mds:h-6 mds:w-6"
                />
                Весь каталог
              </span>
              <svg className="icon h-4 w-4 rotate-[-90deg] fill-white mds:h-5 mds:w-5">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </Link>

            {categoryList.map((category) => (
              <div
                key={category.id}
                onClick={() => setCatalogTab(category.id)}
                className={`catalog-menu__category-item rounded-tr-4 rounded-br-4 flex w-full cursor-pointer items-center gap-2.5 bg-white pl-2.5 font-medium ${
                  currentTab === category.id
                    ? 'active'
                    : `${is650 && currentTab && 'hidden-block'}`
                }`}
              >
                <img
                  className="inline-block h-[70px] w-[70px] object-cover"
                  src={`/img/catalog-link/${category.id}.png`}
                  alt={category.alt}
                />
                <span className="flex-auto">{category.title}</span>
                <div className="catalog-menu__category-item-button rounded-tr-4 rounded-br-4 relative z-[1] inline-flex h-full items-center justify-center bg-accentBlue px-2.5 py-5 sm:px-2.5 sm:py-6">
                  <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
                    <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="h-full sm:pb-7 sm:pl-0 sm:pr-7 sm:pt-10">
            {categoryList.map((category) => (
              <TabCategory
                key={category.id}
                currentTab={currentTab}
                categoryId={category.id}
                categoryItems={productsList[category.id] || []}
              />
            ))}
          </div>

          <div className="px-5 py-7 sm:hidden">
            <div className="mb-7 text-center text-lg font-bold">
              Напишите нам
            </div>
            <ul className="mb-5 grid grid-cols-2 gap-2.5 border-b border-t border-[#cdcfd8] py-10 mds:grid-cols-4 sm:py-5">
              <li className="catalog-menu__bottom-item">
                <button
                  data-btn-callback
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pb-5 pt-5 shadow-custom"
                >
                  <svg className="icon mb-2.5 h-7 w-7 fill-black">
                    <use xlinkHref="/img/sprite.svg#callback"></use>
                  </svg>
                  <span className="text-sm font-medium text-black">
                    Обратный звонок
                  </span>
                </button>
              </li>
              <li className="catalog-menu__bottom-item">
                <a
                  href="https://wa.me/79036569393"
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pb-5 pt-5 shadow-custom"
                >
                  <svg className="icon mb-2.5 h-7 w-7 fill-black">
                    <use xlinkHref="/img/sprite.svg#footer-wp"></use>
                  </svg>
                  <span className="text-sm font-medium text-black">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li className="catalog-menu__bottom-item">
                <a
                  href="https://t.me/+79036569393"
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pb-5 pt-5 shadow-custom"
                >
                  <svg className="icon mb-2.5 h-7 w-7 fill-black">
                    <use xlinkHref="/img/sprite.svg#footer-tg"></use>
                  </svg>
                  <span className="text-sm font-medium text-black">
                    Телеграм
                  </span>
                </a>
              </li>
              <li className="catalog-menu__bottom-item">
                <a
                  href="mailto:solo.vrn@mail.ru"
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pb-5 pt-5 shadow-custom"
                >
                  <svg className="icon mb-2.5 h-7 w-7 fill-black">
                    <use xlinkHref="/img/sprite.svg#mail"></use>
                  </svg>
                  <span className="text-sm font-medium text-black">
                    solo.vrn@mail.ru
                  </span>
                </a>
              </li>
            </ul>
            <div className="flex justify-center">
              <a
                href="tel:+79036569393"
                className="p-[5px] text-xl font-medium"
              >
                +7 (903) 656-93-93
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogMenu
