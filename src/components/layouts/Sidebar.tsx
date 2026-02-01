import { Link, useLocation } from '@tanstack/react-router'
import {
  CalendarDays,
  Hexagon,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Events', href: '/events', icon: CalendarDays },
  { label: 'Bookings', href: '/bookings', icon: Ticket },
  // We can hide/show these based on role later
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export const Sidebar = () => {
  const pathname = useLocation({ select: (location) => location.pathname })
  const logout = useAuthStore((state) => state.logout)

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 lg:flex fixed left-0 top-0">
      {/* Logo Area */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6 gap-2">
        <Hexagon className="h-6 w-6 text-blue-500 fill-blue-500" />
        <span className="text-lg font-bold tracking-tight">EventHive</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="border-t border-slate-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}