export function a11yProps(index, a11ylabel) {
  const safeLabel = a11ylabel.toLowerCase().replace(/\s+/g, '-');
  return {
    id: `${safeLabel}-tab-${index}`,
    'aria-controls': `${safeLabel}-tabpanel-${index}`,
  };
}
