'use client'
import React from 'react'

import { getProductsByCategory } from '@/app/api/routes/products/route'

import './FilterPanel.scss'

interface Props {
  categoryName: string
}
export const FilterPanel: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="filter">
      <div className="filter__trigger">
        <button className="filter__trigger-button">
          <i>
            <img src="/img/icons/filter.svg" alt="" />
          </i>
          <span>Фильтр</span>
        </button>
      </div>
      <div className="filter__body load">
        <div className="filter__title">Подбор по параметрам</div>
        <div className="filter__feature-block">
          <div className="filter__feature-title">
            Тип аккумулятора:
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
          <ul data-feature="type" className="filter__feature-list scroll-bar">
            <li className="filter__feature-item">
              <input
                id="type-tyagoviy"
                className="filter__feature-input"
                type="checkbox"
                value="Тяговый"
                name="type"
              />
              <label htmlFor="type-tyagoviy">
                <span className="filter__feature-value">Тяговая</span>
              </label>
            </li>
            <li className="filter__feature-item">
              <input
                id="type-polutyagoviy"
                className="filter__feature-input"
                type="checkbox"
                value="Полутяговая"
                name="type"
              />
              <label htmlFor="type-polutyagoviy">
                <span className="filter__feature-value">Полутяговая</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="filter__feature-block">
          <div className="filter__feature-title">
            Емкость АКБ:
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
          <ul
            data-feature="container"
            className="filter__feature-list scroll-bar"
          >
            <li className="filter__feature-item">
              <input
                id="container-38"
                className="filter__feature-input"
                type="checkbox"
                value="38"
                name="container"
              />
              <label htmlFor="container-38">
                <span className="filter__feature-value">38Ah</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="filter__feature-block">
          <div className="filter__feature-title">
            Тип пластин:
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
          <ul
            data-feature="plates"
            className="filter__feature-list scroll-bar close"
          >
            <li className="filter__feature-item">
              <input
                id="plates-2PzB"
                className="filter__feature-input"
                type="checkbox"
                value="2PzB"
                name="plates"
              />
              <label htmlFor="plates-2PzB">
                <span className="filter__feature-value">2PzB</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="filter__feature-block">
          <div className="filter__feature-title">
            Напряжение:
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
          <ul
            data-feature="voltage"
            className="filter__feature-list scroll-bar close"
          >
            <li className="filter__feature-item">
              <input
                id="voltage-24"
                className="filter__feature-input"
                type="checkbox"
                value="24"
                name="voltage"
              />
              <label htmlFor="voltage-24">
                <span className="filter__feature-value">24V</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="filter__feature-block">
          <div className="filter__feature-title">
            По типу техники:
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
          <ul
            data-feature="group"
            className="filter__feature-list scroll-bar filter__feature-list scroll-bar--wrap close"
          >
            <li className="filter__feature-item">
              <input
                id="group-ep"
                className="filter__feature-input"
                type="checkbox"
                value="ep"
                name="group"
              />
              <label htmlFor="group-ep">
                <span className="filter__feature-value">Для погрузчиков</span>
              </label>
            </li>
          </ul>
        </div>

        <button data-filter-close className="filter__result">
          <img src="/img/icons/filter-w.svg" alt="" />
          Показать
          <span data-result-count>5</span>
          товаров
        </button>
        <div className="filter__count">
          Показано:
          <span data-filter-count>0</span>
          из
          <span data-filter-length>0</span>
        </div>
      </div>
    </div>
  )
}
