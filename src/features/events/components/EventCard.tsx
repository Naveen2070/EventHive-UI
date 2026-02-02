import { CalendarDays, Edit, MapPin, Trash2, User } from 'lucide-react'
import { format } from 'date-fns'
import type { EventDTO } from '@/types/event.type.ts'
import { useAuthStore } from '@/store/auth.store.ts'
import { EventStatus, UserRole } from '@/types/enum.ts'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'


interface EventCardProps {
  event: EventDTO
  isOwner?: boolean
}

export const EventCard = ({ event, isOwner }: EventCardProps) => {
  const { user } = useAuthStore()
  const isAdmin = user?.role === UserRole.ADMIN

  const getStatusColor = (status: string) => {
    switch (status) {
      case EventStatus.PUBLISHED:
        return 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20'
      case EventStatus.DRAFT:
        return 'bg-amber-500/15 text-amber-500 border-amber-500/20'
      case EventStatus.CANCELLED:
        return 'bg-red-500/15 text-red-500 border-red-500/20'
      case EventStatus.COMPLETED:
        return 'bg-slate-500/15 text-slate-500 border-slate-500/20'
      default:
        return 'bg-slate-800 text-slate-400'
    }
  }

  return (
    <Card className="flex flex-col h-full bg-slate-950 border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-md hover:shadow-blue-900/20">
      {/* Hero Section (Image Placeholder) */}
      <div className="h-32 w-full bg-slate-900 relative border-b border-slate-800 group-hover:bg-slate-800/50 transition-colors">
        {/* Status Badge (Top Right) */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`${getStatusColor(event.status)} backdrop-blur-md`}
          >
            {event.status}
          </Badge>
        </div>

        {/* Price Badge (Bottom Left) */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className="bg-slate-950/80 backdrop-blur text-slate-200 border-slate-700"
          >
            {event.price > 0 ? `$${event.price.toFixed(2)}` : 'FREE'}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-5 pb-2">
        <h3 className="text-lg font-semibold text-slate-100 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
          <MapPin className="h-3.5 w-3.5 text-slate-500" />
          <span className="truncate">{event.location || 'Online Event'}</span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 flex-1 space-y-4">
        {/* Date & Organizer */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-blue-400">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-slate-200">
                {event.startDate
                  ? format(new Date(event.startDate), 'PPP')
                  : 'TBA'}
              </p>
              <p className="text-xs text-slate-500">
                {event.startDate
                  ? format(new Date(event.startDate), 'h:mm a')
                  : ''}
              </p>
            </div>
          </div>

          {!isOwner && (
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <span className="text-xs">
                By {event.organizerName || 'Unknown Organizer'}
              </span>
            </div>
          )}
        </div>

        {/* Seat Availability Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Availability</span>
            <span>
              {event.availableSeats} / {event.totalSeats}
            </span>
          </div>
          {/* Simple Progress Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{
                width: `${(event.availableSeats / event.totalSeats) * 100}%`,
              }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 gap-2">
        {isOwner || isAdmin ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              <Edit className="h-3.5 w-3.5 mr-2" /> Manage
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:bg-red-950/30 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-red-950 border-red-900 text-red-200">
                  Delete Event
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <Button
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
          >
            Book Ticket
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
