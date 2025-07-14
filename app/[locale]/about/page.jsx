import { StyledContainer } from '@/components/styled/StyledContainers';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return (
    <StyledContainer>
      <h5>About Page</h5>
    </StyledContainer>
  );
}
