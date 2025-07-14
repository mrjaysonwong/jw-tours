export const EMAIL_REGEX = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// With acceptable special characters
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|;:'",.<>?/~`])[A-Za-z\d!@#$%^&*()_\-+={}\[\]|;:'",.<>?/~`]{8,}$/;
