import { Loader2 } from 'lucide-react'
import { EventCard } from './EventCard'
import type { JSX } from 'react'
import type { EventDTO } from '@/types/event.type'

interface EventGridProps {
  isLoading: boolean
  data?: Array<EventDTO>
  emptyMessage: string
  isOwner?: boolean
}

/**
 * Renders a grid of event cards.
 *
 * @param {EventGridProps} props - The object containing the props for the EventGrid component.
 * @param {boolean} props.isLoading - Indicates if the data is still loading.
 * @param {Array<EventDTO>} [props.data] - The array of event data.
 * @param {string} props.emptyMessage - The message to display when there are no events.
 * @param {boolean} [props.isOwner] - Indicates if the user is the owner of the events.
 * @return {JSX.Element} The rendered event grid component.
 */
export const EventGrid = ({
  isLoading,
  data,
  emptyMessage,
  isOwner,
}: EventGridProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/50 text-slate-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((event) => (
        <EventCard key={event.id} event={event} isOwner={isOwner} />
      ))}
    </div>
  )
}
