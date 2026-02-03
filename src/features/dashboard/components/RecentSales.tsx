import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RecentSale } from '@/types/dashboard.type'

export const RecentSales = ({ sales }: { sales: RecentSale[] }) => {
  return (
    <Card className="col-span-3 bg-slate-950 border-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-100">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                {/* Random avatar based on name using ui-avatars.com */}
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${sale.customerName}&background=0D8ABC&color=fff`}
                  alt="Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-slate-100">
                  {sale.customerName}
                </p>
                <p className="text-xs text-slate-500">
                  bought {sale.tickets} ticket(s) for{' '}
                  <span className="text-blue-400">{sale.eventName}</span>
                </p>
              </div>
              <div className="ml-auto font-medium text-emerald-500">
                +${sale.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
