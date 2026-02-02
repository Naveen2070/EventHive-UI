import { api } from './axios'

import type {
  CreateEventRequest,
  EventDTO,
  EventFilters,
} from '@/types/event.type.ts'
import type { PageResponse } from '@/types/common.type.ts'

export const eventsApi = {
  // Public Feed with Full Filtering
  getAll: async (page = 0, size = 10, filters?: EventFilters) => {
    const params = {
      page,
      size,
      sort: 'startDate,asc',
      ...filters,
    }

    const response = await api.get<PageResponse<EventDTO>>('/events', {
      params,
    })
    return response.data
  },

  // Organizer/Admin Feed
  getMyEvents: async (page = 0, size = 10) => {
    const response = await api.get<PageResponse<EventDTO>>(
      '/events/organizer',
      {
        params: { page, size },
      },
    )
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<EventDTO>(`/events/${id}`)
    return response.data
  },

  create: async (data: CreateEventRequest) => {
    const response = await api.post<EventDTO>('/events', data)
    return response.data
  },

  update: async (id: number, data: CreateEventRequest) => {
    const response = await api.put<EventDTO>(`/events/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/events/${id}`)
  },
}
