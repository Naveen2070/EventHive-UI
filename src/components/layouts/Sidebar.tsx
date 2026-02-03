import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Ticket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import { UserRole } from '@/types/enum'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const isOrganizer = user?.role === UserRole.ORGANIZER

  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      show: isOrganizer,
    },
    {
      label: 'Events',
      href: '/events',
      icon: CalendarDays,
      show: true,
    },
    {
      label: 'My Tickets',
      href: '/bookings',
      icon: Ticket,
      show: !isOrganizer,
    },
    {
      label: 'Create Event',
      href: '/events/create',
      icon: PlusCircle,
      show: isOrganizer,
    },
  ]

  const handleLogout = async () => {
    logout()
    await navigate({ to: '/login' })
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 bg-slate-950 border-r border-slate-800 z-50">
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Ticket className="h-5 w-5 text-white" />
          </div>
          <span>EventHub</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu
        </div>

        {links
          .filter((link) => link.show)
          .map((link) => {
            const Icon = link.icon
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600/10 text-blue-500'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200',
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <span className="font-semibold text-slate-300">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">
              {user?.username}
            </p>
            <p className="text-xs text-slate-500 truncate capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        <div className="space-y-1">
          {/* Settings (Optional future feature) */}
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </div>
      </div>
    </aside>
  )
}
