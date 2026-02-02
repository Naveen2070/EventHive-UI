import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { eventsApi } from '@/api/events'
import { eventKeys } from '@/features/events/events.keys'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: eventsApi.create,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
      toast.success('Event created successfully')
      await navigate({ to: '/events' })
    },
    onError: (error) => {
      console.error({
        "feature": "useCreateEvent",
        "error": error
      })
      toast.error('Failed to create event. Please try again.')
    },
  })
}
