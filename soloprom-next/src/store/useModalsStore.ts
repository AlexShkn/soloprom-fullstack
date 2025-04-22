import { create } from 'zustand'
import { scrollStatusChange } from '@/utils/scrollStatusChange'
import { boolean } from 'zod'

export interface FastOrderTypes {
  productId: string
  url: string
  name: string
  img: string
  price: number
  variant: string
}

interface ShareTypes {
  isOpen: boolean
  productId: string
}

interface ModalsState {
  showMessage: boolean
  callbackIsOpen: boolean
  fastOrderProduct: FastOrderTypes
  shareModal: ShareTypes
  modalMessageStateChange: (isOpen: boolean) => void
  modalCallbackStateChange: (isOpen: boolean) => void
  setShareModal: (productId: string, isOpen: boolean) => void
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
  shareModal: {
    productId: '',
    isOpen: false,
  },
  showMessage: false,
  callbackIsOpen: false,
  fastOrderProduct: initialFastOrderProduct,

  setShareModal: (productId, isOpen) =>
    set(() =>
      // scrollStatusChange(isOpen),
      ({
        shareModal: {
          productId,
          isOpen,
        },
      }),
    ),

  modalMessageStateChange: (isOpen) => {
    set({ showMessage: isOpen })
  },

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
