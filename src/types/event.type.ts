import type { EventStatus } from '@/types/enum'

/* =========================
   Ticket Tiers
========================= */

export interface TicketTierDTO {
  id: number
  name: string
  price: number
  totalAllocation: number
  availableAllocation: number
  validFrom: string
  validUntil: string
}

export interface CreateTicketTierRequest {
  name: string
  price: number
  totalAllocation: number
  validFrom: string
  validUntil: string
}

export interface UpdateTicketTierRequest {
  name?: string
  price?: number
  totalAllocation?: number
  validFrom?: string
  validUntil?: string
}

/* =========================
   Events
========================= */

export interface EventDTO {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  ticketTiers: Array<TicketTierDTO>
  priceRange: string
  status: EventStatus
  organizerId: number
  organizerName: string
  createdAt: string
}

export interface CreateEventRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  ticketTiers: Array<CreateTicketTierRequest>
  organizerEmail: string
  createdBy: number
}

export interface UpdateEventRequest {
  title?: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
}

export interface ChangeEventStatusRequest {
  status: EventStatus
}

/* =========================
   Filters
========================= */

export interface EventFilters {
  title?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  startDate?: string
  endDate?: string
  status?: EventStatus | string
}
