import { Callback } from '@/components/Callback/Callback'
import { PaymentDelivery } from '@/components/PaymentDelivery/PaymentDelivery'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
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
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Доставка и оплата',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru/payment-delivery' },
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
