import { configureStore } from '@reduxjs/toolkit'
import modalsSliceReducer from './slices/modalsSlice'
import menuSliceReducer from './slices/menuSlice'
import CatalogSliceReducer from './slices/catalogMenu'
import HeaderSliceReducer from './slices/headerSlice'
import LocateSearchReducer from './slices/locateSlice'
import CartSlice from './slices/cartSlice'
import FavoriteSlice from './slices/favoriteSlice'

export const store = configureStore({
  reducer: {
    modals: modalsSliceReducer,
    menu: menuSliceReducer,
    catalogMenu: CatalogSliceReducer,
    header: HeaderSliceReducer,
    cities: LocateSearchReducer,
    cart: CartSlice,
    favorite: FavoriteSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
