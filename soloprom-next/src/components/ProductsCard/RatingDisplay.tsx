'use client'
import React from 'react'
import { Star } from 'lucide-react'

interface Props {
  className?: string
  rating: number
}

export const RatingDisplay: React.FC<Props> = ({ rating, className }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Star
          key={`full-${i}`}
          className="h-[14px] w-[14px] fill-yellow-500 text-yellow-500"
        />
      ))}
      {hasHalfStar && (
        <Star
          key="half"
          className="h-[14px] w-[14px] fill-yellow-500 text-yellow-500"
        />
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-[14px] w-[14px] fill-gray-300 text-gray-300"
        />
      ))}
    </div>
  )
}
