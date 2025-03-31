// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import Password from '@/app/(features)/account/security/Password';

const EditUserSecurity = () => {
  const contextValues = useUserDetailsContext();

  return (
    <>
      <Password {...contextValues} />
    </>
  );
}


export default EditUserSecurity