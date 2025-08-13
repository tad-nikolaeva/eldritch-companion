import { Router, Route, Switch } from 'wouter'
import { useEffect, useState } from 'react'
import { Providers } from '@/shared/config/providers'
import { DashboardPage } from '@/pages/dashboardPage'
import { LoginPage } from '@/pages/loginPage'
import { RegisterPage } from '@/pages/registerPage'
import styles from './App.module.scss'
import './index.css'
import { supabase, isSupabaseEnabled } from '@/shared/api/supabaseClient'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (isSupabaseEnabled && supabase) {
        const { data } = await supabase.auth.getSession()
        setIsAuthenticated(Boolean(data.session))
        setIsLoading(false)
        supabase.auth.onAuthStateChange((_event: unknown, session: unknown) => {
          // @ts-ignore simplify session shape handling
          setIsAuthenticated(Boolean(session))
        })
        return
      }

      const token = localStorage.getItem('authToken')
      if (token) {
        fetch('http://localhost:3001/api/health')
          .then(response => {
            if (response.ok) {
              setIsAuthenticated(true)
            } else {
              localStorage.removeItem('authToken')
              setIsAuthenticated(false)
            }
          })
          .catch(() => {
            localStorage.removeItem('authToken')
            setIsAuthenticated(false)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <Providers>
      <Router>
        <div className={styles.app}>
          <Switch>
            {!isAuthenticated ? (
              <>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="*" component={LoginPage} />
              </>
            ) : (
              <>
                <Route path="/" component={DashboardPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="*" component={DashboardPage} />
              </>
            )}
          </Switch>
        </div>
      </Router>
    </Providers>
  )
}

export default App
