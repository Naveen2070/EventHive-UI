import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { eventsApi } from '@/api/events'
import { eventKeys } from '@/features/events/events.keys'
import type { CreateEventValues } from '../event.schemas'
import { toast } from 'sonner'

export const useUpdateEvent = (eventId: number) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateEventValues) => eventsApi.update(eventId, data),
    onSuccess: async() => {
      // Invalidate specific event AND lists
      await queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) })
      await queryClient.invalidateQueries({ queryKey: eventKeys.lists() })

      toast.success('Event updated successfully')

      await navigate({ to: '/events' })
    },
    onError: () => {
      toast.error('Failed to update event')
    },
  })
}
