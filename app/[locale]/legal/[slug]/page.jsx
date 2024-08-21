import { redirect } from '@/navigation';
import { notFound } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { formatMetadata } from '@/utils/helper/formats/formatMetadata';
import TermsOfUse from '../components/UserAgreement';
import PrivacyPolicy from '../components/PrivacyPolicy';

export function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default function LegalPage({ params }) {
  const { slug } = params;

  const renderLegalComponent = () => {
    switch (slug) {
      case 'user-agreement':
        return <TermsOfUse />;

      case 'privacy-policy':
        return <PrivacyPolicy />;

      default:
        redirect(notFound());
    }
  };

  return (
    <MainContainer
      sx={{ width: 'clamp(min(95vw, 600px), 50%, max(70vw, 600px ))' }}
    >
      {renderLegalComponent(slug)}
    </MainContainer>
  );
}
