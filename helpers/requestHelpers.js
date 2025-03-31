export const getRequestData = ({
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

  const requestDataMap = {
    '2FA-account-deletion': userIdVerificationData,
    'password-verification': passwordVerificationData,
    default: contactVerificationData,
  };

  return requestDataMap[type] || requestDataMap.default;
};
