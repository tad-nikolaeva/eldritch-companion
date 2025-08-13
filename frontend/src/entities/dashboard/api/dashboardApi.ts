import { createApi } from '@reduxjs/toolkit/query/react'
import { appAPIBaseQuery } from '@/shared/api/app/appAPIBaseQuery'
import { isSupabaseEnabled } from '@/shared/api/supabaseClient'

interface DashboardStats {
  charactersCount: number
  sessionsCount: number
  scenariosCount: number
  sanityLevel: number
}

export const dashboardApi = createApi({
  reducerPath: 'api/dashboard',
  baseQuery: appAPIBaseQuery,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  tagTypes: ['DashboardStats'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => {
        if (isSupabaseEnabled) {
          const edgeUrl = import.meta.env.VITE_DASHBOARD_STATS_URL
          return {
            url: edgeUrl || '/api/dashboard/stats',
            method: 'GET',
          }
        }
        return {
          url: '/api/dashboard/stats',
          method: 'GET',
        }
      },
      providesTags: ['DashboardStats'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi 