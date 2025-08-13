import { Router, Route } from 'wouter'
import { Providers } from '@/shared/config/providers'
import { DashboardPage } from '@/pages'
import styles from './App.module.scss'
import './index.css'

function App() {
  return (
    <Providers>
      <Router>
        <div className={styles.app}>
          <Route path="/" component={DashboardPage} />
          {/* Добавьте другие маршруты здесь */}
        </div>
      </Router>
    </Providers>
  )
}

export default App
