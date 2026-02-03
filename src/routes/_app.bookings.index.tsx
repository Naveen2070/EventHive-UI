import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Calendar, History, Search, Ticket } from 'lucide-react'
import { isPast } from 'date-fns'


import { useMyBookings } from '@/features/bookings/hooks/useMyBookings'
import { TicketCard } from '@/features/bookings/components/TicketCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { bookingKeys } from '@/features/bookings/bookings.keys.ts'
import { bookingsApi } from '@/api/booking.ts'

export const Route = createFileRoute('/_app/bookings/')({
  component: MyBookingsPage,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: bookingKeys.mine(),
      queryFn: bookingsApi.getMyBookings,
    })
  },
})

function MyBookingsPage() {
  const { data: bookingsData, isLoading } = useMyBookings()
  const bookings = bookingsData?.content
  // Default to 'upcoming' tab
  const [activeTab, setActiveTab] = useState('upcoming')

  if (isLoading) return <BookingsSkeleton />

  if (!bookings || bookings.length === 0) return <EmptyState />

  // Filter Logic
  const upcomingBookings = bookings.filter(
    (b) => !isPast(new Date(b.eventDate)),
  )
  const pastBookings = bookings.filter((b) => isPast(new Date(b.eventDate)))

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            My Tickets
          </h1>
          <p className="text-slate-400">View and manage your event passes.</p>
        </div>
        <div className="flex gap-2 text-sm text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-emerald-400 font-medium">
            {upcomingBookings.length} Active
          </span>
          <span>•</span>
          <span>{bookings.length} Total</span>
        </div>
      </div>

      {/* TABS Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800 p-1">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4 mr-2" /> Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
          >
            <History className="h-4 w-4 mr-2" /> Past Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <TicketCard key={booking.bookingReference} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
              <p className="text-slate-500">No upcoming events.</p>
              <Link
                to="/events"
                className="text-blue-500 hover:underline text-sm"
              >
                Browse new events
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6 space-y-6">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <TicketCard key={booking.bookingReference} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No booking history available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center">
        <Ticket className="h-8 w-8 text-slate-500" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-white">No tickets yet</h3>
        <p className="text-slate-400 max-w-sm">
          You haven't purchased any tickets. Browse events to find your next
          experience.
        </p>
      </div>
      <Link to="/events">
        <Button className="mt-4 bg-blue-600 hover:bg-blue-500">
          <Search className="mr-2 h-4 w-4" /> Browse Events
        </Button>
      </Link>
    </div>
  )
}

function BookingsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="h-8 w-48 bg-slate-900 rounded mb-8" />
      <Skeleton className="h-40 w-full rounded-xl bg-slate-900" />
      <Skeleton className="h-40 w-full rounded-xl bg-slate-900" />
    </div>
  )
}
