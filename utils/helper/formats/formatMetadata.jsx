export function formatMetadata(params) {
  const { slug } = params;

  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: formattedTitle,
  };
}

export function formatTitle(title) {
  const formattedTitle = title
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return formattedTitle;
}
