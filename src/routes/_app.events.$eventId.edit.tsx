import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2 } from 'lucide-react'

import type { CreateEventValues } from '@/features/events/event.schemas'
import { eventsApi } from '@/api/events'
import { eventKeys } from '@/features/events/events.keys'
import { CreateEventForm } from '@/features/events/components/CreateEventForm'
import { useUpdateEvent } from '@/features/events/hooks/useUpdateEvent'
import { EventStatusCard } from '@/features/events/components/EventStatusCard.tsx'

export const Route = createFileRoute('/_app/events/$eventId/edit')({
  component: EditEventPage,
  loader: ({ context: { queryClient }, params }) => {
    const eventId = Number(params.eventId)
    return queryClient.ensureQueryData({
      queryKey: eventKeys.detail(eventId),
      queryFn: () => eventsApi.getById(eventId),
    })
  },
})

function EditEventPage() {
  const { eventId } = useParams({ from: '/_app/events/$eventId/edit' })
  const id = Number(eventId)

  // Fetch Existing Data
  const { data: event, isLoading } = useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.getById(id),
  })

  // Mutation Hook
  const { mutate: updateEvent, isPending: isSaving } = useUpdateEvent(id)

  if (isLoading || !event) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  // Initial Data
  const initialData: CreateEventValues = {
    title: event.title,
    description: event.description,
    location: event.location,
    price: event.price,
    totalSeats: event.totalSeats,
    startDate: event.startDate.slice(0, 16),
    endDate: event.endDate.slice(0, 16),
    organizerEmail: event.organizerName,
    createdBy: String(event.organizerId),
  }

  // 4. Handle Submit
  const handleSubmit = (data: CreateEventValues) => {
    // Add seconds back for the API
    const payload = {
      ...data,
      startDate:
        data.startDate.length === 16 ? `${data.startDate}:00` : data.startDate,
      endDate: data.endDate.length === 16 ? `${data.endDate}:00` : data.endDate,
    }
    updateEvent(payload)
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 space-y-2">
        <Link
          to="/events"
          className="text-sm text-slate-400 hover:text-blue-400 flex items-center gap-1 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to My Events
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Edit Event
        </h1>
        <p className="text-slate-400">Update the details of your event.</p>
      </div>
      <EventStatusCard eventId={event.id} currentStatus={event.status} />
      <CreateEventForm
        onSubmit={handleSubmit}
        isPending={isSaving}
        organizerEmail={event.organizerName}
        createdBy={String(event.organizerId)}
        initialData={initialData}
      />
    </div>
  )
}
