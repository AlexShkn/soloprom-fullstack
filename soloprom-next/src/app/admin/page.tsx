import PageWrapper from '../PageWrapper'

export const metadata = {
  title: 'Панель администратора',
  description: '',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Реквизиты',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin` },
}

export default function AdminPage() {
  return (
    <PageWrapper>
      <div className="">Админ</div>
    </PageWrapper>
  )
}
