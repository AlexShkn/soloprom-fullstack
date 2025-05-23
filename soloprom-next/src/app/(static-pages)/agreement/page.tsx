import { Callback } from '@/components/Callback'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import BreadCrumbs from '@/components/BreadCrumbs'
import PageWrapper from '../../PageWrapper'
import { Agreement } from '@/components/Agreement'

export const metadata = {
  title: 'Соглашение об использовании персональных данных',
  description:
    'Соглашение об использовании персональных данных компании ООО «СОЛО»',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'соглашение',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/agreement` },
}

export default function AgreementPage() {
  return (
    <PageWrapper>
      <BreadCrumbs />
      <Agreement />
      <Callback />
      <ContactsMap />
    </PageWrapper>
  )
}
