// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Accomodation = () => {
  const { tour } = useTourDetails();

  const accomodationInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Accomodation'
  );

  return <InclusionsList inclusions={accomodationInclusion} />;
};

export default Accomodation;
