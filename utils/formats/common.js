export function formatUrl(name) {
  return name?.toLowerCase().replace(/\s+/g, '-').trim();
}

export function capitalizeText(str) {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function cleanSlug(str) {
  return capitalizeText(str.replace(/-/g, ' '));
}

export const formatLastName = (lastName) => {
  return lastName.slice(0, 1);
};

export const formatCardNumber = (value) => {
  return value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

export const formatCardExpiry = (value) => {
  // Insert slash after 2 digits
  if (value.length >= 3) {
    return value.replace(/^(\d{2})(\d{1,2})/, '$1/$2');
  }

  return value;
};

export const formatNumber = (num, locale = 'en-US') =>
  Math.round(num).toLocaleString(locale);

export const formatValue = (value) => {
  return value?.replace(/-/g, ' ').toLowerCase();
};


export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}