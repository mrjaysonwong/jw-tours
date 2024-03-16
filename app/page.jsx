import { auth } from '@/auth';
import Home from './components/home/Home';

export default async function HomePage() {
  const user = await auth();

  return (
    <>
      <Home user={user} />
    </>
  );
}
