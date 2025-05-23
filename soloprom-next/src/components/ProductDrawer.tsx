'use client'
import React from 'react'
import Image from 'next/image'
import { useDrawerStore } from '@/store/useDrawerStore'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { Button } from './ui'
import { getDigFormat } from '@/supports'
import { ArrowLeft, ShoppingCart, X } from 'lucide-react'
import { useModalsStore } from '@/store/useModalsStore'

const ProductDrawer = () => {
  const { isProductDrawerOpen, closeProductDrawer, drawerProduct } =
    useDrawerStore()
  const { productModal, setProductModal } = useModalsStore()
  const router = useRouter()

  const handleGoToCart = () => {
    if (productModal.isOpen) {
      setProductModal('', false, null)
    }
    closeProductDrawer()
    router.push('/cart')
  }

  const closeProductDrawerHandler = () => {
    closeProductDrawer()
  }

  return (
    <Drawer open={isProductDrawerOpen} onOpenChange={closeProductDrawerHandler}>
      <DrawerContent>
        <div className="page-container flex flex-col items-center bg-white">
          <DrawerClose className="absolute right-4 top-2 p-2 hover:text-accentBlue">
            <X />
          </DrawerClose>
          <DrawerHeader>
            <div className="flex items-center gap-2">
              <img
                src="/img/icons/cart-fly.svg"
                alt="Корзина покупок"
                className="h-10 w-10"
              />

              <div className="flex flex-col gap-1">
                <DrawerTitle>Товар добавлен в корзину!</DrawerTitle>
                <DrawerDescription>
                  Информация о добавленном товаре:
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          {drawerProduct && (
            <div className="relative z-50 flex items-center gap-2.5 bg-white">
              <Image
                src={
                  drawerProduct.img
                    ? `/img/catalog/${drawerProduct.img}.webp`
                    : '/img/catalog/not-found.jpg'
                }
                alt={drawerProduct.name}
                className="mb-4 h-20 w-20 rounded-md mds:h-32 mds:w-32"
                width={128}
                height={128}
              />

              <div className="flex flex-col">
                <p>
                  <b>Название:</b> {drawerProduct.name}
                </p>
                <p>
                  <b>Цена:</b> {getDigFormat(drawerProduct.defaultPrice)} ₽
                </p>
                <p>
                  <b>Размер:</b> {drawerProduct.defaultSize}
                </p>
              </div>
            </div>
          )}

          <DrawerFooter>
            <div className="flex flex-col-reverse items-center gap-2 mds:flex-row mds:gap-5">
              <Button variant="outline" onClick={closeProductDrawer}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                Продолжить покупки
              </Button>
              <Button className="w-auto" onClick={handleGoToCart}>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Перейти в корзину
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductDrawer
