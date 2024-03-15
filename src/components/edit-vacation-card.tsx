import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Vacation } from '@/types/Vacation';
import { LoaderCircle } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { ResponsiveDrawer } from './ui/responsive-drawer';
import { VacationForm, VacationFormValues } from './vacation-form';

interface EditVacationCardProps {
  vacation: Vacation;
  onVacationUpdated: (content: Vacation) => void;
}

export const EditVacationCard = forwardRef<
  HTMLDivElement,
  EditVacationCardProps
>(({ vacation, onVacationUpdated }, ref) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = (values: VacationFormValues) => {
    setIsSaving(true);
    try {
      onVacationUpdated({ ...vacation, ...values });
      toast.success(`Plan ${vacation.title} edited successfully!`);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to edit your plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      trigger={
        <DialogTrigger asChild>
          <DropdownMenuItem
            ref={ref}
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
      }
      drawerProps={{
        title: 'Edit vacation plan',
        description: 'Edit your vacation plan and save changes.',
        children: (
          <fieldset disabled={isSaving} className='group'>
            <ScrollArea className='h-[100%] md:h-72 w-full'>
              <VacationForm vacation={vacation} onSubmit={onSubmit} />
            </ScrollArea>

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
        ),
      }}
    />
  );
});
