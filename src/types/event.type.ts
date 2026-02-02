import type { EventStatus } from '@/types/enum.ts'

export interface EventDTO {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  price: number
  totalSeats: number
  availableSeats: number
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED'
  organizerName: string
}

export interface CreateEventRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  price: number
  totalSeats: number
}

export interface EventFilters {
  title?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  startDate?: string
  endDate?: string
  status?: EventStatus | string
}