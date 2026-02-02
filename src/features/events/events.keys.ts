import type { EventFilters } from '@/types/event.type.ts'


export const eventKeys = {
  all: ['events'] as const,

  // Lists
  lists: () => [...eventKeys.all, 'list'] as const,
  public: (filters: EventFilters, page: number) =>
    [...eventKeys.lists(), 'public', filters, { page }] as const,
  mine: (page: number) => [...eventKeys.lists(), 'mine', { page }] as const,

  // Details
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
}
