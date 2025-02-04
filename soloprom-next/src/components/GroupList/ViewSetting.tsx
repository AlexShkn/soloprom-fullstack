'use client'

import React from 'react'

interface Props {
  viewMode: string
  setViewMode: (mod: string) => void
}

export const ViewSetting: React.FC<Props> = ({ viewMode, setViewMode }) => {
  return (
    <div className="hidden items-center gap-1 md:flex">
      <button
        type="button"
        className={`h-6 w-6 ${viewMode === 'grid' ? 'text-accentBlue' : 'text-darkBlue'} hover:text-accentBlue`}
        onClick={() => setViewMode('grid')}
      >
        <svg className="icon h-6 w-6 fill-current transition-colors">
          <use href="/img/sprite.svg#grid" />
        </svg>
      </button>
      <button
        type="button"
        className={`h-6 w-6 ${viewMode === 'row' ? 'text-accentBlue' : 'text-darkBlue'} hover:text-accentBlue`}
        onClick={() => setViewMode('row')}
      >
        <svg className="icon h-6 w-6 fill-current transition-colors">
          <use href="/img/sprite.svg#row" />
        </svg>
      </button>
    </div>
  )
}
