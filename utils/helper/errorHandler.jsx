// with axios
export const errorHandler = (error) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;

    const errorMessage = data?.message ?? 'An error occured. Try again.';

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
      errorMessage: 'An unexpected error occurred.',
    };
  }
};

export function getErrorMessage(errorMessage) {
  if (process.env.NODE_ENV === 'production') {
    return 'An error occured. Try again.';
  } else {
    return errorMessage;
  }
}

export function getValidationError(error) {
  if (error.name === 'ValidationError') {
    console.error(error);
    const errors = error.errors.map((err) => ({ error: err }));

    throw { message: errors, status: 400 };
  }
}
