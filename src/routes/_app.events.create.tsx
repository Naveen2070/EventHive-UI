import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import type { CreateEventValues } from '@/features/events/event.schemas'
import { useCreateEvent } from '@/features/events/hooks/useCreateEvent'
import { CreateEventForm } from '@/features/events/components/CreateEventForm'
import { useAuthStore } from '@/store/auth.store.ts'

export const Route = createFileRoute('/_app/events/create')({
  component: CreateEventPage,
})

function CreateEventPage() {
  const { mutate: createEvent, isPending } = useCreateEvent()
  const { user } = useAuthStore()

  const handleSubmit = (data: CreateEventValues) => {
    const payload = {
      ...data,
      startDate:
        data.startDate.length === 16 ? `${data.startDate}:00` : data.startDate,
      endDate: data.endDate.length === 16 ? `${data.endDate}:00` : data.endDate,
    }
    createEvent(payload)
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Page Header */}
      <div className="mb-8 space-y-2">
        <Link
          to="/events"
          className="text-sm text-slate-400 hover:text-blue-400 flex items-center gap-1 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create New Event
        </h1>
        <p className="text-slate-400">
          Fill in the details to publish your event to the hive.
        </p>
      </div>

      <CreateEventForm
        onSubmit={handleSubmit}
        isPending={isPending}
        organizerEmail={user!.email}
        createdBy={String(user!.id)}
      />
    </div>
  )
}
