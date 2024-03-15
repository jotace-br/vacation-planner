import { calculateDistanceFromNow } from '@/helpers/calculate-distance-from-now';
import { formatDate } from '@/helpers/format-date';
import { textToLowerKebabCase } from '@/helpers/text-to-lower-kebab-case';
import { Vacation } from '@/types/Vacation';
import { EllipsisVertical } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import { DeleteVacationAlert } from './delete-vacation-alert';
import { EditVacationCard } from './edit-vacation-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface VacationCardProps {
  vacation: Vacation;
  onVacationDeleted: (id: string) => void;
  onVacationUpdated: (content: Vacation) => void;
}

export function VacationCard({
  vacation,
  onVacationDeleted,
  onVacationUpdated,
}: VacationCardProps) {
  const { toPDF, targetRef } = usePDF({
    filename: textToLowerKebabCase(vacation.title + ' ' + vacation.location),
  });

  return (
    <>
      <Card
        ref={targetRef}
        className='-m-1 flex flex-col rounded-md bg-slate-700 gap-2 overflow-hidden relative outline-none focus-visible:ring-2 focus-visible:ring-lime-400'
      >
        <div className='absolute right-4 top-6'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <EditVacationCard
                  vacation={vacation}
                  onVacationUpdated={onVacationUpdated}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteVacationAlert
                  id={vacation.id}
                  onVacationDeleted={onVacationDeleted}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toPDF()}>
                Generate PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardHeader>
          <CardTitle className='font-medium first-letter:capitalize'>
            {vacation.title}
            <span className='text-sm ml-1 text-slate-400 font-normal'>
              ({calculateDistanceFromNow(vacation?.created_at || new Date())})
            </span>
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CardDescription className='text-sm text-slate-400 break-all whitespace-normal line-clamp-2 float-left'>
                  {vacation.description}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent>
                <p className='w-72 [overflow-wrap:anywhere]'>
                  {vacation.description}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          {/* <img
           src={vacation.image}
           alt={vacation.title}
           className='w-full rounded-lg object-cover h-60 sm:h-64'
         /> */}

          <div className='flex items-center gap-1'>
            <p className='font-medium text-slate-100 first-letter:capitalize'>
              {vacation.location}
            </p>
          </div>
          <p className='font-thin'>
            {formatDate(vacation?.vacation_period?.from || '')} →{' '}
            {formatDate(vacation?.vacation_period?.to || '')}
          </p>
        </CardContent>
        <CardFooter>
          {!!vacation.participants && (
            <p>Participants: {vacation.participants}</p>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
