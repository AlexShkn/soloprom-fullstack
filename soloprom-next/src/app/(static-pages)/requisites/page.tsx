import { Callback } from '@/components/Callback/Callback'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { Requisites } from '@/components/Requisites/Requisites'
import PageWrapper from '../../PageWrapper'

export const metadata = {
  title: 'Реквизиты',
  description: 'Реквизиты компании ООО «СОЛО»',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Реквизиты',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru/requisites' },
}

export default function RequisitesPage() {
  return (
    <PageWrapper>
      <BreadCrumbs />
      <Requisites />
      <Callback />
      <ContactsMap />
    </PageWrapper>
  )
}
