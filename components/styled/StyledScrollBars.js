export const scrollbarStyles = {
    overflowY: 'auto',
    height: '100vh',
  
    '@media (min-width: 1200px)': {
      '&:hover': {
        '&::-webkit-scrollbar-thumb:vertical': {
          backgroundColor: 'rgba(128, 128,128,0.6)',
        },
      },
  
      '&::-webkit-scrollbar': {
        width: '4px',
        borderRadius: '4px',
      },
  
      '&::-webkit-scrollbar-thumb:vertical': {
        backgroundColor: 'rgba(128, 128,128,0.0)',
        borderRadius: '10px',
      },
    },
  };
  