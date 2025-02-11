export function a11yProps(index, a11ylabel) {
  return {
    id: `${a11ylabel}-tab-${index}`,
    'aria-controls': `${a11ylabel}-tabpanel-${index}`,
  };
}
