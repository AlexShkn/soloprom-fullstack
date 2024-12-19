'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useCloseOnScroll } from '@/hooks/useCloseOnScroll'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import './CatalogMenu.scss'
import CloseButton from '@/components/shared/CloseButton'
import { catalogMenuStateChange } from '@/redux/slices/catalogMenu'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

import TabCategory from './TabCategory'

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
  { id: 'acb', alt: 'купить тяговый акб', title: 'Аккумуляторы' },
  { id: 'tires', alt: 'шина для погрузчика', title: 'Шины' },
  { id: 'oils', alt: 'моторные масла', title: 'Масла и антифризы' },
]

const productsList: Record<string, CategoryProduct[]> = {
  acb: [
    { href: '/catalog/battery"', title: 'Аккумуляторы' },
    {
      href: '/catalog/battery/accumulyatori-tyagovie',
      title: 'Тяговые аккумуляторы',
    },
    {
      href: '/catalog/battery/accumulyatori-polutyagovie',
      title: 'Полутяговые аккумуляторы',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-pogruzchikov',
      title: 'Аккумуляторы для погрузчиков',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-electrotelezhek',
      title: 'Аккумуляторы для электротележек',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-polomoechnih-mashin',
      title: 'Аккумуляторы для поломоечных машин',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-shtabelerov',
      title: 'Аккумуляторы для штабелеров',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-richtrakov',
      title: 'Аккумуляторы для ричтраков',
    },
    {
      href: '/catalog/battery/accumulyatori-dlya-polletoperevozchikov',
      title: 'Аккумуляторы для паллетоперевозчика',
    },
  ],
  tires: [
    { href: '/catalog/tires', title: 'Шины для спецтехники' },
    {
      href: '/catalog/tires/shini-celnolitie',
      title: 'Шины цельнолитые (суперэластик)',
    },
    {
      href: '/catalog/tires/shini-pnevmatichesckie',
      title: 'Шины пневматические',
    },
    { href: '/catalog/tires/shini-legkovie', title: 'Шины легковые' },
    { href: '/catalog/tires/shini-bandazhnie', title: 'Бандажные шины' },
    {
      href: '/catalog/tires/shini-dlya-vilochnih-pogruzchikov',
      title: 'Шины для вилочных погрузчиков',
    },
    {
      href: '/catalog/tires/shini-dlya-minipogruzchikov',
      title: 'Шины для минипогрузчиков',
    },
    {
      href: '/catalog/tires/shini-dlya-ekskavator-pogruzchikov',
      title: 'Шины для экскаватор - погрузчиков',
    },
    {
      href: '/catalog/tires/shini-dlya-frontalnih-pogruzchikov',
      title: 'Шины для фронтальных погрузчиков',
    },
    {
      href: '/catalog/tires/shini-dlya-greiderov',
      title: 'Шины для грейдеров',
    },
    {
      href: '/catalog/tires/shini-dlya-selhoztehniki',
      title: 'Шины для сельхозтехники',
    },
    {
      href: '/catalog/tires/shini-dlya-kolesnih-ekskavatorov',
      title: 'Шина для колесных экскаваторов',
    },
    {
      href: '/catalog/tires/shini-dlya-sochlenennih-samosvalov',
      title: 'Шины для сочлененных самосвалов',
    },
    {
      href: '/catalog/tires/shini-dlya-teleskopicheskih-pogruzchikov',
      title: 'Шины для телескопических погрузчиков',
    },
    {
      href: '/catalog/tires/shini-dlya-portov-i-terminalov',
      title: 'Шины для портов и терминалов',
    },
    {
      href: '/catalog/tires/shini-dlya-asfaltoukladchikov-i-katkov',
      title: 'Шины для асфальтоукладчиков и катков',
    },
    {
      href: '/catalog/tires/shini-dlya-zhestkoramnih-samosvalov',
      title: 'Шины для жесткорамных самосвалов',
    },
  ],
  oils: [
    { href: '/catalog/oils', title: 'Масла' },
    { href: '/catalog/oils/masla-motornie', title: 'Моторные масла' },
    {
      href: '/catalog/oils/masla-transmissionnie',
      title: 'Масла трансмиссионные',
    },
    {
      href: '/catalog/oils/masla-gidravlichecskie',
      title: 'Масла гидравлические',
    },
    {
      href: '/catalog/oils/masla-industrialnie',
      title: 'Масла индустриальные',
    },
    { href: '/catalog/oils/antifreezi', title: 'Охлаждающие жидкости' },
  ],
}

