export const ACTION_TYPES = Object.freeze({
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  SEND_PASSWORD_RESET: 'send-password-reset',
  SEND_ACCOUNT_VERIFICATION: 'send-account-verification',
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  GEN_OTP: 'gen-otp',
  DELETE_COMMENT: 'delete-comment',
  UPDATE: 'update',
  DELETE: 'delete',

  ADMIN: {
    DELETE_ACCOUNT: 'delete-account',
  },
});

export const REQUEST_TYPES = Object.freeze({
  EMAIL: 'email',
  MOBILE: 'mobile',
});

const API_BASE_URL = '/api/v1';

export const API_URLS = Object.freeze({
  AUTH: `${API_BASE_URL}/auth`,
  USERS: `${API_BASE_URL}/users`,
  ADMIN: `${API_BASE_URL}/admin`,
});

export const ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
  GUIDE: 'guide',
  AGENT: 'agent',
});

export const STATUS_CODES = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
});

export const ERROR_MESSAGES = Object.freeze({
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED:
    'Unauthorized. Authentication is required to access this resource.',
  FORBIDDEN: "You don't have permission to access the requested resource.",
  USER_NOT_FOUND: 'User not found.',
  SERVER_ERROR: 'Internal Server Error',
  UNEXPECTED_ERROR: 'Unexpected error occurred. Try again later.',
  SERVER_ERROR_LOCAL:
    'We are experiencing some issues. Please refresh the page or try again later.',
});
