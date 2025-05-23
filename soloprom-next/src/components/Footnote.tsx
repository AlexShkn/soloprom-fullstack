'use client'
import React from 'react'

interface Props {
  className?: string
}

export const Footnote: React.FC<Props> = ({ className }) => {
  return (
    <p className="relative pl-2.5 text-sm leading-5 before:absolute before:-left-1 before:-top-1 before:h-2.5 before:w-2.5 before:bg-[url('/img/icons/st.svg')] before:bg-cover before:bg-center before:bg-no-repeat">
      Цены на товары могут меняться, поэтому для получения самой свежей
      информации рекомендуем обратиться к нашим менеджерам онлайн, в
      мессенджерах или по телефону.
    </p>
  )
}
