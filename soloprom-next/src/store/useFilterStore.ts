import { create } from 'zustand'

interface FilterState {
  initialLoad: boolean
  filters: Record<string, string[] | number>
  sort: string
  dynamicCurrentPage: number
  totalProductsCount: number
  hasFilters: boolean
  dataIsLoading: boolean
  filteredPage: string
  priceRange: { min: number | undefined; max: number | undefined }
  viewMode: string

  setFilters: (filters: Record<string, string[] | number>) => void
  setFilteredPage: (filteredPage: string) => void
  setViewMode: (mode: string) => void
  setSort: (sort: string) => void
  setInitialLoad: (status: boolean) => void
  setDataIsLoading: (status: boolean) => void
  setDynamicCurrentPage: (page: number) => void
  setTotalProductsCount: (count: number) => void
  setHasFilters: (hasFilters: boolean) => void
  resetFilters: () => void
  setPriceRange: (priceRange: {
    min: number | undefined
    max: number | undefined
  }) => void
}

const useFilterStore = create<FilterState>((set) => ({
  initialLoad: true,
  filters: {},
  filteredPage: '',
  sort: '',
  dynamicCurrentPage: 1,
  totalProductsCount: 0,
  dataIsLoading: true,
  hasFilters: false,
  priceRange: { min: undefined, max: undefined },
  viewMode: 'grid',

  setViewMode: (viewMode) => set({ viewMode }),
  setFilteredPage: (filteredPage) => set({ filteredPage }),
  setFilters: (filters) =>
    set({ filters, dynamicCurrentPage: 1, hasFilters: true }),
  setInitialLoad: (status) => set({ initialLoad: status }),
  setDataIsLoading: (status) => set({ dataIsLoading: status }),
  setSort: (sort) => set({ sort, hasFilters: true }),
  setDynamicCurrentPage: (page) =>
    set({ dynamicCurrentPage: page, dataIsLoading: true }),
  setTotalProductsCount: (count) => set({ totalProductsCount: count }),
  setHasFilters: (hasFilters) => set({ hasFilters }),

  resetFilters: () =>
    set({
      filters: {},
      sort: '',
      dynamicCurrentPage: 1,
      hasFilters: false,
      priceRange: { min: undefined, max: undefined },
    }),

  setPriceRange: (priceRange) => set({ priceRange }),
}))

export default useFilterStore
