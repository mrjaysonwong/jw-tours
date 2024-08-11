export function signInEmailTranslations(t1) {
  const translations = {
    emailRequired: t1('validations.email_required'),
    invalidEmail: t1('validations.invalid_email'),
  };

  return translations;
}

export function signInCredentialsTranslations(t1) {
  const translations = {
    emailRequired: t1('validations.email_required'),
    invalidEmail: t1('validations.invalid_email'),
    passwordRequired: t1('validations.pw_required'),
    passwordMin: t1('validations.min_pw'),
    passwordMax: t1('validations.max_pw'),
  };

  return translations;
}

export function signUpTranslations(t, t1) {
  const translations = {
    invalidName: t1('validations.enter_valid_name'),
    fNameRequired: t1('validations.fname_required'),
    lNameRequired: t1('validations.lname_required'),
    emailRequired: t1('validations.email_required'),
    invalidEmail: t1('validations.invalid_email'),
    passwordRequired: t1('validations.pw_required'),
    passwordMin: t1('validations.min_pw'),
    passwordMax: t1('validations.max_pw'),
    strongPassword: t('validations.strong_pw'),
    matchPassword: t('validations.match_pw'),
    confirmPassword: t('validations.confirm_pw'),
  };

  return translations;
}
