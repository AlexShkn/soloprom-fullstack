'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
  url: string
  img: string
  brandName: string
  modalClose: () => void
}

export const ModalProductImages: React.FC<Props> = ({
  className,
  modalClose,
  url,
  img,
  brandName,
}) => {
  return (
    <div
      className={`relative h-[250px] w-full lg:h-[350px] lg:w-[300px] ${className}`}
    >
      <div className="relative overflow-hidden">
        <Link
          href={url}
          onClick={modalClose}
          className="flex items-center justify-center"
        >
          <Image
            src={
              (img && `/img/catalog/${img}.webp`) ||
              `/img/brands/${brandName.toLowerCase()}.webp`
            }
            className="h-[250px] object-contain md:h-[350px] md:w-[300px]"
            width={350}
            height={300}
            alt={brandName}
          />
        </Link>
      </div>
    </div>
  )
}
