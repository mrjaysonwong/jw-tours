export function formatMetadata(params) {
  const formattedTitle = params.slug
    .split('-')
    .map((title) => title.charAt(0).toUpperCase() + title.slice(1))
    .join(' ');

  return {
    title: formattedTitle,
  };
}
