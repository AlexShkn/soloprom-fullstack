'use client'
import { useModalsStore } from '@/store/useModalsStore'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  productId: string
  children?: React.ReactNode
  svgSize?: string
}

export const ShareButton: React.FC<Props> = ({
  className,
  productId,
  children,
  svgSize,
  ...props
}) => {
  const { setShareModal } = useModalsStore()

  return (
    <button
      type="button"
      aria-label="поделится ссылкой на товар"
      className={`action-button ${className}`}
      onClick={() => setShareModal(productId, true)}
      {...props}
    >
      <svg
        className={`icon ${svgSize} fill-accentBlue transition-colors`}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 362.621 362.621"
      >
        <path d="M288.753 121.491c33.495 0 60.746-27.251 60.746-60.746S322.248 0 288.753 0s-60.745 27.25-60.745 60.746c0 6.307.968 12.393 2.76 18.117L104.669 155.8c-9.707-8.322-22.301-13.366-36.059-13.366-30.596 0-55.487 24.891-55.487 55.487s24.892 55.487 55.487 55.487a55.138 55.138 0 0 0 29.626-8.606l101.722 58.194a50.238 50.238 0 0 0-.902 9.435c0 27.676 22.516 50.192 50.191 50.192s50.191-22.516 50.191-50.192-22.516-50.191-50.191-50.191c-13.637 0-26.014 5.474-35.069 14.331l-95.542-54.658a55.156 55.156 0 0 0 5.46-23.991c0-5.99-.966-11.757-2.73-17.166l125.184-76.379c10.938 10.582 25.818 17.114 42.203 17.114z" />
      </svg>
      {children ? <span>{children}</span> : ''}
    </button>
  )
}
