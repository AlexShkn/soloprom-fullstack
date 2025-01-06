'use client'
import React from 'react'

interface Props {
  text: string
  disabled?: boolean
}

export const SubmitBtn: React.FC<Props> = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="button h-10 w-full cursor-pointer font-medium text-white enabled:bg-accentBlue disabled:bg-grayColor"
    >
      {text}
    </button>
  )
}
