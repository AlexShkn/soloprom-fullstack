import { create } from 'zustand'
import { scrollStatusChange } from '@/utils/scrollStatusChange'
import { CardDataProps } from '@/types/products.types'

export interface FastOrderTypes {
  productId: string
  url: string
  name: string
  img: string
  price: number
  size: string
}

interface ShareTypes {
  isOpen: boolean
  productId: string
}

interface ProductModalTypes {
  isOpen: boolean
  productId: string
  cardData: CardDataProps | null
}

interface ModalsState {
  showMessage: boolean
  callbackIsOpen: boolean
  fastOrderProduct: FastOrderTypes
  shareModal: ShareTypes
  productModal: ProductModalTypes
  modalMessageStateChange: (isOpen: boolean) => void
  modalCallbackStateChange: (isOpen: boolean) => void
  setShareModal: (productId: string, isOpen: boolean) => void
  setProductModal: (
    productId: string,
    isOpen: boolean,
    cardData: CardDataProps | null,
  ) => void
  setFastOrderProduct: (product: FastOrderTypes) => void
}

const initialFastOrderProduct: FastOrderTypes = {
  productId: '',
  url: '',
  name: '',
  img: '',
  size: '',
  price: 0,
}

export const useModalsStore = create<ModalsState>((set, get) => ({
  shareModal: {
    productId: '',
    isOpen: false,
  },
  productModal: {
    productId: '',
    isOpen: false,
    cardData: null,
  },
  showMessage: false,
  callbackIsOpen: false,
  fastOrderProduct: initialFastOrderProduct,

  setShareModal: (productId, isOpen) =>
    set(() => ({
      shareModal: {
        productId,
        isOpen,
      },
    })),
  setProductModal: (productId, isOpen, cardData) => {
    scrollStatusChange(isOpen)
    set(() => ({
      productModal: {
        productId,
        isOpen,
        cardData,
      },
    }))
  },

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
