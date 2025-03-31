import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common.js';

/* handle client-side error */
export const errorHandler = (error) => {
  if (error && error.response) {
    // api response
    const { status, statusText, data } = error.response;

    const errorMessage =
      status === 500 ? ERROR_MESSAGES.SERVER_ERROR_LOCAL : data.message;

    return {
      status,
      statusText,
      errorMessage,
    };
  } else {
    // Handle unexpected errors
    console.error('Unexpected error:', error);

    return {
      errorMessage: ERROR_MESSAGES.UNEXPECTED_ERROR,
    };
  }
};

export function getLocalMessage(errorMessage) {
  if (process.env.NODE_ENV === 'production') {
    return 'An error occurred. Try again.';
  } else {
    return errorMessage;
  }
}

/* get Yup validation error */
export function getValidationError(error) {
  if (error.name === 'ValidationError') {
    throw new HttpError({
      message: error.errors,
      status: STATUS_CODES.BAD_REQUEST,
    });
  }
}

/* api errors */
export function handleRateLimitError(error, t1) {
  const rateLimited = error?.remainingPoints === 0;
  const timeLeft = Math.floor(error?.msBeforeNext / 1000);

  if (rateLimited) {
    throw new HttpError({
      message: `One request per minute. Try again in ${timeLeft} seconds.`,
      status: STATUS_CODES.TOO_MANY_REQUESTS,
    });
  }
}

export class HttpError extends Error {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
}

export function handleApiError(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error.name === 'ValidationError' ? error.inner : error);
  }

  if (error instanceof HttpError) {
    return {
      message: error.message.split(','),
      status: error.status,
    };
  }

  if (error.name === 'ValidationError') {
    return {
      message: error.errors,
      status: STATUS_CODES.BAD_REQUEST,
    };
  }

  return {
    message: ERROR_MESSAGES.SERVER_ERROR,
    status: STATUS_CODES.SERVER_ERROR,
  };
}

export const fireBaseAuthErrorMap = {
  'auth/invalid-verification-code': 'Invalid OTP. Please try again.',
  'auth/code-expired': 'OTP has expired. Please request a new one.',
  'auth/too-many-requests': 'Too many incorrect attempts. Try again later.',
  default: 'Failed to verify OTP. Please check the OTP.',
};
