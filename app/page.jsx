import { auth } from '@/auth';
import Home from './components/home/Home';

export default async function HomePage() {
  const session = await auth();


  return (
    <>
      <Home session={session} />
    </>
  );
}
