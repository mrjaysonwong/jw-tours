import Welcome from './components/Welcome';
import { sleep } from '@/utils/common';

export default async function Header() {
  await sleep(1000);

  return (
    <>
      <Welcome />
    </>
  );
}
