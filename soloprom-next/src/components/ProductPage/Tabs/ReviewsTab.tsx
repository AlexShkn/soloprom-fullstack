'use client'
import { createReview, ReviewsTypes } from '@/api/reviews'
import React, { useState } from 'react'
import { formatDateTime } from '@/utils/formatDateTime'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button, Label } from '@/components/ui'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { RatingDisplay } from '@/components/ProductsCard/RatingDisplay'
import { ProductDescription } from '@/types/products.types'

export const ReviewsTab = ({
  productDescr,
  reviews: initialReviews,
  productId,
}: {
  productDescr?: ProductDescription
  reviews: ReviewsTypes[]
  productId: string
}) => {
  const { isAuth, userState } = useAuthStore()
  const [estimation, setEstimation] = useState(5)
  const [positive, setPositive] = useState('')
  const [negative, setNegative] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const queryClient = useQueryClient()
  const [reviews, setReviews] = useState(initialReviews)

  const createReviewMutation = useMutation({
    mutationFn: async () => {
      if (!productId || !userState?.id || !userState?.displayName) {
        throw new Error('Missing required data')
      }

      return await createReview({
        productId: productId,
        userId: userState.id,
        userName: userState.displayName,
        estimation: estimation,
        negative: negative,
        positive: positive,
        comment: comment,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reviews', productId],
      })

      const newReview: ReviewsTypes = {
        productId: productId,
        userId: userState.id,
        userName: userState.displayName,
        estimation: estimation,
        negative: negative,
        positive: positive,
        comment: comment,
      }
      setReviews((prevReviews) => [newReview, ...prevReviews])

      toast.success('Отзыв успешно добавлен!', {
        className: 'sonar-success',
      })
      setIsSubmit(true)
      setEstimation(5)
      setPositive('')
      setNegative('')
      setComment('')
    },
    onError: (error: any) => {
      toast.error(`Ошибка создания отзыва: ${error?.message}`, {
        className: 'sonar-warn',
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createReviewMutation.mutateAsync()
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (
    <div className="product-page-tabs__reviews">
      <h3 className="mb-4 text-xl font-medium">Отзывы</h3>

      {reviews && reviews?.length > 0 ? (
        <>
          <h2 className="mb-7 text-xl font-bold lg:text-3xl">
            {productDescr?.name || 'Имя продукта'}
          </h2>
          <ul className="product-page-tabs__reviews-list">
            {reviews.map((review, index) => (
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
                      <div className="text-lg font-medium">
                        {review.userName}
                      </div>
                      {review.createdAt && formatDateTime(review.createdAt)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2.5">
                    <RatingDisplay rating={review.estimation} />

                    <span className="font-medium">{review.estimation}</span>
                  </div>
                </div>
                <div className="">
                  {review.positive && (
                    <div className="mb-2">
                      <div className="mb-2 text-lg font-medium">
                        Достоинства
                      </div>
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
                      <div className="mb-2 text-lg font-medium">
                        Комментарий
                      </div>
                      <div className="text-base">{review.comment}</div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="text-xl text-[#666a70]">Нет отзывов</div>
      )}

      {!isSubmit &&
        isAuth &&
        !reviews.find((review) => review.userId === userState.id) && (
          <div className="mt-12">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4 rounded-custom p-4 shadow-custom lg:max-w-[500px]"
            >
              <h2 className="mb-4 text-xl font-bold">Оставить отзыв</h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="estimation">Оценка</Label>
                  <RatingDisplay rating={estimation} />
                  <Slider
                    id="estimation"
                    max={5}
                    min={0}
                    step={0.5}
                    value={[estimation]}
                    onValueChange={(value) => setEstimation(value[0])}
                  />
                  <p className="font-medium text-muted-foreground">
                    Выбрано: {estimation}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="positive">Достоинства</Label>
                  <Textarea
                    id="positive"
                    placeholder="Что вам понравилось?"
                    value={positive}
                    onChange={(e) => setPositive(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="negative">Недостатки</Label>
                  <Textarea
                    id="negative"
                    placeholder="Что вам не понравилось?"
                    value={negative}
                    onChange={(e) => setNegative(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    placeholder="Ваш комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" disabled={createReviewMutation.isPending}>
                {createReviewMutation.isPending
                  ? 'Отправка...'
                  : 'Отправить отзыв'}
              </Button>
            </form>
          </div>
        )}

      {!isAuth && (
        <div className="mt-12 text-center">
          Для того чтобы оставить отзыв, пожалуйста, авторизуйтесь.
        </div>
      )}
    </div>
  )
}
