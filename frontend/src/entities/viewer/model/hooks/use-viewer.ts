import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { ViewerProfile, AuthResponse } from '../types/types'
import { supabase, isSupabaseEnabled } from '@/shared/api/supabaseClient'

export function useLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: { email: string; password: string }): Promise<AuthResponse> => {
      if (isSupabaseEnabled && supabase) {
        const { data: sessionData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })
        if (error) {
          throw error
        }
        const user = sessionData.user
        return {
          access_token: sessionData.session?.access_token || '',
          user: {
            id: user?.id || '',
            email: user?.email || '',
            username: user?.user_metadata?.username || '',
            createdAt: user?.created_at || '',
            updatedAt: user?.updated_at || user?.created_at || '',
          },
        }
      }
      throw new Error('Supabase не настроен')
    },
    onSuccess: (data) => {
      // При Supabase токен хранится SDK, куки не нужны
      // Обновляем кеш пользователя
      queryClient.setQueryData(['viewer'], data.user)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: { email: string; username: string; password: string }): Promise<AuthResponse> => {
      if (isSupabaseEnabled && supabase) {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: { data: { username: data.username } },
        })
        if (error) {
          throw error
        }
        const user = signUpData.user
        return {
          access_token: signUpData.session?.access_token || '',
          user: {
            id: user?.id || '',
            email: user?.email || '',
            username: user?.user_metadata?.username || '',
            createdAt: user?.created_at || '',
            updatedAt: user?.updated_at || user?.created_at || '',
          },
        }
      }
      throw new Error('Supabase не настроен')
    },
    onSuccess: (data) => {
      // При Supabase токен хранится SDK, куки не нужны
      // Обновляем кеш пользователя
      queryClient.setQueryData(['viewer'], data.user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      if (isSupabaseEnabled && supabase) {
        await supabase.auth.signOut()
        return
      }
      throw new Error('Supabase не настроен')
    },
    onSuccess: () => {
      // При Supabase токен хранится SDK, куки не нужны
      // Очищаем кеш
      queryClient.clear()
    },
  })
}

export function useViewer() {
  return useQuery<ViewerProfile | undefined>({
    queryKey: ['viewer'],
    queryFn: async () => {
      if (isSupabaseEnabled && supabase) {
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user) {
          return undefined
        }
        return {
          id: user?.id || '',
          email: user?.email || '',
          username: user?.user_metadata?.username || '',
          createdAt: user?.created_at || '',
          updatedAt: user?.updated_at || user?.created_at || '',
        }
      }
      // При Supabase режимах — без бэкенда auth/me
      return undefined
    },
    enabled: isSupabaseEnabled ? true : !!Cookies.get('access_token'),
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