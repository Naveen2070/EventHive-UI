import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Sidebar } from '@/components/layouts/Sidebar'
import { useAuthStore } from '@/store/auth.store'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: ({ location }) => {
    const path = location.pathname
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated && path !== '/login' && path !== '/register') {
      toast.error('You are not authenticated')
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar is fixed on the left */}
      <Sidebar />

      {/* Main Content Area (pushes over 64 units to make room for sidebar) */}
      <main className="lg:pl-64 min-h-screen transition-all duration-300 ease-in-out">
        {/* We can add a top header here later for mobile hamburger menu */}
        <div className="container py-8 px-6 lg:px-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
