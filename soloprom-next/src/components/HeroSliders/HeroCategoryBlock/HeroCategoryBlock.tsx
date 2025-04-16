import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './HeroCategorySlider.scss'

import { HeroTypes } from '@/components/Hero/Hero'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HeroCategorySlider } from './HeroCategorySlider'
import { HeroCategoryBlocks } from './HeroCategoryBlocks'

const categoriesData = [
  {
    title: 'Аккумуляторы',
    subtitle:
      'Тяговые АКБ, полутяговые, гелевые. Для штабелеров, погрузчиков, электротележек и поломоечной техники.',
    img: '/img/hero/main/acb-bg.webp',
    link: '/catalog/battery',
    alt: '',
  },
  {
    title: 'Шины для спецтехники',
    subtitle:
      'Для вилочных, телескопических, мини и фронтальных погрузчиков, грейдеров, колесных экскаваторов, сочлененных самосвалов, жесткорамных самосвалов.',
    img: '/img/hero/main/spec.webp',
    link: '/catalog/tires',
    alt: '',
  },
  {
    title: 'Масла и антифризы',
    subtitle:
      'Моторные, трансмиссионные, гидравлические и индустриальные масла',
    img: '/img/hero/main/oils.webp',
    link: '/catalog/oils',
    alt: '',
  },
]

const HeroCategoryBlock: React.FC<HeroTypes> = ({ isReady }) => {
  const isTablet = useMediaQuery('(max-width: 991.98px)')

  const filteredData = Array.from(categoriesData).filter(
    (category) => category.title !== 'Шины для спецтехники',
  )

  const skeletonStyle = {
    width: '100%',
    height: '200px',
  }

  const skeletonContainerStyle = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  }

  return (
    <>
      {isReady ? (
        !isTablet ? (
          <HeroCategoryBlocks data={filteredData} />
        ) : (
          <HeroCategorySlider data={categoriesData} />
        )
      ) : (
        <div style={skeletonContainerStyle}>
          <Skeleton style={skeletonStyle} />
          <Skeleton style={skeletonStyle} />
        </div>
      )}
    </>
  )
}

export default HeroCategoryBlock
