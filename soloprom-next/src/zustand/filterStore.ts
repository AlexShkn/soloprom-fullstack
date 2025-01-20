import { create } from 'zustand'

interface FilterState {
  dynamicCurrentPage: number
  setDynamicCurrentPage: (page: number) => void
  currentFilters: Record<string, string[]>
  setFilters: (filters: Record<string, string[]>) => void
  currentSort: string
  setSort: (sort: string) => void
  currentSearch: string
  setSearch: (search: string) => void
  isInitialLoad: boolean
  setIsInitialLoad: (isInitialLoad: boolean) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  dynamicCurrentPage: 1,
  setDynamicCurrentPage: (page) => set({ dynamicCurrentPage: page }),
  currentFilters: {},
  setFilters: (filters) => set({ currentFilters: filters }),
  currentSort: '',
  setSort: (sort) => set({ currentSort: sort }),
  currentSearch: '',
  setSearch: (search) => set({ currentSearch: search }),
  isInitialLoad: true,
  setIsInitialLoad: (isInitialLoad) => set({ isInitialLoad }),
}))
