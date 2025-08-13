'use client'

import { useLocation } from 'wouter'
import { 
  Home
} from 'lucide-react'

export function Sidebar() {
  const [, setLocation] = useLocation()

  const menuItems = [
    { icon: Home, label: 'Дашборд', path: '/' },
    // Остальные пункты появятся после реализации страниц
  ]

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-primary">Меню</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
