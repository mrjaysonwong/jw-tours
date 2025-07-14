// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Transport = () => {
  const { tour } = useTourDetails();

  const transportInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Transport'
  );

  return <InclusionsList inclusions={transportInclusion} />;
};

export default Transport;
