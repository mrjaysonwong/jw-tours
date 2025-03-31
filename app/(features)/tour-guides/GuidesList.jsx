import Link from 'next/link';

import { StyledContainer } from '@/components/styled/StyledContainers';
import { formatUrl } from '@/utils/formats/formatUrl';

const GuidesList = ({ guides }) => {
  return (
    <StyledContainer>
      <ul>
        {guides.map((guide) => {
          const city = `${
            guide.address?.city || guide.address?.name || 'manila'
          }`;
          const lastNameInitial = guide.lastName.slice(0, 1);
          const name = formatUrl(`${guide.firstName} ${lastNameInitial}`);

          const formattedCity = formatUrl(city);

          const href = `/tour-guides/${formattedCity}/profile/${name}/${guide._id}`;

          return (
            <li key={guide._id} style={{ textTransform: 'capitalize' }}>
              <Link href={href} prefetch={false}>
                {guide.firstName} {lastNameInitial}.
              </Link>
            </li>
          );
        })}
      </ul>
    </StyledContainer>
  );
};

export default GuidesList;
