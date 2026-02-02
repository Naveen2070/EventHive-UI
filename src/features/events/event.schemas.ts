import * as z from 'zod'

export const createEventSchema = z
  .object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z
      .string()
      .min(20, 'Description must be at least 20 characters'),
    location: z.string().min(3, 'Location is required'),

    price: z.coerce.number().min(0, 'Price cannot be negative'),
    totalSeats: z.coerce.number().min(1, 'Must have at least 1 seat'),

    startDate: z.string().refine((val) => new Date(val) > new Date(), {
      message: 'Start date must be in the future',
    }),
    endDate: z.string(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
  })

export type CreateEventValues = z.infer<typeof createEventSchema>
