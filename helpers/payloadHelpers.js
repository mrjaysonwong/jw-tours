export const getPayloadData = ({
  type,
  otp,
  email,
  dialCode,
  phoneNumber,
  password,
  selected,
}) => {
  const contactVerificationData = {
    type,
    otp,
    email,
    ...(type === 'mobile' && { phone: { dialCode, phoneNumber } }),
  };

  const userIdVerificationData = {
    data: {
      userIds: [...selected],
      otp,
    },
  };

  const passwordVerificationData = { password };

  const payloadTypeMap = {
    '2FA-account-deletion': userIdVerificationData,
    'password-verification': passwordVerificationData,
    default: contactVerificationData,
  };

  return payloadTypeMap[type] || payloadTypeMap.default;
};
