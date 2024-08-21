export const EMAIL_REGEX = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

/* Strings and Digits only */
// export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;

/* With acceptable special characters */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|;:'",.<>?/~`])[A-Za-z\d!@#$%^&*()_\-+={}\[\]|;:'",.<>?/~`]{8,}$/;
