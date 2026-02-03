import { createFileRoute } from '@tanstack/react-router'
import { Calendar, DollarSign, Ticket, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth.store'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})

function Dashboard() {
  const user = useAuthStore((state) => state.user)

  // Mock Data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1% from last month',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Tickets Sold',
      value: '+2350',
      change: '+180.1% from last month',
      icon: Ticket,
      color: 'text-blue-500',
    },
    {
      title: 'Active Events',
      value: '12',
      change: '+19% from last month',
      icon: Calendar,
      color: 'text-orange-500',
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      change: '-4% from last month',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.username || 'Commander'}! Here's what's
            happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for Recent Activity or Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-50 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-md bg-slate-50">
              Chart Placeholder (Install Recharts later)
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-slate-500">
              You made 265 sales this month.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Mock List Items */}
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
