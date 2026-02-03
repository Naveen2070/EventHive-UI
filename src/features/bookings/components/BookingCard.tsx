import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AlertCircle, Loader2, Minus, Plus } from 'lucide-react'
import { useCreateBooking } from '../hooks/useCreateBooking'
import type { EventDTO } from '@/types/event.type'
import { useAuthStore } from '@/store/auth.store'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

interface BookingCardProps {
  event: EventDTO
}

export const BookingCard = ({ event }: BookingCardProps) => {
  const { user } = useAuthStore()
  const isOwner = user?.id === event.organizerId

  // State for Quantity
  const [quantity, setQuantity] = useState(1)
  const maxTicketsPerOrder = 5

  // Hook Integration
  const { mutate: bookTicket, isPending } = useCreateBooking(event.id)

  // Logic
  const isSoldOut = event.availableSeats === 0
  const isPast = new Date(event.startDate) < new Date()
  const percentageSold =
    ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100

  const totalPrice = event.price * quantity

  const handleBook = () => {
    bookTicket({ eventId: event.id, ticketsCount:quantity })
  }

  // Helper to adjust quantity safely
  const updateQuantity = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta
      if (next < 1) return 1
      if (next > maxTicketsPerOrder) return maxTicketsPerOrder
      if (next > event.availableSeats) return event.availableSeats
      return next
    })
  }

  return (
    <Card className="bg-slate-950 border-slate-800 shadow-xl shadow-black/40 overflow-hidden">
      <CardHeader className="pb-4 border-b border-slate-800 bg-slate-900/30">
        <CardTitle className="flex justify-between items-center">
          <span className="text-slate-400 font-medium text-sm">
            Total Price
          </span>
          <span className="text-2xl font-bold text-white">
            {totalPrice === 0 ? 'FREE' : `$${totalPrice.toFixed(2)}`}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Availability Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{event.availableSeats} seats remaining</span>
            <span>{Math.round(percentageSold)}% Sold</span>
          </div>
          <Progress
            value={percentageSold}
            className="h-2 bg-slate-800"
            indicatorClassName="bg-blue-500"
          />
        </div>

        {/* Quantity Selector (Only show if not sold out) */}
        {!isSoldOut && !isPast && !isOwner && (
          <div className="flex items-center justify-between bg-slate-900 rounded-lg p-3 border border-slate-800">
            <span className="text-sm text-slate-300">Tickets</span>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white"
                onClick={() => updateQuantity(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-mono text-lg font-bold text-white w-4 text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white"
                onClick={() => updateQuantity(1)}
                disabled={
                  quantity >= maxTicketsPerOrder ||
                  quantity >= event.availableSeats
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Date / Time Recap */}
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Ticket Type</span>
            <span>General Admission</span>
          </div>
          <Separator className="bg-slate-800" />
          <div className="flex justify-between">
            <span className="text-slate-500">Start Time</span>
            <span>
              {new Date(event.startDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {isSoldOut && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>This event is completely sold out.</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {isOwner ? (
          <Link
            to="/events/$eventId/edit"
            params={{ eventId: event.id.toString() }}
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Manage Event
            </Button>
          </Link>
        ) : (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 py-6 text-lg font-semibold"
            disabled={isSoldOut || isPast || isPending}
            onClick={handleBook}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
              </>
            ) : isSoldOut ? (
              'Sold Out'
            ) : isPast ? (
              'Event Ended'
            ) : (
              `Get ${quantity > 1 ? quantity : ''} Tickets`
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
