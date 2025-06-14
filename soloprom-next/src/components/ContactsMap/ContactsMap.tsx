'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Loading } from '../ui'

const YaMap = React.lazy(() => import('./YaMap'))

interface Props {
  className?: string
}

export const ContactsMap: React.FC<Props> = ({ className }) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const mapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
    }
  }, [])

  return (
    <section
      id="contacts"
      className="contacts-map relative flex flex-col bg-accentBlue lg:block lg:bg-none"
      ref={mapRef}
    >
      {isIntersecting ? (
        <React.Suspense
          fallback={
            <Loading
              classNames="absolute ttall text-white"
              spinClasses="w-10 h-10"
            />
          }
        >
          <YaMap />
        </React.Suspense>
      ) : (
        <div className="h-[350px] w-full animate-pulse bg-gray-200">
          <Loading />
        </div>
      )}
      <div className="page-container relative">
        <div className="relative my-14 inline-flex flex-col rounded-custom p-14 px-4 py-7 shadow-custom xs:p-7 md:w-full md:max-w-max lg:max-w-[460px] lg:bg-accentBlue">
          <h2 className="mb-7 text-3xl font-medium leading-9 text-white">
            Офис продаж
            <br />
            ООО «СОЛО»
          </h2>

          <a
            href="tel+79036569393"
            className="mb-2.5 text-lg font-bold text-[#ffcf33] transition-colors hover:text-white"
          >
            +7 (903) 656-93-93
          </a>
          <a
            href="mailto:solo.vrn@mail.ru"
            className="mb-2.5 text-lg text-white"
          >
            solo.vrn@mail.ru
          </a>
          <address className="mb-2 text-lg not-italic leading-7 text-white">
            г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
          </address>
          <div className="flex gap-3 text-lg leading-7 text-white">
            <span>Часы работы:</span>
            <div className="flex flex-col text-right">
              <span className="whitespace-nowrap">будни - 9:00-21:00</span>
              <span className="whitespace-nowrap"> сб. - 10:00-15:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
