import logo from '@/assets/logo.png';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchValue: string;
  onSearchValue: (searchValue: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ searchValue, onSearchValue }: HeaderProps) {
  return (
    <header className='flex flex-col gap-4 w-full'>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        <div className='w-full flex items-center gap-4'>
          <img
            src={logo}
            alt='Palm Logo'
            width={50}
            height={50}
            className='rounded-full object-cover'
          />
          <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Vacation Planner
          </h1>
        </div>

        <form className='w-full flex gap-2 items-center'>
          <Input
            placeholder='Search into your plans...'
            className='bg-transparent tracking-tight outline-none'
            endIcon={Search}
            value={searchValue}
            onChange={onSearchValue}
          />
        </form>
      </div>
      <div className='h-px bg-slate-700'></div>
    </header>
  );
}
