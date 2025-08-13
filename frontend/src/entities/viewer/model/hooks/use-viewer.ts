import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import Cookies from 'js-cookie'
import type { ViewerProfile, AuthResponse } from '../types/types'

export function useLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: { email: string; password: string }): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', data)
      return response.data
    },
    onSuccess: (data) => {
      // Сохраняем токен в cookies
      Cookies.set('access_token', data.access_token, { expires: 7 })
      // Обновляем кеш пользователя
      queryClient.setQueryData(['viewer'], data.user)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: { email: string; username: string; password: string }): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/register', data)
      return response.data
    },
    onSuccess: (data) => {
      // Сохраняем токен в cookies
      Cookies.set('access_token', data.access_token, { expires: 7 })
      // Обновляем кеш пользователя
      queryClient.setQueryData(['viewer'], data.user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      // В будущем здесь может быть вызов API для logout
      return Promise.resolve()
    },
    onSuccess: () => {
      // Удаляем токен из cookies
      Cookies.remove('access_token')
      // Очищаем кеш
      queryClient.clear()
    },
  })
}

export function useViewer() {
  return useQuery<ViewerProfile>({
    queryKey: ['viewer'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me')
      return response.data
    },
    enabled: !!Cookies.get('access_token'),
  })
}

export function useIsAuthenticated() {
  const { data: viewer, isLoading } = useViewer()
  return {
    isAuthenticated: !!viewer,
    isLoading,
    viewer,
  }
} 