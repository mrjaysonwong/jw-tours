import Image from 'next/image';

// internal imports
import { StyledHeroHeader } from '../styled/StyledContentHeaders';
import Headline from './Headline';

const TabPanelTwo = ({ item }) => {
  const { src, alt, subHeader } = item;

  return (
    <StyledHeroHeader>
      <Image
        className="hero-image"
        src={src}
        alt={alt}
        width={1700}
        height={900}
        style={{
          objectFit: 'cover',
          objectPosition: '20% 100%',
        }}
        priority
      />
      <Headline subHeader={subHeader} />
    </StyledHeroHeader>
  );
};

export default TabPanelTwo;
