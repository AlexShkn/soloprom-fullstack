// 'use client'
// import React from 'react'

// import { getProductsByCategory } from '@/app/api/routes/products/route'

// import './FilterPanel.scss'

// interface Props {
//   categoryName: string
// }
// export const FilterPanel: React.FC<Props> = ({ categoryName }) => {
//   return (
//     <div className="filter">
//       <div className="filter__trigger">
//         <button className="filter__trigger-button">
//           <i>
//             <img src="/img/icons/filter.svg" alt="" />
//           </i>
//           <span>Фильтр</span>
//         </button>
//       </div>
//       <div className="filter__body load">
//         <div className="filter__title">Подбор по параметрам</div>
//         <div className="filter__feature-block">
//           <div className="filter__feature-title">
//             Тип аккумулятора:
//             <svg className="icon">
//               <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
//             </svg>
//           </div>
//           <ul data-feature="type" className="filter__feature-list scroll-bar">
//             <li className="filter__feature-item">
//               <input
//                 id="type-tyagoviy"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="Тяговый"
//                 name="type"
//               />
//               <label htmlFor="type-tyagoviy">
//                 <span className="filter__feature-value">Тяговая</span>
//               </label>
//             </li>
//             <li className="filter__feature-item">
//               <input
//                 id="type-polutyagoviy"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="Полутяговая"
//                 name="type"
//               />
//               <label htmlFor="type-polutyagoviy">
//                 <span className="filter__feature-value">Полутяговая</span>
//               </label>
//             </li>
//           </ul>
//         </div>
//         <div className="filter__feature-block">
//           <div className="filter__feature-title">
//             Емкость АКБ:
//             <svg className="icon">
//               <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
//             </svg>
//           </div>
//           <ul
//             data-feature="container"
//             className="filter__feature-list scroll-bar"
//           >
//             <li className="filter__feature-item">
//               <input
//                 id="container-38"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="38"
//                 name="container"
//               />
//               <label htmlFor="container-38">
//                 <span className="filter__feature-value">38Ah</span>
//               </label>
//             </li>
//           </ul>
//         </div>
//         <div className="filter__feature-block">
//           <div className="filter__feature-title">
//             Тип пластин:
//             <svg className="icon">
//               <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
//             </svg>
//           </div>
//           <ul
//             data-feature="plates"
//             className="filter__feature-list scroll-bar close"
//           >
//             <li className="filter__feature-item">
//               <input
//                 id="plates-2PzB"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="2PzB"
//                 name="plates"
//               />
//               <label htmlFor="plates-2PzB">
//                 <span className="filter__feature-value">2PzB</span>
//               </label>
//             </li>
//           </ul>
//         </div>
//         <div className="filter__feature-block">
//           <div className="filter__feature-title">
//             Напряжение:
//             <svg className="icon">
//               <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
//             </svg>
//           </div>
//           <ul
//             data-feature="voltage"
//             className="filter__feature-list scroll-bar close"
//           >
//             <li className="filter__feature-item">
//               <input
//                 id="voltage-24"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="24"
//                 name="voltage"
//               />
//               <label htmlFor="voltage-24">
//                 <span className="filter__feature-value">24V</span>
//               </label>
//             </li>
//           </ul>
//         </div>
//         <div className="filter__feature-block">
//           <div className="filter__feature-title">
//             По типу техники:
//             <svg className="icon">
//               <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
//             </svg>
//           </div>
//           <ul
//             data-feature="group"
//             className="filter__feature-list scroll-bar filter__feature-list scroll-bar--wrap close"
//           >
//             <li className="filter__feature-item">
//               <input
//                 id="group-ep"
//                 className="filter__feature-input"
//                 type="checkbox"
//                 value="ep"
//                 name="group"
//               />
//               <label htmlFor="group-ep">
//                 <span className="filter__feature-value">Для погрузчиков</span>
//               </label>
//             </li>
//           </ul>
//         </div>

//         <button data-filter-close className="filter__result">
//           <img src="/img/icons/filter-w.svg" alt="" />
//           Показать
//           <span data-result-count>5</span>
//           товаров
//         </button>
//         <div className="filter__count">
//           Показано:
//           <span data-filter-count>0</span>
//           из
//           <span data-filter-length>0</span>
//         </div>
//       </div>
//     </div>
//   )
// }
//====================================================================

'use client'
import React, { useState } from 'react'

import './FilterPanel.scss'

interface Props {
  productsType: string
  categoryName: string
  onFiltersChange: (filters: Record<string, string[]>) => void
  onSortChange: (sort: string) => void
  onSearchChange: (search: string) => void
}
export const FilterPanel: React.FC<Props> = ({
  categoryName,
  onFiltersChange,
  onSortChange,
  onSearchChange,
}) => {
  const [brandFilter, setBrandFilter] = useState<string[]>([])
  const [sort, setSort] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setBrandFilter((prev) => {
      if (checked) {
        return [...prev, value]
      } else {
        return prev.filter((item) => item !== value)
      }
    })
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSort(value)
    onSortChange(value)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange(value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onFiltersChange({ brand: brandFilter })
  }
  return (
    <div className="filter">
      <h2 className="filter__title">Фильтр</h2>
      <form className="filter__form" onSubmit={handleSubmit}>
        <div className="filter__brands">
          <h3>Бренды</h3>
          <ul>
            <li>
              <input
                type="checkbox"
                id="brand-1"
                value="бренд1"
                onChange={handleBrandChange}
                checked={brandFilter.includes('бренд1')}
              />
              <label htmlFor="brand-1">Бренд 1</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="brand-2"
                value="бренд2"
                onChange={handleBrandChange}
                checked={brandFilter.includes('бренд2')}
              />
              <label htmlFor="brand-2">Бренд 2</label>
            </li>
          </ul>
        </div>
        <div className="filter__search">
          <h3>Поиск</h3>
          <input
            type="text"
            placeholder="поиск"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter__sort">
          <h3>Сортировка</h3>
          <select value={sort} onChange={handleSortChange}>
            <option value="">По умолчанию</option>
            <option value="defaultPrice:asc">По цене (возр)</option>
            <option value="defaultPrice:desc">По цене (убыв)</option>
            <option value="name:asc">По названию (А-Я)</option>
            <option value="name:desc">По названию (Я-А)</option>
          </select>
        </div>
        <button type="submit">Применить</button>
      </form>
    </div>
  )
}
