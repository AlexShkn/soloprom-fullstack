'use client'
import React from 'react'

interface Props {
  text: string
}

export const SubmitBtn: React.FC<Props> = ({ text }) => {
  return (
    <button
      type="submit"
      disabled={true}
      className="button h-10 w-full cursor-pointer bg-accentBlue font-medium text-white"
    >
      {text}
    </button>
  )
}
