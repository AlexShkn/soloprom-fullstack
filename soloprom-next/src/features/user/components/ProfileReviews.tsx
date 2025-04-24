'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDateTime } from '@/utils/formatDateTime'
import { Loading } from '@/ui'
import { IUser } from '@/features/auth/types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getReviewsByUserId, ReviewsTypes } from '../../../api/reviews'

interface ReviewsProps {
  user: IUser
}

export const ProfileReviews: React.FC<ReviewsProps> = ({ user }) => {
  const [reviewsData, setReviewsData] = useState<ReviewsTypes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

      try {
        setLoading(true)

        await delay(500)

        const reviews = await getReviewsByUserId(user.id)

        setReviewsData(reviews)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  if (loading) {
    return (
      <div className="relative h-80">
        <Loading
          classNames="absolute ttall z-20 text-accentBlue"
          spinClasses="w-10 h-10"
        />
      </div>
    )
  }
  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>
  }

  return (
    <div className="w-full space-y-6">
      {reviewsData.length > 0 ? (
        <ul className="flex flex-col">
          {reviewsData.map((review, index) => (
            <li key={index} className="mb-6 rounded bg-[#fafafa] p-2 md:p-7">
              <div className="border-1 mb-5 flex items-center justify-between gap-7 border-b border-[#f1eff2] pb-4">
                <div className="flex items-center">
                  <div className="mr-2.5 flex h-10 w-10 items-center rounded-br-full bg-[#d9dde7] pb-1 pl-1">
                    <img
                      className="h-6 w-6"
                      src="/img/icons/profile.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className="text-lg font-medium">{review.userName}</div>
                    {review.createdAt && formatDateTime(review.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-2.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src="/img/icons/star.svg"
                      className="h-5 w-5"
                      alt=""
                      style={{
                        opacity: starIndex + 1 <= review.estimation ? 1 : 0.3,
                      }}
                    />
                  ))}

                  <span className="font-medium">{review.estimation}</span>
                </div>
              </div>
              <div className="">
                {review.positive && (
                  <div className="mb-2">
                    <div className="mb-2 text-lg font-medium">Достоинства</div>
                    <div className="text-base">{review.positive}</div>
                  </div>
                )}

                {review.negative && (
                  <div className="mb-2">
                    <div className="mb-2 text-lg font-medium">Недостатки</div>
                    <div className="text-base">{review.negative}</div>
                  </div>
                )}

                {review.comment && (
                  <div className="mb-2">
                    <div className="mb-2 text-lg font-medium">Комментарий</div>
                    <div className="text-base">{review.comment}</div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-6 text-center text-gray-500">
          <p className="mx-auto">У вас еще нет отзывов.</p>
          <Link
            href={'/catalog'}
            className="button button--accent mx-auto w-auto px-4 py-1"
          >
            За покупками
          </Link>
        </div>
      )}
    </div>
  )
}
