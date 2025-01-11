import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

export interface FastOrderTypes {
  productId: string
  url: string
  name: string
  img: string
  price: number
  variant: string
}

export interface ModalsState {
  callbackIsOpen: boolean
  fastOrderProduct: FastOrderTypes
}

const initialState: ModalsState = {
  callbackIsOpen: false,
  fastOrderProduct: {
    productId: '',
    url: '',
    name: '',
    img: '',
    price: 0,
    variant: '',
  },
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalCallbackStateChange: (state, action: PayloadAction<boolean>) => {
      state.callbackIsOpen = action.payload
      scrollStatusChange(action.payload)

      if (!action.payload && state.fastOrderProduct.productId) {
        state.fastOrderProduct = {
          productId: '',
          url: '',
          name: '',
          img: '',
          price: 0,
          variant: '',
        }
      }
    },
    setFastOrderProduct: (state, action: PayloadAction<FastOrderTypes>) => {
      state.fastOrderProduct = action.payload
    },
  },
})

export const { modalCallbackStateChange, setFastOrderProduct } =
  modalsSlice.actions
export default modalsSlice.reducer
