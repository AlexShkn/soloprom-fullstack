import { CartData } from '@/components/ProductsCard/CartButton'
import { create } from 'zustand'

interface DrawerState {
  isProductDrawerOpen: boolean
  drawerProductId: string
  drawerProduct: CartData | null
  setProductDrawer: (
    productId: string,
    open: boolean,
    product: CartData,
  ) => void
  closeProductDrawer: () => void
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isProductDrawerOpen: false,
  drawerProductId: '',
  drawerProduct: null,
  setProductDrawer: (productId, open, product) => {
    set({
      isProductDrawerOpen: open,
      drawerProductId: productId,
      drawerProduct: product,
    })
  },
  closeProductDrawer: () => set({ isProductDrawerOpen: false }),
}))
