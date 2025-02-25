'use client'
import Script from 'next/script'

export const GoogleAnalytics = ({ id }: { id: string }) => {
  const verify = process.env.NEXT_PUBLIC_GA_VERIFY as string
  return (
    <>
      {Boolean(verify) && (
        <meta
          name="google-site-verification"
          content="pzVzsIolxI9-Eq4w4ST-oHBZPMyS_ZaAeQVNPqhuNyE"
        ></meta>
      )}

      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  								 function gtag(){dataLayer.push(arguments);}
  								 gtag('js', new Date());
  								 gtag('config', '${id}');`,
        }}
      />
    </>
  )
}
