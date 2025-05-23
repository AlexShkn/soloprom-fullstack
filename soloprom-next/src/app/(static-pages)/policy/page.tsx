import { Callback } from '@/components/Callback'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import BreadCrumbs from '@/components/BreadCrumbs'
import PageWrapper from '../../PageWrapper'
import { Policy } from '@/components/Policy'

export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности компании ООО «СОЛО»',
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
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/policy` },
}

export default function AgreementPage() {
  return (
    <PageWrapper>
      <BreadCrumbs />
      <Policy />
      <Callback />
      <ContactsMap />
    </PageWrapper>
  )
}
