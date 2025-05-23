'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button, Input } from '../ui'

interface Props {
  className?: string
}

export const PromoCodeForm: React.FC<Props> = ({ className }) => {
  const [promoCode, setPromoCode] = useState('')

  const handleApplyPromoCode = () => {
    if (!promoCode) {
      toast.error('Введите промокод')
      return
    }
    // toast.success('Промокод успешно применен', {
    //   className: 'sonar-success',
    // })
    toast.warning('Промокод не действителен', {
      className: 'sonar-warn',
    })
  }

  return (
    <form className="mb-5 flex items-center gap-2">
      <Input
        placeholder="Промокод или купон"
        type="text"
        className="h-9 rounded-md"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <Button
        variant={'green'}
        type="button"
        className="h-9 rounded-md"
        onClick={handleApplyPromoCode}
      >
        <span className="">Применить</span>
      </Button>
    </form>
  )
}
