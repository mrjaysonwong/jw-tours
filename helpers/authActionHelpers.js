import { ACTIONS } from '@/constants/common';
import { API_URLS } from '@/constants/apiRoutes';

function getTitle(action) {
  const titleMap = {
    [ACTIONS.SIGNIN]: 'Sign In with Email Link',
    [ACTIONS.SEND_ACCOUNT_VERIFICATION]: 'Account Verification Link',
    [ACTIONS.SEND_PASSWORD_RESET]: 'Forgot Password',
  };

  return titleMap[action];
}

function getMessage(action) {
  const messageMap = {
    [ACTIONS.SIGNIN]: 'one-time sign in link',
    [ACTIONS.SEND_ACCOUNT_VERIFICATION]: 'verification link',
    [ACTIONS.SEND_PASSWORD_RESET]: 'link to reset your password',
  };

  return messageMap[action];
}

function getUrl({ type, action, userId }) {
  const urlMap = {
    email: {
      send: `${API_URLS.USERS}/${userId}/send-otp`,
      verify: `${API_URLS.USERS}/${userId}/verify-otp`,
    },
    mobile: {
      send: `${API_URLS.USERS}/${userId}/send-otp`,
      verify: `${API_URLS.USERS}/${userId}/verify-otp`,
    },

    notification: {
      send: `${API_URLS.USERS}/${userId}/send-notification`,
    },

    '2FA-account-deletion': {
      send: `${API_URLS.ADMIN}/auth/send-otp`,
      verify: `${API_URLS.ADMIN}/users/delete-account`,
    },

    default: {
      [ACTIONS.SIGNIN]: `${API_URLS.AUTH}/send-signin-email-link`,
      [ACTIONS.SEND_ACCOUNT_VERIFICATION]: `${API_URLS.AUTH}/send-account-verification-link`,
      [ACTIONS.SEND_PASSWORD_RESET]: `${API_URLS.AUTH}/send-password-reset-link`,
    },
  };

  return urlMap[type]?.[action] || urlMap.default?.[action];
}

export { getUrl, getMessage, getTitle };
