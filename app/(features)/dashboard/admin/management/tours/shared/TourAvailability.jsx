import { useTourFormContext } from './CardForm';
import AutoCompleteInput from '@/components/inputs/AutoCompleteInput';
import { availability, timeSlots, durations } from '@/models/tourModel';

const TourAvailability = () => {
  const { control, errors, setValue, tour } = useTourFormContext();

  const durationDefault =
  tour?.duration?.value && tour?.duration?.unit
    ? `${tour.duration.value} ${tour.duration.unit}`
    : '';


  return (
    <>
      <AutoCompleteInput
        inputName="tourAvailability"
        placeholder="Availability"
        id="availability-select"
        control={control}
        defaultValue={tour?.tourAvailability}
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
        defaultValue={tour?.startTime}
        options={timeSlots}
        error={errors?.startTime}
        setValue={setValue}
      />

      <AutoCompleteInput
        inputName="duration"
        label="Duration"
        id="duration-select"
        defaultValue={durationDefault}
        control={control}
        options={durations}
        error={errors?.duration}
      />
    </>
  );
};

export default TourAvailability;
