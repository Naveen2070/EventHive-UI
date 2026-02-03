import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { isPast as checkIsPast, format } from 'date-fns'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Copy,
  History,
  MapPin,
  QrCode,
  Ticket,
} from 'lucide-react'
import { toast } from 'sonner'

import { TicketQRDialog } from './TicketQRDialog'
import type { BookingDTO } from '@/types/booking.type'
import { getBookingStatusStyles } from '@/features/bookings/utils/status.utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BookingStatus } from '@/types/enum'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'

interface TicketCardProps {
  booking: BookingDTO
}

export const TicketCard = ({ booking }: TicketCardProps) => {
  const isExpired = checkIsPast(new Date(booking.eventDate))
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  // 1. Get Styles from Utility
  const styles = getBookingStatusStyles(booking.status)
  const StatusIcon = styles.icon

  const opacityClass = isExpired
    ? 'opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'
    : 'opacity-100'

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(booking.bookingReference)
    setCopied(true)
    toast.success('Booking reference copied')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Card
        className={`group relative flex flex-col md:flex-row bg-slate-950 border-slate-800 border-l-[6px] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${styles.border} ${styles.glow} ${opacityClass}`}
      >
        {/* LEFT SECTION: Info */}
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-between items-start">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopyId}
                    className="group/id flex items-center gap-2 font-mono text-[10px] text-slate-500 border border-slate-800 rounded px-2 py-1 hover:bg-slate-900 transition-colors cursor-copy"
                  >
                    #{booking.bookingReference.slice(-8)}..
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover/id:opacity-100 transition-opacity" />
                    )}
                  </button>
                </TooltipTrigger>

                {/* The Full Reference on Hover */}
                <TooltipContent className="bg-slate-900 border-slate-800 text-slate-200 font-mono text-xs">
                  <p>
                    Ticket Ref:{' '}
                    <span className="text-white font-bold">
                      {booking.bookingReference}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Click to copy
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${styles.badge}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{styles.label}</span>
            </div>
          </div>

          <div>
            <Link
              to="/events/$eventId"
              params={{ eventId: booking.eventId.toString() }}
              className="hover:underline decoration-blue-500 underline-offset-4"
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {booking.eventTitle}
              </h3>
            </Link>
            {isExpired && (
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 block">
                Event Ended
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-slate-900 rounded-md">
                <CalendarDays className="h-4 w-4 text-blue-500" />
              </div>
              <span>{format(new Date(booking.eventDate), 'PPP p')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-slate-900 rounded-md">
                <MapPin className="h-4 w-4 text-blue-500" />
              </div>
              <span className="line-clamp-1">{booking.eventLocation}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px bg-slate-800 my-4" />
        <Separator className="md:hidden bg-slate-800" />

        {/* RIGHT SECTION: Actions */}
        <div className="w-full md:w-64 p-6 bg-slate-900/20 flex flex-col justify-between gap-4">
          <div className="flex justify-between md:flex-col md:gap-1">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Tickets
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Ticket className="h-4 w-4 text-slate-400" />
                <span>
                  {booking.ticketsCount}{' '}
                  <span className="text-slate-500 text-xs ml-1">x General</span>
                </span>
              </div>
            </div>
            <div className="text-right md:text-left md:mt-2">
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Total Paid
              </span>
              <div className="text-xl font-bold text-white">
                ${booking.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-2">
            {isExpired ? (
              <Button
                variant="ghost"
                disabled
                className="w-full justify-start text-slate-500 hover:text-slate-500 hover:bg-transparent pl-0"
              >
                <History className="h-4 w-4 mr-2" /> View Receipt
              </Button>
            ) : booking.status === BookingStatus.CONFIRMED ? (
              <Button
                onClick={() => setShowQR(true)}
                className="w-full bg-slate-100 hover:bg-white text-slate-900 font-semibold shadow-lg shadow-blue-900/10"
              >
                <QrCode className="h-4 w-4 mr-2" /> View Ticket
              </Button>
            ) : booking.status === BookingStatus.PENDING ? (
              <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-lg shadow-amber-900/20">
                Complete Payment <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled
                className="w-full border-slate-800 text-slate-500"
              >
                Unavailable
              </Button>
            )}
          </div>
        </div>
      </Card>

      <TicketQRDialog
        booking={booking}
        isOpen={showQR}
        onOpenChange={setShowQR}
      />
    </>
  )
}
