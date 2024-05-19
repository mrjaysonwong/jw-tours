import { Custom404Page } from './components/custom/error/404';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <>
      <Custom404Page />
    </>
  );
}
