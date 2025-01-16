import { create } from 'zustand'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

export interface FastOrderTypes {
  productId: string
  url: string
  name: string
  img: string
  price: number
  variant: string
}

interface ModalsState {
  callbackIsOpen: boolean
  fastOrderProduct: FastOrderTypes
  modalCallbackStateChange: (isOpen: boolean) => void
  setFastOrderProduct: (product: FastOrderTypes) => void
}

const initialFastOrderProduct: FastOrderTypes = {
  productId: '',
  url: '',
  name: '',
  img: '',
  price: 0,
  variant: '',
}

export const useModalsStore = create<ModalsState>((set, get) => ({
  callbackIsOpen: false,
  fastOrderProduct: initialFastOrderProduct,
  modalCallbackStateChange: (isOpen) => {
    set({ callbackIsOpen: isOpen })
    scrollStatusChange(isOpen)
    if (!isOpen && get().fastOrderProduct.productId) {
      set({ fastOrderProduct: initialFastOrderProduct })
    }
  },
  setFastOrderProduct: (product) => {
    set({ fastOrderProduct: product })
  },
}))
