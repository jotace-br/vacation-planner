import { Vacation } from '@/types/Vacation';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import { CalendarIcon, Pin, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(1000, { message: 'Description must be at most 1000 characters.' }),
  vacation_period: z
    .object(
      {
        from: z.date().nullable(),
        to: z.date().nullable(),
      },
      { required_error: 'Date is required.' }
    )
    .refine((date) => !!date.from, 'Date is required.')
    .refine((date) => date.from || date.to, 'Vacation period must be filled.')
    .refine((date) => date.from && date.to, 'Vacation period must be inserted.')
    .refine(
      (date) => date.from && date.to && date.from <= date.to,
      'Start date must be before or equal to end date.'
    )
    .refine(
      (date) => date.from && date.from > addDays(new Date(), -1),
      'Start date must be in the future'
    ),
  location: z.string().min(1, { message: 'Location is required.' }),
  participants: z.coerce.number().optional(),
});

export type VacationFormValues = z.infer<typeof formSchema>;

interface VacationFormProps {
  vacation?: Vacation;
  onSubmit: (data: VacationFormValues) => void;
}

export function VacationForm({
  vacation = {
    location: '',
    title: '',
    description: '',
    vacation_period: {
      from: null,
      to: null,
    },
    participants: 0,
  },
  onSubmit,
}: VacationFormProps) {
  const defaultValues = {
    title: vacation.title,
    description: vacation.description,
    vacation_period: {
      from: vacation.vacation_period.from,
      to: vacation.vacation_period.to,
    },
    location: vacation.location,
    participants: vacation.participants,
  };

  const form = useForm<VacationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        id='hook-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='p-4 sm:p-0 space-y-4 md:pr-4 group-disabled:opacity-50'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Your vacation title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Type your description here.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='vacation_period'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Starting date / Ending date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id='date'
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value.from && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='range'
                      defaultMonth={field.value.from ?? undefined}
                      selected={{
                        from: field.value.from!,
                        to: field.value.to || undefined,
                      }}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  startIcon={Pin}
                  placeholder='Insert your location'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='participants'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  startIcon={Users}
                  placeholder='Insert how many participants'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
