// internal imports
import FormInput from '@/components/inputs/FormInput';
import { useTourFormContext } from './CardForm';

const Title = () => {
  const context = useTourFormContext();
  const { register, tour, errors } = context;

  return (
    <FormInput
      register={register}
      inputName="title"
      defaultValue={tour?.title}
      placeholder="Ex: El Nido Private Tour A w/ Lunch"
      errors={errors?.title}
    />
  );
};

export default Title;
