import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import AutoCompleteInput from '@/components/inputs/AutoCompleteInput';
import { availability, timeSlots, durations } from '@/models/tourModel';

const TourAvailability = () => {
  const { control, errors, setValue } = useCreateTourContext();
  return (
    <>
      <AutoCompleteInput
        inputName="tourAvailability"
        placeholder="Availability"
        id="availability-select"
        control={control}
        multiple={true}
        options={availability}
        error={errors?.tourAvailability}
        setValue={setValue}
      />

      <AutoCompleteInput
        inputName="startTime"
        placeholder="Start time slots"
        id="timeslots-select"
        control={control}
        multiple={true}
        options={timeSlots}
        error={errors?.startTime}
        setValue={setValue}
      />

      <AutoCompleteInput
        inputName="duration"
        label="Duration"
        id="duration-select"
        control={control}
        options={durations}
        error={errors?.duration}
      />
    </>
  );
};

export default TourAvailability;
