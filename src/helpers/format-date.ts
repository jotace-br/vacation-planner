import { format } from 'date-fns';

export function formatDate(
  dateString: Date | string | null,
  formatString = 'MMMM d, yyyy'
) {
  if (dateString) {
    const inputDate = new Date(dateString);

    if (!isNaN(inputDate.getTime())) {
      const formattedDate = format(inputDate, formatString);
      return formattedDate;
    }
  }

  return '';
}
