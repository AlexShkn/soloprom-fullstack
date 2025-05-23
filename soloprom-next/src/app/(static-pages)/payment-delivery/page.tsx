import { Callback } from '@/components/Callback'
import { PaymentDelivery } from '@/components/PaymentDelivery'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import BreadCrumbs from '@/components/BreadCrumbs'
import PageWrapper from '../../PageWrapper'

export const metadata = {
  title: 'Доставка и оплата',
  description:
    'Оперативная доставка продукции нашего интернет магазина в регины России и СНГ любой удобной транспортной компанией.',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Доставка и оплата',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment-delivery`,
  },
}

export default function PaymentDeliveryPage() {
  return (
    <PageWrapper>
      <BreadCrumbs />
      <PaymentDelivery level={'h1'} />
      <Callback />
      <ContactsMap />
    </PageWrapper>
  )
}
