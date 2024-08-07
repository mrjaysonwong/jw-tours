import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Custom404Page } from '@/app/components/custom/error/404';
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
        return <Custom404Page />;
    }
  };

  return (
    <MainContainer
      sx={{
        mt: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {renderLegalComponent(slug)}
    </MainContainer>
  );
}
