import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, DollarSign, Loader2, MapPin, Users } from 'lucide-react'

import { createEventSchema } from '../event.schemas'
import type { CreateEventValues } from '../event.schemas'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CreateEventFormProps {
  onSubmit: (data: CreateEventValues) => void
  isPending: boolean
  organizerEmail: string
  createdBy: string
  initialData?: CreateEventValues
}

export const CreateEventForm = ({
  onSubmit,
  isPending,
  organizerEmail,
  createdBy,
  initialData,
}: CreateEventFormProps) => {
  const isEditMode = !!initialData

  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema as any),
    defaultValues: initialData || {
      title: '',
      description: '',
      location: '',
      price: 0,
      totalSeats: 100,
      startDate: '',
      endDate: '',
      organizerEmail,
      createdBy,
    },
  })

  // Shared Styles
  const inputStyles =
    'bg-slate-900 border-slate-800 focus-visible:ring-blue-500/50 text-slate-100 placeholder:text-slate-500'

  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Tech Conference 2026"
                    {...field}
                    className={inputStyles}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell people what this event is about..."
                    className={`${inputStyles} min-h-30 resize-none`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Location</FormLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    className={`${inputStyles} pl-9`}
                    placeholder="New York, NY"
                    {...field}
                  />
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Start Date</FormLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="datetime-local"
                      className={`${inputStyles} pl-9 pr-4`}
                      {...field}
                    />
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">End Date</FormLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="datetime-local"
                      className={`${inputStyles} pl-9 pr-4`}
                      {...field}
                    />
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Price & Seats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">
                    Ticket Price ($)
                  </FormLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="number"
                      step="0.01"
                      className={`${inputStyles} pl-9`}
                      {...field}
                    />
                  </div>
                  <FormDescription className="text-xs text-slate-500">
                    Set to 0 for free events.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Total Seats</FormLabel>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="number"
                      className={`${inputStyles} pl-9`}
                      {...field}
                    />
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Actions Footer */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-800">
            <Link to="/events">
              <Button
                type="button"
                variant="ghost"
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-500 text-white min-w-35 shadow-lg shadow-blue-900/20"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditMode ? (
                'Update Event'
              ) : (
                'Create Event'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
