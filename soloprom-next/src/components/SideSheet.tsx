'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button, Separator } from '@/components/ui'
import { FormCallback } from './FormCallback'

interface Props {
  className?: string
}

export const SideSheet: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Separator orientation="vertical" />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="green">Заказать подбор</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader className="mb-10">
            <SheetTitle>Заказать подбор</SheetTitle>
            <SheetDescription>
              Свяжитесь с нами, чтобы заказать подбор продукции
            </SheetDescription>
          </SheetHeader>
          <FormCallback />
        </SheetContent>
      </Sheet>
    </>
  )
}
