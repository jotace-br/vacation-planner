import { format } from 'date-fns';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <h1 className='text-3xl font-bold underline'>Hello world (tailwind)!</h1>
      <Camera color='red' size={48} />
      <Toaster />
      <button onClick={() => toast('My first toast')}>Give me a toast</button>
      <p>{format(new Date(), "'Today is' eeee")}</p>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
