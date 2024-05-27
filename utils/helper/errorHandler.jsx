// with axios
export const errorHandler = (error) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;

    const errorMessage = data?.message ?? statusText;

    return {
      statusText,
      status,
      errorMessage,
    };
  } else {
    // Handle unexpected errors

    return {
      status: 500,
      statusText: 'Internal Server Error',
      errorMessage: 'An error occurred. Try again.',
    };
  }
};
