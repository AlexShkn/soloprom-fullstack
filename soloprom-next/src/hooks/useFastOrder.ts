import { useModalsStore } from '@/store/useModalsStore'

export const useFastOrder = () => {
  const { modalCallbackStateChange, setFastOrderProduct } = useModalsStore()

  const fastOrder = (
    productId: string,
    name: string,
    defaultPrice: number,
    defaultSize: string,
    url: string,
    img: string,
  ) => {
    setFastOrderProduct({
      productId,
      name,
      price: defaultPrice,
      size: defaultSize,
      url,
      img,
    })
    modalCallbackStateChange(true)
  }

  return { fastOrder }
}
