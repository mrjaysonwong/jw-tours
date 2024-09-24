/* with axios client-side */
export const errorHandler = (error) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;

    /* Server-side api statusText  */
    const errorMessage = data?.statusText ?? 'An error occurred. Try again.';

    return {
      status,
      statusText,
      errorMessage,
    };
  } else {
    // Handle unexpected errors
    console.error('Unexpected error:', error);

    return {
      status: 500,
      statusText: 'Internal Server Error',
      errorMessage: 'Unexpected error occured.',
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
      status: 400,
    });
  }
}

export function handleRateLimitError(error, t1) {
  const rateLimited = error?.remainingPoints === 0;
  const timeLeft = Math.floor(error?.msBeforeNext / 1000);

  if (rateLimited) {
    throw new HttpError({
      message: `One request per minute. Try again in ${timeLeft} seconds.`,
      status: 429,
    });
  }
}

export class HttpError extends Error {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
}