const CatalogMenu = () => {
  const [currentTab, setCurrentTab] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const catalogIsOpen = useSelector(
    (state: RootState) => state.catalogMenu.catalogIsOpen,
  )

  const isTablet = useMediaQuery('(max-width: 991.98px)')
  const is650 = useMediaQuery('(max-width: 650px)')

  useEffect(() => {
    if (!is650) setCurrentTab('acb')
  }, [is650, setCurrentTab])

  // useCloseOnScroll({
  // 	targetRef: menuRef,
  // 	onClose: () => {
  // 		dispatch(catalogMenuStateChange(false))
  // 	},
  // })

  const menuClose = () => {
    dispatch(catalogMenuStateChange({ status: false, screen: isTablet }))
  }

  return (
    <div
      ref={menuRef}
      className="catalog-menu scroll-bar absolute left-0 top-[85px] z-20 h-auto min-h-[65vh] w-full rounded bg-white shadow-custom"
    >
      <div className="h-full min-h-[65vh] tb:min-h-[100vh]">
        <CloseButton
          onClick={menuClose}
          classNames="catalog-menu__close"
          iconClass="icon-close"
        />

        <div className="catalog-menu__body relative grid min-h-[65vh] justify-between gap-2.5">
          <div className="catalog-menu__category-list border-1 border-grayColor h-full border px-7 pb-7 pt-10">
            <Link
              onClick={() =>
                dispatch(
                  catalogMenuStateChange({ status: false, screen: false }),
                )
              }
              href="/catalog"
              className="catalog-menu__link flex items-center justify-between gap-2.5 rounded bg-accentBlue px-2.5 py-5 font-medium"
            >
              <span className="flex items-center gap-2.5 text-white">
                <img
                  src="/img/icons/catalog-link.svg"
                  alt=""
                  className="h-6 w-6"
                />
                Весь каталог
              </span>
              <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </Link>

            {categoryList.map((category) => (
              <div
                key={category.id}
                onClick={() =>
                  setCurrentTab(currentTab !== category.id ? category.id : '')
                }
                className={`catalog-menu__category-item rounded-tr-4 rounded-br-4 flex cursor-pointer items-center gap-2.5 bg-white pl-2.5 font-medium ${
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
                <div className="catalog-menu__category-item-button rounded-tr-4 rounded-br-4 relative z-[1] inline-flex h-full items-center justify-center bg-accentBlue px-2.5 py-6">
                  <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
                    <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="catalog-menu__category-content h-full pb-7 pl-0 pr-7 pt-10">
            {categoryList.map((category) => (
              <TabCategory
                key={category.id}
                currentTab={currentTab}
                categoryId={category.id}
                categoryItems={productsList[category.id] || []}
              />
            ))}
          </div>

          <div className="catalog-menu__bottom hidden">
            <div className="mb-7 text-center text-lg font-bold">
              Напишите нам
            </div>
            <ul className="catalog-menu__bottom-list mb-5 grid grid-cols-4 gap-2.5 py-5">
              <li className="catalog-menu__bottom-item">
                <button
                  data-btn-callback
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pt-5 shadow-custom"
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
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pt-5 shadow-custom"
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
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pt-5 shadow-custom"
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
                  className="flex h-full w-full flex-col items-center justify-center rounded bg-white px-2.5 pt-5 shadow-custom"
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
