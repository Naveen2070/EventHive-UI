export interface RevenueChartPoint {
  date: string
  revenue: number
}

export interface RecentSale {
  id: number
  eventName: string
  customerName: string
  customerEmail: string
  tickets: number
  amount: number
  date: string
  status: 'CONFIRMED' | 'PENDING' | 'REFUNDED'
}

export interface DashboardStatsDTO {
  totalRevenue: number
  totalTicketsSold: number
  activeEvents: number
  totalEvents: number
  revenueTrend: Array<RevenueChartPoint>
  recentSales: Array<RecentSale>
}
