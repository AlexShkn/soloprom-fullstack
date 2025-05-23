import { create } from 'zustand'
import {
  CardDataProps,
  FilteredBlockDataList,
  FiltersState,
} from '@/types/products.types'
import { api } from '@/utils/fetch/instance.api'

interface ProductsFilterState {
  totalPages: number
  searchQuery: string
  currentPage: number
  listShow: boolean
  filters: FiltersState
  productCount: number
  filtersProducts: CardDataProps[]
  filtersOptions: CardDataProps[]
  dynamicFilteredList: FilteredBlockDataList | null
  isLoading: boolean
  isLoadingMore: boolean
  setFilters: (filters: FiltersState) => void
  setSearchQuery: (value: string) => void
  setCurrentPage: (page: number) => void
  setProductCount: (count: number) => void
  setFiltersProducts: (products: CardDataProps[]) => void
  setFiltersOptions: (products: CardDataProps[]) => void
  setDynamicFilteredList: (filteredList: FilteredBlockDataList) => void
  setIsLoading: (isLoading: boolean) => void
  setIsLoadingMore: (isLoadingMore: boolean) => void
  setListShow: (isShow: boolean) => void

  resetFilters: () => void
  fetchProductsOptions: (
    filters: FiltersState,
    category: string,
    handleResetFilters: () => void,
    mode: 'options' | 'products',
    limit?: number,
    page?: number,
  ) => Promise<void>
}

export const useProductsFilterStore = create<ProductsFilterState>(
  (set, get) => ({
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
    filters: {},
    productCount: 0,
    filtersProducts: [],
    filtersOptions: [],
    dynamicFilteredList: null,
    isLoadingMore: false,
    isLoading: false,
    listShow: false,
    setListShow: (isShow) => set({ listShow: isShow }),
    setFilters: (filters) => set({ filters }),
    setProductCount: (count) => set({ productCount: count }),
    setSearchQuery: (value) => set({ searchQuery: value }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setFiltersProducts: (products) => set({ filtersProducts: products }),
    setFiltersOptions: (products) => set({ filtersOptions: products }),
    setDynamicFilteredList: (filteredList) =>
      set({ dynamicFilteredList: filteredList }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),

    resetFilters: () => {
      set({
        filters: {},
        productCount: 0,
        filtersProducts: [],
        filtersOptions: [],
        dynamicFilteredList: null,
        totalPages: 0,
        currentPage: 1,
      })
    },

    fetchProductsOptions: async (
      filters,
      category,
      handleResetFilters,
      mode,
      limit = 0,
      page = 1,
    ) => {
      let finalTime = false
      const prevProducts = get().filtersProducts
      set({ isLoading: true })

      setTimeout(() => {
        finalTime = true
      }, 500)

      try {
        if (Object.keys(filters).length > 1) {
          const params = {
            categoryName: category,
            filters:
              Object.keys(filters).length > 0 ? JSON.stringify(filters) : null,
            limit: limit ?? 0,
            page: page,
          }

          console.log(params)

          const endpoint =
            mode === 'options'
              ? 'products/get-options'
              : 'products/get-products'

          const response = await api.get<{
            products: CardDataProps[]
            totalCount: number
            currentPage: number
            totalPages: number
            limit?: number
          }>(endpoint, { params: params as any })

          if (mode === 'options') {
            set({
              filtersOptions: response.products,
            })
          } else {
            set({
              filtersProducts: [...prevProducts, ...response.products],
              totalPages: response.totalPages,
              currentPage: response.currentPage + 1,
              listShow: true,
            })
          }

          console.log(response.totalCount)
          console.log(response.products)

          set({
            productCount: response.totalCount,
            searchQuery: '',
          })
        } else {
          handleResetFilters()
          set({
            totalPages: 0,
          })
        }
      } catch (error) {
        console.error('Error fetching product count:', error)
        handleResetFilters()
        set({
          totalPages: 0,
        })
      } finally {
        if (!finalTime) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
        set({ isLoading: false })
      }
    },
  }),
)
