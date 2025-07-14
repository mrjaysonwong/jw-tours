// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Equipments = () => {
  const { tour } = useTourDetails();

  const equipmentsInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Equipments'
  );

  return <InclusionsList inclusions={equipmentsInclusion} />;
};

export default Equipments;
