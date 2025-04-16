'use client'
import React from 'react'
import { useCompareStore } from '@/store/compareStore'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TransitionWrapper from '@/providers/TransitionWrapper'
import PageWrapper from '../PageWrapper'
import { getDigFormat } from '@/supports'
import Link from 'next/link'

const dictionary = {
  sizes: {
    tires: 'Размер',
    battery: 'ДхШхВ',
    oils: 'Объём',
  },
  category: {
    tires: 'Шины',
    battery: 'Аккумуляторы',
    oils: 'Масла и антифризы',
  },
}

const ComparePage = () => {
  const { comparedItems, removeFromCompare } = useCompareStore()
  const categories = Object.keys(comparedItems) as Array<
    keyof typeof comparedItems
  >

  const handleDelete = (
    category: string,
    productId: string,
    variant: string,
  ) => {
    removeFromCompare(category, productId, variant)
  }

  return (
    <TransitionWrapper>
      <PageWrapper>
        <div className="page-container mx-auto py-10">
          <h1 className="mb-5 text-2xl font-bold">Сравнение товаров</h1>

          {comparedItems.battery.length ||
          comparedItems.tires.length ||
          comparedItems.oils.length ? (
            categories.map((category) => {
              if (comparedItems[category].length === 0) {
                return null
              }
              return (
                <div key={category} className="mb-8 rounded bg-slate-200 p-8">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-52 bg-accentBlue text-lg text-white">
                            {dictionary.category[category]}
                          </TableHead>
                          {comparedItems[category].map((product) => (
                            <TableHead
                              key={`${product.productId}-${product.variant}`}
                              className="text-center"
                            >
                              <button
                                onClick={() =>
                                  handleDelete(
                                    category,
                                    product.productId,
                                    product.variant,
                                  )
                                }
                                className="ml-auto h-full w-full text-darkBlue hover:bg-darkBlue hover:text-red-700"
                              >
                                Удалить
                              </button>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-52 bg-darkBlue text-lg font-medium text-white">
                            Фото
                          </TableCell>
                          {comparedItems[category].map((product) => (
                            <TableCell
                              key={`${product.productId}-${product.variant}`}
                              className="text-center"
                            >
                              <Link href={`/products/${product.productId}`}>
                                <Image
                                  className="inline-block h-[120px] object-contain"
                                  src={
                                    (product.img &&
                                      `/img/catalog/${product.img}.webp`) ||
                                    '/img/catalog/not-found.webp'
                                  }
                                  width={120}
                                  height={120}
                                  alt={product.name}
                                />
                              </Link>
                            </TableCell>
                          ))}
                        </TableRow>

                        <TableRow>
                          <TableCell className="w-52 bg-darkBlue text-lg font-medium text-white">
                            Название
                          </TableCell>
                          {comparedItems[category].map((product) => (
                            <TableCell
                              key={`${product.productId}-${product.variant}`}
                              className="min-w-48 text-center"
                            >
                              <Link
                                href={`/products/${product.productId}`}
                                className="link-hover font-bold"
                              >
                                {product.name}
                              </Link>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-52 bg-darkBlue text-lg font-medium text-white">
                            {dictionary.sizes[category]}
                          </TableCell>
                          {comparedItems[category].map((product) => (
                            <TableCell
                              key={`${product.productId}-${product.variant}`}
                              className="text-center font-medium"
                            >
                              {product.variant}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-52 bg-darkBlue text-lg font-medium text-white">
                            Цена
                          </TableCell>
                          {comparedItems[category].map((product) => (
                            <TableCell
                              key={`${product.productId}-${product.variant}`}
                              className="text-center font-medium"
                            >
                              {getDigFormat(product.price)} ₽
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="page-container flex justify-center py-10 text-2xl font-medium">
              Список пуст
            </div>
          )}
        </div>
      </PageWrapper>
    </TransitionWrapper>
  )
}

export default ComparePage
