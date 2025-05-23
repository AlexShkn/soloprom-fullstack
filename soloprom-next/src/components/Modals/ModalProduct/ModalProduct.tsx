'use client'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useModalsStore } from '@/store/useModalsStore'
import { CardDataProps } from '@/types/products.types'
import CloseButton from '@/components/ui/CloseButton'
import { getProductById } from '@/api/products'
import { Loading } from '@/components/ui'
import { Search } from 'lucide-react'
import { ProductPagePriceBlock } from '@/components/ProductPage/ProductPagePriceBlock'
import { useQuery } from '@tanstack/react-query'
import { CartButton } from '@/components/ProductsCard/CartButton'
import { ShareButton } from '@/components/ProductsCard/ShareButton'
import { FavoriteButton } from '@/components/ProductsCard/FavoriteButton'
import { CompareButton } from '@/components/ProductsCard/CompareButton'
import { ModalProductImages } from './ModalProductImages'
import { ModalProductDescr } from './ModalProductDescr'
import { FastOrderButton } from '@/components/ProductsCard/FastOrderButton'
import { CartCountButtons } from '@/components/Cart/CartCountButtons'
import { CartProductTypes, useCartStore } from '@/store/useCartStore'

interface Props {
  className?: string
  productId: string
  cardData: CardDataProps | null
}

export const ModalProduct: React.FC<Props> = ({
  className,
  productId,
  cardData,
}) => {
  const [productInCart, setProductInCart] = useState<CartProductTypes>()

  const { setProductModal } = useModalsStore()
  const { cartState } = useCartStore()

  useEffect(() => {
    const checkCartIsAdded = cartState.find(
      (item) => item.productId === productId,
    )

    setProductInCart(checkCartIsAdded)
  }, [cartState])

  const modalRef = useRef(null)

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    retry: false,
  })

  const modalCloseHandler = useCallback(() => {
    setProductModal('', false, null)
  }, [setProductModal])

  if (!productId || !cardData) {
    return null
  }

  return (
    <div className="modal bg-[rgba(0,0,0,0.4) z-40">
      <button
        aria-label="закрыть окно"
        onClick={modalCloseHandler}
        className="absolute inset-0 h-full w-full cursor-auto"
      ></button>
      <div
        ref={modalRef}
        className="modal__dialog modal-show z-10 h-auto w-full max-w-[1000px] overflow-hidden rounded-custom bg-white shadow-lg lg:h-[570px]"
      >
        {isLoading ? (
          <div className="ttall absolute">
            <Loading spinClasses={'h-10 w-10'} classNames="text-accentBlue" />
          </div>
        ) : isError || !product ? (
          <div>Ошибка загрузки продукта: {error?.message}</div>
        ) : (
          <div>
            <div className="relative flex items-center gap-3 border border-b-gray-500 bg-white px-5 py-2 text-lg text-black">
              <Search className="h-4 w-4 stroke-[#000]" />
              Быстрый просмотр
              <CloseButton
                onClick={modalCloseHandler}
                classNames="absolute top-1/2 right-2.5 -translate-y-1/2 -margin-1 z-10"
                iconClass="w-7 h-7 fill-darkBlue cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 p-2.5 pb-10 lg:h-[490px] lg:grid-cols-[1fr,400px,1fr] lg:pb-0">
              <ModalProductImages
                modalClose={modalCloseHandler}
                url={cardData.url}
                img={cardData.img}
                brandName={cardData.brandName}
              />
              <ModalProductDescr
                product={product}
                modalClose={modalCloseHandler}
              />

              <div className="lg:p-5">
                <div className="mb-5 flex flex-col items-center lg:items-start">
                  <ProductPagePriceBlock
                    price={product.defaultPrice}
                    discount={product.discount}
                  />
                  <div className="mt-auto">
                    <FastOrderButton
                      className={`my-2`}
                      data={{
                        productId: product.productId,
                        name: product.name,
                        defaultPrice: product.defaultPrice,
                        defaultSize: product.defaultSize,
                        url: product.url,
                        img: product.img,
                      }}
                    />
                    <div className="flex justify-start gap-3">
                      {cardData?.productId && (
                        <CartButton cardData={cardData} className="h-12" />
                      )}
                      {cardData?.productId && productInCart ? (
                        <CartCountButtons
                          productId={cardData.productId}
                          count={productInCart.count}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-4 lg:flex-col">
                  <ShareButton
                    productId={cardData.productId}
                    className="link-hover relative inline-flex flex-col items-center justify-between gap-2 mds:flex-row mds:justify-start"
                    svgSize="h-6 w-6"
                  >
                    Поделится
                  </ShareButton>
                  <FavoriteButton
                    cardData={cardData}
                    className="link-hover relative flex flex-col items-center justify-between gap-2 mds:flex-row mds:justify-start"
                    svgSize="h-6 w-6"
                  >
                    В избранное
                  </FavoriteButton>
                  <CompareButton
                    cardData={cardData}
                    className="link-hover relative flex flex-col items-center justify-between gap-2 mds:flex-row mds:justify-start"
                    svgSize="h-6 w-6"
                  >
                    К сравнению
                  </CompareButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
