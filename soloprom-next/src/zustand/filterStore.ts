import { create } from 'zustand'
import { cardDataProps } from '@/types/products.types'

interface FilterState {
  filters: Record<string, string[] | number>
  sort: string
  dynamicCurrentPage: number
  // products: cardDataProps[]
  totalProductsCount: number
  dataIsLoading: boolean
  hasFilters: boolean
  filteredPage: string
  setFilters: (filters: Record<string, string[] | number>) => void
  setFilteredPage: (filteredPage: string) => void
  setSort: (sort: string) => void
  setDynamicCurrentPage: (page: number) => void
  // setProducts: (products: cardDataProps[]) => void
  setTotalProductsCount: (count: number) => void
  setDataIsLoading: (loading: boolean) => void
  setHasFilters: (hasFilters: boolean) => void
  resetFilters: () => void
}

const useFilterStore = create<FilterState>((set) => ({
  filters: {},
  filteredPage: '',
  sort: '',
  dynamicCurrentPage: 1,
  // products: [],
  totalProductsCount: 0,
  dataIsLoading: false,
  hasFilters: false,
  setFilteredPage: (filteredPage) => set({ filteredPage }),
  setFilters: (filters) =>
    set({ filters, dynamicCurrentPage: 1, hasFilters: true }),
  setSort: (sort) => set({ sort, hasFilters: true }),
  setDynamicCurrentPage: (page) => set({ dynamicCurrentPage: page }),
  // setProducts: (products) => set({ products }),
  setTotalProductsCount: (count) => set({ totalProductsCount: count }),
  setDataIsLoading: (loading) => set({ dataIsLoading: loading }),
  setHasFilters: (hasFilters) => set({ hasFilters }),
  resetFilters: () =>
    set({ filters: {}, sort: '', dynamicCurrentPage: 1, hasFilters: false }),
}))

export default useFilterStore
