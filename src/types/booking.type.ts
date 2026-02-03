import type { BookingStatus } from '@/types/enum.ts'

export interface BookingDTO {
  bookingId: number
  bookingReference: string
  eventId: number
  eventTitle: string
  eventDescription: string
  eventDate: string
  eventLocation: string
  ticketsCount: number
  totalPrice: number
  status: BookingStatus
  bookedAt: string
}

export interface CreateBookingRequest {
  eventId: number
  ticketsCount: number
}
