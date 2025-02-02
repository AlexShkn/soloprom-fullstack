'use client'
import React, { useRef } from 'react'

import { useScrollHeader } from '@/hooks/useScrollHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClickOutside } from '@/hooks/useClickOutside'

import MobileNav from '../MobileNav/MobileNav'
import CatalogMenu from '../CatalogMenu/CatalogMenu'

import './HeaderBottom.scss'
import HeaderSearch from '../HeaderSearch'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'
import { useHeaderStore } from '@/store/headerStore'
import { useModalsStore } from '@/store/modalsStore'

const HeaderBottom = () => {
  const { catalogMenuStateChange, catalogIsOpen } = useCatalogMenuStore(
    (state) => state,
  )
  const { shareModal, callbackIsOpen } = useModalsStore((state) => state)
  const headerFixed = useHeaderStore((state) => state.headerFixed)

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
      className={`header-bottom relative ${headerFixed && 'header_fixed'} ${(callbackIsOpen || shareModal.isOpen) && 'compensate'}`}
    >
      <div ref={headerRef} className={`header-bottom__wrapper relative`}>
        <div
          className={`header-bottom__panel grid items-center justify-between gap-5 ${catalogIsOpen && 'fixed-panel'}`}
        >
          <div className="header-bottom__left flex items-center gap-7">
            <div className="relative">
              <button
                onClick={menuStatusChange}
                type="button"
                className={`button header-bottom__catalog-button rounded px-8 py-4 text-lg font-bold ${
                  catalogIsOpen && 'open'
                }`}
              >
                <img
                  className="mr-3 hidden h-5 w-5"
                  src="/img/icons/xmark.svg"
                  alt=""
                />
                <img
                  className="mr-3 h-5 w-5"
                  src="/img/icons/catalog.svg"
                  alt=""
                />
                <span>Каталог</span>
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
