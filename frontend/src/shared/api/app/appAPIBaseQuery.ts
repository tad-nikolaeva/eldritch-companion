import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const appAPIBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  
  // Обработка ошибок авторизации
  if (result.error && result.error.status === 401) {
    localStorage.removeItem('authToken')
    // Здесь можно добавить редирект на страницу логина
  }
  
  return result
} 