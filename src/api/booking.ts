import { api } from './axios'
import type { BookingDTO, CreateBookingRequest } from '@/types/booking.type.ts'
import type { PageResponse } from '@/types/common.type.ts'

export const bookingsApi = {
  create: async (data: CreateBookingRequest) => {
    const response = await api.post<BookingDTO>('/bookings', data)
    return response.data
  },

  getMyBookings: async () => {
    const response = await api.get<PageResponse<BookingDTO>>('/bookings')
    return response.data
  },
}
