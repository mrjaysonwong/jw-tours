import { StyledContainer } from "@/components/styled/StyledContainers";
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ContactPage() {
  return (
    <StyledContainer>
      <h5>Contact Page</h5>
    </StyledContainer>
  );
}
