// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Equipments = () => {
  const { tour } = useTourDetails();

  const equipmentsInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Equipments'
  );

  return <InclusionsList inclusions={equipmentsInclusion} />;
};

export default Equipments;
