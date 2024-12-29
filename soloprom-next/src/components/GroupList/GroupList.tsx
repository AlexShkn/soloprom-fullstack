'use client'
import React from 'react'

import './GroupList.scss'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { FilterList } from './FilterList/FilterList'

interface Props {
  categoryName: string
}

export const GroupList: React.FC<Props> = ({ categoryName }) => {
  return (
    <section data-group="acb@all" className="group-list section-offset">
      <div className="group-list__container">
        <div className="group-list__body">
          <FilterPanel categoryName={categoryName} />
          <FilterList />
        </div>
      </div>
    </section>
  )
}
