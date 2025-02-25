import { GoogleAnalytics } from './GoogleAnalytics'
import { YandexAnalytics } from './YandexAnalytics'

export const Analytics = () => {
  const yaId = process.env.NEXT_PUBLIC_YA_ID as string
  const gaId = process.env.NEXT_PUBLIC_GA_ID as string
  return (
    <>
      {Boolean(gaId) && <GoogleAnalytics id={gaId} />}
      {Boolean(yaId) && <YandexAnalytics id={yaId} />}
    </>
  )
}
