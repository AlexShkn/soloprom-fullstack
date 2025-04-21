import { api } from '../fetch/instance.api'

export interface ReviewsTypes {
  userId: string
  productId: string
  userName: string
  estimation: number
  negative?: string
  positive?: string
  comment?: string
  createdAt?: string
}

export const getReviewsByUserId = async (
  userId: string,
): Promise<ReviewsTypes[]> => {
  try {
    const response = await api.get<ReviewsTypes[]>(`reviews/user/${userId}`)
    return response
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error)
    return []
  }
}
export const getReviewsByProductId = async (
  userId: string,
): Promise<ReviewsTypes[]> => {
  try {
    const response = await api.get<ReviewsTypes[]>(`reviews/product/${userId}`)
    return response
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error)
    return []
  }
}

export const createReview = async (
  reviewDto: ReviewsTypes,
): Promise<ReviewsTypes | null> => {
  try {
    const response = await api.post<ReviewsTypes>('reviews', reviewDto)
    return response
  } catch (error) {
    console.error('Ошибка при создании отзыва:', error)
    return null
  }
}
