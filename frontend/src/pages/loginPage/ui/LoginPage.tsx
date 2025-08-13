'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocation } from 'wouter'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [, setLocation] = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        localStorage.setItem('authToken', result.access_token)
        toast.success('Вход выполнен успешно!')
        setLocation('/')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Ошибка входа')
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            🐙 Cthulhu Web
          </CardTitle>
          <p className="text-muted-foreground">
            Войдите в свой аккаунт
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  className="w-full px-3 py-2 pr-10 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{' '}
                <button
                  type="button"
                  onClick={() => setLocation('/register')}
                  className="text-primary hover:underline"
                >
                  Зарегистрироваться
                </button>
              </p>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <h4 className="font-medium text-foreground mb-2">Тестовые аккаунты:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Admin:</strong> admin@cthulhu-web.dev / admin123</p>
              <p><strong>User:</strong> test@example.com / password123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
