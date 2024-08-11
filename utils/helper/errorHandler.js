/* with axios client-side */
export const errorHandler = (error, t1) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;

    /* Server-side api statusText  */
    const errorMessage = data?.statusText ?? t1('errors.try_again');

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
      statusText: t1('errors.internal_server'),
      errorMessage: t1('errors.try_again'),
    };
  }
};

export function getLocalMessage(errorMessage, t1) {
  if (process.env.NODE_ENV === 'production') {
    return t1('errors.try_again');
  } else {
    return errorMessage;
  }
}

/* get Yup validation error */
export function getValidationError(error) {
  console.error(error);

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
      message: t1('errors.rate_limit', { timeLeft }),
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
