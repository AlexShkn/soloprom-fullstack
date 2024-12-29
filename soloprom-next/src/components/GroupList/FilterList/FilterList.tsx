'use client'
import React from 'react'

import { ProductsCard } from '@/components/ProductsCard/ProductsCard'

interface Props {
  className?: string
}

const data = [
  {
    productId: 'G-BoxATFDXVI',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/BoxATFDXVI',
    name: 'G-Box ATF DX VI',
    descr: 'Синтетическое трансмиссионное масло',
    img: 'oils/g-box-atf-dx-vi',
    volumes: {
      '1Л': 784,
      '4Л': 2663,
      '20Л': 12275,
      '205Л': 116279,
      '1000Л': 566868,
    },
    defaultPrice: 784,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-GL-5-80W-90',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-GL-5-80W-90',
    name: 'G-Truck GL-5 80W-90',
    descr: 'Масло трансмиссионное',
    img: 'oils/G-Truck-GL-5-80W-90',
    volumes: {
      '20Л': 7047,
      '205Л': 66855,
    },
    defaultPrice: 7047,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '80W-90',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-GL-5-85W-140',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-GL-5-85W-140',
    name: 'G-Truck GL-5 85W-140',
    descr: 'Масло трансмиссионное',
    img: 'oils/G-Truck-GL-5-85W-140',
    volumes: {
      '20Л': 6645,
      '205Л': 62691,
    },
    defaultPrice: 6645,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '85W-140',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-LS-80W-90',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-LS-80W-90',
    name: 'G-Truck LS 80W-90',
    descr: 'Масло трансмиссионное',
    img: 'oils/G-Truck-LS-80W-90',
    volumes: {
      '20Л': 11985,
      '205Л': 113690,
    },
    defaultPrice: 11985,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '80W-90',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-LS-85W-90',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-LS-85W-90',
    name: 'G-Truck LS 85W-90',
    descr: 'Масло трансмиссионное',
    img: 'oils/G-Truck-LS-85W-90',
    volumes: {
      '205Л': 110693,
    },
    defaultPrice: 110693,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '85W-90',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-LS-85W-140',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-LS-85W-140',
    name: 'G-Truck LS 85W-140',
    descr: 'Масло трансмиссионное',
    img: 'oils/oil-default',
    volumes: {
      '20Л': 12147,
      '205Л': 115214,
    },
    defaultPrice: 12147,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '85W-140',
    models: [],
    regalia: [],
    isPopular: false,
  },
  {
    productId: 'G-Truck-Z-75W-80',
    categoryName: 'oils',
    subcategoryName: 'masla-transmissionnie',
    url: '/catalog/oils/masla-transmissionnie/G-Truck-Z-75W-80',
    name: 'G-Truck Z 75W-80',
    descr: 'Масло трансмиссионное',
    img: 'oils/oil-default',
    volumes: {
      '20Л': 17170,
      '205Л': 162350,
    },
    defaultPrice: 17170,
    groups: [],
    delivery: '2-3 дня',
    productType: 'Трансмиссионное',
    brand: 'G-Energy',
    country: 'Россия',
    viscosity: '75W-80',
    models: [],
    regalia: [],
    isPopular: false,
  },
]

export const FilterList: React.FC<Props> = ({ className }) => {
  return (
    <div className="filter__catalog">
      <ul className="group-list__catalog-list">
        {data.map((item) => (
          <ProductsCard key={item.productId} cardData={item} />
        ))}
      </ul>
      <div className="group-list__catalog-more hidden">Показать еще</div>
    </div>
  )
}
