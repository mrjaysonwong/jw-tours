// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Transport = () => {
  const { tour } = useTourDetails();

  const transportInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Transport'
  );

  return <InclusionsList inclusions={transportInclusion} />;
};

export default Transport;
