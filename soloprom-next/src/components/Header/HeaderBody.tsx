'use client'
import React from 'react'

import HeaderBottom from './HeaderBottom/HeaderBottom'
import { HeaderLogoBlock } from './HeaderLogoBlock'

const HeaderBody = () => {
  return (
    <div className="header-body relative flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-6">
      <HeaderLogoBlock />
      <HeaderBottom />
    </div>
  )
}

export default HeaderBody
