import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useThemeEffect } from '@/hooks/useThemeEffect'
import { DashboardPage } from '@/features/pizza/dashboard/DashboardPage'
import { BuilderPage } from '@/features/pizza/builder/BuilderPage'

const App = () => {
  useThemeEffect()

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
