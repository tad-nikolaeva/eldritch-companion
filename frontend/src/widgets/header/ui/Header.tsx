'use client'

import { Button } from '@/shared/ui'
import { supabase, isSupabaseEnabled } from '@/shared/api/supabaseClient'
import { useLocation } from 'wouter'

export function Header() {
  const [, setLocation] = useLocation()

  const handleLogout = async () => {
    if (isSupabaseEnabled && supabase) {
      await supabase.auth.signOut()
    } else {
      localStorage.removeItem('authToken')
    }
    setLocation('/login')
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">🐙 Cthulhu Web</h1>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => setLocation('/')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Дашборд
            </button>
            <button
              onClick={() => setLocation('/characters')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Персонажи
            </button>
            <button
              onClick={() => setLocation('/sessions')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Сессии
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setLocation('/profile')}
          >
            Профиль
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}
