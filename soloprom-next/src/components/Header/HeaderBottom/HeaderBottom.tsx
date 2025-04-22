'use client'
import React, { useEffect, useRef } from 'react'

import { useScrollHeader } from '@/hooks/useScrollHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClickOutside } from '@/hooks/useClickOutside'

import MobileNav from '../MobileNav/MobileNav'
import CatalogMenu from '../CatalogMenu/CatalogMenu'

import './HeaderBottom.scss'
import HeaderSearch from '../HeaderSearch'
import { useCatalogMenuStore } from '@/store/useCatalogMenuStore'
import { useHeaderStore } from '@/store/useHeaderStore'
import { useModalsStore } from '@/store/useModalsStore'

const HeaderBottom = () => {
  const { catalogMenuStateChange, catalogIsOpen } = useCatalogMenuStore()
  const { shareModal, callbackIsOpen } = useModalsStore()
  const { headerFixed } = useHeaderStore()

  const headerRef = useRef<HTMLDivElement>(null)

  const isBigSmall = useMediaQuery('(min-width: 479.98px)')
  const isTablet = useMediaQuery('(max-width: 991.98px)')

  useScrollHeader(isBigSmall)

  useClickOutside(headerRef, () => {
    if (catalogIsOpen) {
      catalogMenuStateChange(false, isTablet)
    }
  })

  const menuStatusChange = () => {
    catalogMenuStateChange(!catalogIsOpen, isTablet)
  }

  return (
    <div
      className={`header-bottom w-full ${headerFixed && 'header_fixed'} ${(callbackIsOpen || shareModal.isOpen) && 'compensate'}`}
    >
      <div ref={headerRef} className={`header-bottom__wrapper`}>
        <div
          className={`header-bottom__panel grid w-full grid-cols-1 items-center justify-between gap-5 md:w-auto md:grid-cols-[1fr,auto] ${headerFixed && 'page-container'} ${catalogIsOpen && 'fixed-panel'}`}
        >
          <div className="flex h-11 w-full items-center gap-1 bg-white md:w-auto md:gap-4 lg:h-auto lg:gap-7">
            <div className="relative">
              <button
                onClick={menuStatusChange}
                type="button"
                className={`button header-bottom__catalog-button min-w-11 rounded py-[12px] font-bold mds:rounded-custom lg:px-8 lg:py-3 lg:text-lg ${
                  catalogIsOpen && 'open'
                }`}
              >
                <img
                  className="hidden h-5 w-5 lg:mr-3"
                  src="/img/icons/xmark.svg"
                  alt=""
                />
                <img
                  className="h-5 w-5 lg:mr-3"
                  src="/img/icons/catalog.svg"
                  alt=""
                />
                <span className="hidden lg:block">Каталог</span>
              </button>
            </div>

            <HeaderSearch />
          </div>
          <MobileNav />
        </div>

        {catalogIsOpen && <CatalogMenu />}
      </div>
    </div>
  )
}

export default HeaderBottom
