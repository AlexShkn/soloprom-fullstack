import { configureStore } from '@reduxjs/toolkit'
import modalsSliceReducer from './slices/modalsSlice'
import menuSliceReducer from './slices/menuSlice'
import CatalogSliceReducer from './slices/catalogMenu'
import HeaderSliceReducer from './slices/headerSlice'
import LocateSearchReducer from './slices/locateSlice'

export const store = configureStore({
	reducer: {
		modals: modalsSliceReducer,
		menu: menuSliceReducer,
		catalogMenu: CatalogSliceReducer,
		header: HeaderSliceReducer,
		cities: LocateSearchReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
