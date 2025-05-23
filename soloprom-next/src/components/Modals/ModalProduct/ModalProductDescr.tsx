'use client'
import React from 'react'
import Link from 'next/link'
import { CharacteristicsTab } from '@/components/ProductPage/ProductPageTabs'
import { ProductMainDescrBlock } from '@/components/ProductPage/ProductMainDescrBlock'
import { ArrowBigRight } from 'lucide-react'
import { ProductDetailsResponse } from '@/types/products.types'

interface Props {
  className?: string
  product: ProductDetailsResponse
  modalClose: () => void
}

export const ModalProductDescr: React.FC<Props> = ({
  className,
  modalClose,
  product,
}) => {
  return (
    <div className="relative overflow-hidden after:pointer-events-none after:invisible after:absolute after:bottom-0 after:z-10 after:h-12 after:w-full after:bg-[linear-gradient(rgba(255,255,255,0)0%,rgb(255,255,255)100%)] md:px-5 lg:h-auto lg:after:visible">
      <div className="scroll-bar-none h-full w-full overflow-x-hidden overflow-y-scroll lg:absolute lg:pb-10 lg:pr-6 lg:pt-6">
        <div className="mb-4 text-xl font-bold">
          <Link href={product.url} onClick={modalClose} className="link-hover">
            {product.name}
          </Link>
        </div>
        <div className="mb-4">
          {product.productDescr.options?.length ? (
            <CharacteristicsTab options={product.productDescr.options} />
          ) : (
            <ProductMainDescrBlock cardData={product} />
          )}
        </div>
        <div className="mb-5">
          <div className="mb-3">Описание товара</div>
          <div className="text-sm">{product.productDescr.text}</div>
        </div>
        <Link
          onClick={modalClose}
          href={product.url || ''}
          className="flex items-center gap-2 underline hover:text-accentBlue"
        >
          Больше информации о товаре
          <ArrowBigRight className="" />
        </Link>
      </div>
    </div>
  )
}
