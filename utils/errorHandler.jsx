export const errorHandler = (error) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;

    const errorMessage = data?.error?.message ?? statusText;

    return {
      statusText,
      status,
      errorMessage,
    };
  }
};
