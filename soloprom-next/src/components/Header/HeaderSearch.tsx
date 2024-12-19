import React from 'react'

import CloseButton from '@/components/shared/CloseButton'

const HeaderSearch = () => {
  return (
    <div className="header-bottom__catalog-field relative flex max-w-[600px] flex-auto items-center">
      <div className="relative h-full w-full">
        <input
          type="text"
          name="search-product"
          id="search-product-input"
          placeholder="Поиск по наименованию и размеру"
          className="rounded-tl-4 rounded-bl-4 h-full w-full bg-[#f4f5fa] px-8 py-4 placeholder:text-sm placeholder:text-[#c2c5da]"
        />
        <ul className="absolute right-2.5 top-[50%] flex translate-y-[-50%] gap-1">
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            АКБ
          </li>
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            Шины
          </li>
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            Опоры
          </li>
        </ul>
      </div>
      <button
        type="button"
        id="search-product-btn"
        className="button rounded-tr-4 rounded-br-4 px-8 py-4"
      >
        <span>Найти</span>
        <svg className="icon hidden h-5 w-5 fill-white">
          <use xlinkHref="/img/sprite.svg#search"></use>
        </svg>
      </button>

      <div className="header-bottom__catalog-search-wrapper absolute left-0 hidden w-full overflow-hidden">
        <CloseButton
          classNames="header-bottom__catalog-search-close window-close-btn"
          iconClass="icon-close"
        />
        <ul className="header-bottom__catalog-search-list scroll-bar flex h-full max-h-[50vh] min-h-[150px] w-full flex-col overflow-y-auto overflow-x-hidden rounded bg-white shadow-custom"></ul>
      </div>
    </div>
  )
}

export default HeaderSearch
