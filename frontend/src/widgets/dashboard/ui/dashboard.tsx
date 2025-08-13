'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { useGetDashboardStatsQuery } from '@/entities'

export function Dashboard() {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Загрузка статистики...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-destructive text-lg font-medium">Ошибка загрузки данных</p>
          </div>
        </div>
      </div>
    )
  }

  const { charactersCount = 0 } = stats || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 py-8">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            🐙 Cthulhu Web
          </h1>
          <p className="text-xl text-muted-foreground mb-2 italic">
            Ваш спутник в мире ужасов Call of Cthulhu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Персонажи</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">👥</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{charactersCount}</div>
              <p className="text-xs text-muted-foreground">Созданных исследователей</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
