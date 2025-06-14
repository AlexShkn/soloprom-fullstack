'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import CloseButton from '@/components/ui/CloseButton'

import TabCategory from './TabCategory'
import { useCatalogMenuStore } from '@/store/useCatalogMenuStore'

import productListData from '../../../data/catalogMenu.json'

export interface CategoryTab {
  id: string
  alt: string
  title: string
}

export interface CategoryProduct {
  href: string
  title: string
}

interface ProductsList {
  [key: string]: CategoryProduct[]
}

interface Props {
  headerFixed: boolean
}

const productsList: ProductsList = productListData

const categoryList: CategoryTab[] = [
  { id: 'battery', alt: 'купить тяговый акб', title: 'Аккумуляторы' },
  { id: 'tires', alt: 'шина для погрузчика', title: 'Шины' },
  { id: 'oils', alt: 'моторные масла', title: 'Масла и антифризы' },
]

const CatalogMenu: React.FC<Props> = ({ headerFixed }) => {
  const [currentTab, setCurrentTab] = useState('')
  const { catalogMenuStateChange, catalogIsOpen } = useCatalogMenuStore()

  const menuRef = useRef<HTMLDivElement>(null)

  const isTablet = useMediaQuery('(max-width: 991.98px)')
  const is650 = useMediaQuery('(max-width: 650px)')

  useEffect(() => {
    if (!is650) setCurrentTab('battery')
    if (is650) setCurrentTab('')
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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categoryList.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.title,
      item: `/catalog#${category.id}`,
    })),
  }

  return (
    <div
      ref={menuRef}
      className={`catalog-menu scroll-bar ${catalogIsOpen ? 'menu-show visible' : 'invisible opacity-0'} fixed left-0 top-0 z-20 h-full min-h-[65vh] w-full max-w-[1390px] overscroll-contain rounded bg-white shadow-[0_4px_30px_0_rgba(0,0,0,0.1)] transition-all lg:absolute lg:top-[85px] lg:h-auto`}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>
      <div className="tb:min-h-[100vh] h-full min-h-[65vh]">
        <CloseButton
          onClick={menuClose}
          classNames="hidden sm:block catalog-menu__close absolute top-[5px] right-[5px] -margin-1 z-10"
          iconClass="w-7 h-7 fill-darkBlue cursor-pointer"
        />
        <nav className="catalog-menu__body relative grid h-full min-h-screen grid-cols-1 justify-between gap-2.5 overflow-y-auto sm:grid-cols-2 md:grid-cols-[40%,calc(60%-20px)] lg:grid-cols-[30%,calc(70%-20px)] 2xl:min-h-[65vh] 2xl:grid-cols-[25%,calc(75%-20px)]">
          <div className="border-1 flex h-full flex-col items-start gap-2.5 border border-grayColor bg-[#dfefff] px-5 pb-5 pt-20 lg:bg-none lg:pb-7 lg:pt-10 xl:px-7 xl:pb-7 xl:pt-10">
            <Link
              onClick={() => catalogMenuStateChange(false, isTablet)}
              href="/catalog"
              className="flex max-w-48 items-center justify-between gap-2.5 rounded-custom bg-accentBlue px-2.5 py-2.5 text-sm font-medium sm:mb-2.5 sm:max-w-max md:text-base"
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
                <use xlinkHref="/img/sprite.svg#arrow-drop"></use>
              </svg>
            </Link>

            {categoryList.map((category) => (
              <div
                key={category.id}
                onClick={() => setCatalogTab(category.id)}
                className={`flex w-full cursor-pointer rounded-bl-custom rounded-br-sm rounded-tl-custom rounded-tr-sm bg-white ${
                  currentTab === category.id
                    ? 'active'
                    : `${is650 && currentTab && 'hidden'}`
                }`}
              >
                <div
                  className={`flex flex-1 items-center gap-2.5 rounded-bl-custom rounded-tl-custom pl-2.5 pr-2.5 font-medium ${
                    currentTab === category.id &&
                    'bg-white shadow-custom outline outline-1 outline-hoverBlue'
                  }`}
                >
                  <Image
                    className="inline-block h-6 w-6 object-cover mds:h-9 mds:w-9 sm:h-12 sm:w-12"
                    src={`/img/catalog-link/${category.id}.webp`}
                    alt={category.alt}
                    width={48}
                    height={48}
                  />
                  <span className="flex-auto">{category.title}</span>
                </div>

                <div
                  className={`${currentTab === category.id && 'bg-hoverBlue'} relative z-[1] inline-flex h-full items-center justify-center rounded-br-sm rounded-tr-sm bg-accentBlue px-2.5 py-5 outline outline-1 outline-hoverBlue sm:px-2.5 sm:py-6`}
                >
                  <svg
                    className={`icon h-5 w-5 fill-white ${currentTab === category.id ? 'rotate-[90deg] sm:rotate-[-90deg]' : 'rotate-[-90deg]'}`}
                  >
                    <use xlinkHref="/img/sprite.svg#arrow-drop"></use>
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

          <div className="px-5 py-7 pb-20 sm:hidden">
            <div className="mb-7 text-center text-lg font-bold">
              Напишите нам
            </div>
            <ul className="mb-5 grid grid-cols-2 gap-2.5 border-b border-t border-[#cdcfd8] py-10 mds:grid-cols-4 sm:py-5">
              <li className="catalog-menu__bottom-item">
                <button
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
        </nav>
      </div>
    </div>
  )
}

export default CatalogMenu
