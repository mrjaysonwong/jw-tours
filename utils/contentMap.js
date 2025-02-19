import { ACTION_TYPES, API_URLS } from '@/constants/api';

const titleMap = {
  [ACTION_TYPES.SIGNIN]: 'Sign In with Email Link',
  [ACTION_TYPES.SEND_ACCOUNT_VERIFICATION]: 'Account Verification Link',
  [ACTION_TYPES.SEND_PASSWORD_RESET]: 'Forgot Password',
};

const messageMap = {
  [ACTION_TYPES.SIGNIN]: 'one-time sign in link',
  [ACTION_TYPES.SEND_ACCOUNT_VERIFICATION]: 'verification link',
  [ACTION_TYPES.SEND_PASSWORD_RESET]: 'link to reset your password',
};

const urlMap = {
  [ACTION_TYPES.SIGNIN]: `${API_URLS.AUTH}/send-signin-email-link`,
  [ACTION_TYPES.SEND_ACCOUNT_VERIFICATION]: `${API_URLS.AUTH}/send-account-verification-link`,
  [ACTION_TYPES.SEND_PASSWORD_RESET]: `${API_URLS.AUTH}/send-password-reset-link`,
};

function generateTitle(actionType) {
  return titleMap[actionType];
}

function generateMessage(actionType) {
  return messageMap[actionType];
}

function generateUrl(actionType) {
  return urlMap[actionType];
}

export { generateUrl, generateMessage, generateTitle };
