import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

export interface CatalogMenuState {
  catalogIsOpen: boolean
}

const initialState: CatalogMenuState = {
  catalogIsOpen: false,
}

export const catalogMenuSlice = createSlice({
  name: 'catalogMenu',
  initialState,
  reducers: {
    catalogMenuStateChange: (state, action) => {
      const { status, screen } = action.payload
      state.catalogIsOpen = status

      if (screen) {
        scrollStatusChange(status)
      }
    },
  },
})

export const { catalogMenuStateChange } = catalogMenuSlice.actions
export default catalogMenuSlice.reducer
