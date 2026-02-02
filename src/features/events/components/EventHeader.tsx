import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EventHeaderProps {
  isOrganizer: boolean
}

export const EventHeader = ({ isOrganizer }: EventHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          {isOrganizer ? 'Event Management' : 'Discover Events'}
        </h1>
        <p className="text-slate-400 mt-1">
          {isOrganizer
            ? 'Manage your drafts and ticket sales.'
            : 'Browse the latest conferences, workshops, and meetups.'}
        </p>
      </div>

      {isOrganizer && (
        // <Link to="/events/create">
          <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 shadow-lg shadow-blue-900/20">
            <Plus className="h-4 w-4" /> Create Event
          </Button>
        </Link>
      )}
    </div>
  )
}
