'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface LdJsonData {
  '@context': string
  '@type': string
  name: string
  telephone: string
  address: string
  logo: string
  url: string
}

async function getLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'СОЛОПРОМ',
    telephone: '+79036569393',
    address: 'ул.45-й Стрелковой дивизии, д.224, офис 200, Воронеж, Россия',
    logo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/logo.png`,
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  }
}

export default function JsonLd() {
  const pathname = usePathname()
  const [ldJson, setLdJson] = useState<LdJsonData | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (pathname === '/') {
        const data = await getLdJson()
        setLdJson(data)
      }
    }
    fetchData()
  }, [pathname])

  if (!ldJson) {
    return null
  }

  return (
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </head>
  )
}
