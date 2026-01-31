export interface BookingDTO {
  id: number
  bookingReference: string
  ticketsCount: number
  totalPrice: number
  status: 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED'
  eventTitle: string
  eventDate: string
  bookingDate: string
}

export interface CreateBookingRequest {
  eventId: number
  ticketsCount: number
}
