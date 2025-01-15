'use client'
import React from 'react'

interface Props {
  className?: string
}

export const ViewSetting: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="h-6 w-6 text-accentBlue hover:text-darkBlue"
      >
        <svg className="icon h-6 w-6 fill-current transition-colors">
          <use xlinkHref="/img/sprite.svg#grid" />
        </svg>
      </button>
      <button
        type="button"
        className="h-6 w-6 text-darkBlue hover:text-accentBlue"
      >
        <svg className="icon h-6 w-6 fill-current transition-colors">
          <use xlinkHref="/img/sprite.svg#row" />
        </svg>
      </button>
    </div>
  )
}
