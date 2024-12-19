import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../../../soloprom-server/src/schemas/product.schema' // Настройте путь
import dbConnect from '@/utils/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'GET') {
    try {
      await dbConnect() // Подключение к MongoDB
      const popularProducts = await Product.find({ isPopular: true })
        .populate('category')
        .exec()
      const formattedProducts = {
        tires: popularProducts.filter(
          (product) => product.category === 'tires',
        ),
        battery: popularProducts.filter(
          (product) => product.category === 'battery',
        ),
        oils: popularProducts.filter((product) => product.category === 'oils'),
      }

      res.status(200).json(formattedProducts)
    } catch (error) {
      console.error('Ошибка при получении популярных товаров:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  } else {
    res.status(405).end() // Метод не разрешен
  }
}
