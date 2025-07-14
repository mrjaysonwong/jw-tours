export const ACTIONS = Object.freeze({
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  SEND_PASSWORD_RESET: 'send-password-reset',
  SEND_ACCOUNT_VERIFICATION: 'send-account-verification',
  SIGNIN: 'signin',
  GEN_OTP: 'gen-otp',
});

export const REQUEST_TYPES = Object.freeze({
  EMAIL: 'email',
  MOBILE: 'mobile',
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
  FORBIDDEN_ACTION: 'You are not authorized to perform this action.',
  USER_NOT_FOUND: 'User not found.',
  SERVER_ERROR: 'Internal Server Error',
  UNEXPECTED_ERROR: 'Unexpected error occurred. Try again later.',
  SERVER_ERROR_LOCAL:
    'We are experiencing some issues. Please refresh the page or try again later.',
  ADMIN_ONLY: 'Unauthorized. Only admin can access this resource.',
  ADMIN_ONLY_ACTION: 'Forbidden. Only admins can perform this action.',
});

export const SERVICE_FEE_PERCENTAGE = 3.5;
