import { FetchClient } from '@/utils/fetch/fetch-client'

export const api = new FetchClient({
  baseUrl: 'http://localhost:3001',
  options: {
    credentials: 'include',
  },
})
