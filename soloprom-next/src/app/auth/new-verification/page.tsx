import type { Metadata } from 'next'

import { NewVerificationForm } from '@/features/auth/components'
import AuthWrapper from '@/app/products/[productId]/AuthWrapper'

export const metadata: Metadata = {
  title: 'Подтверждение почты',
}

export default function NewVerificationPage() {
  return <NewVerificationForm />
}
