import { useState } from 'react';
import { toast } from 'sonner';
import { NewVacationCard } from './components/new-vacation-card';
import { VacationCard } from './components/vacation-card';
import { Header } from './containers/header';
import { Vacation } from './types/Vacation';

function App() {
  const [search, setSearch] = useState('');
  const [vacations, setVacations] = useState<Vacation[]>(() => {
    if (localStorage.getItem('vacations')) {
      return JSON.parse(localStorage.getItem('vacations')!);
    }

    return [];
  });

  function onVacationCreated(content: Vacation) {
    const newNote: Vacation = {
      id: crypto.randomUUID(),
      created_at: new Date(),
      ...content,
    };

    const vacationsArray = [newNote, ...vacations];

    setVacations(vacationsArray);
    localStorage.setItem('vacations', JSON.stringify(vacationsArray));
  }

  function onVacationUpdated(content: Vacation) {
    const editedVacations = vacations.map((vacation) => {
      if (vacation.id === content.id) {
        return {
          ...vacation,
          ...content,
        };
      }

      return vacation;
    });

    setVacations(editedVacations);
    localStorage.setItem('vacations', JSON.stringify(editedVacations));
  }

  function onVacationDeleted(id: string) {
    if (id) {
      const notesArray = vacations.filter((vacation) => vacation.id !== id);
      setVacations(notesArray);

      toast.success('Vacation deleted successfully!');
      localStorage.setItem('vacations', JSON.stringify(notesArray));
    }

    toast.error('An error occurred while deleting the vacation.');
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const filteredVacations =
    search !== ''
      ? vacations.filter((vacation) =>
          vacation.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : vacations;

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <Header searchValue={search} onSearchValue={handleSearch} />

      <section className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewVacationCard onVacationCreated={onVacationCreated} />

        {filteredVacations.map((vacation) => (
          <VacationCard
            key={vacation.id}
            vacation={vacation}
            onVacationDeleted={onVacationDeleted}
            onVacationUpdated={onVacationUpdated}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
