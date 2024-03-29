import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Vacation } from '@/types/Vacation';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ScrollArea } from './ui/scroll-area';
import { VacationForm, VacationFormValues } from './vacation-form';

interface NewVacationCardProps {
  onVacationCreated: (content: Vacation) => void;
}

export function NewVacationCard({ onVacationCreated }: NewVacationCardProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onSubmit = (values: VacationFormValues) => {
    setIsSaving(true);
    try {
      onVacationCreated(values);
      toast.success(`New plan ${values.title} created successfully!`);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create new plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex flex-col text-left rounded-md bg-slate-700 gap-2 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-100'>
          Add new vacation plan
        </span>
        <p className='text-sm leading-6 text-slate-200'>
          Start planning your next adventure today.
        </p>
      </DialogTrigger>
      <DialogContent>
        <AlertDialogHeader className='text-left'>
          <DialogTitle>New vacation plan</DialogTitle>
          <DialogDescription>
            Create a personalized itinerary for your next trip. Click save when
            you're done.
          </DialogDescription>
        </AlertDialogHeader>

        <fieldset disabled={isSaving} className='group'>
          {isDesktop ? (
            <ScrollArea className='h-auto md:h-72 w-full'>
              <VacationForm onSubmit={onSubmit} />
            </ScrollArea>
          ) : (
            <VacationForm onSubmit={onSubmit} />
          )}

          <DialogFooter className='px-4 mb-4 md:mb-0 md:px-0 gap-2 sm:items-end'>
            <DialogClose asChild>
              <Button variant='ghost'>Cancel</Button>
            </DialogClose>
            <Button
              form='hook-form'
              type='submit'
              className='mt-4 inline-flex items-center justify-center group-disabled:pointer-events-none'
            >
              <LoaderCircle className='absolute animate-spin group-enabled:opacity-0' />
              <span className='group-disabled:opacity-0'>Save changes</span>
            </Button>
          </DialogFooter>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
