import { Toolbar, Typography, Box } from '@mui/material';

// internal imports
import MoreVertMenu from '@/components/menus/MoreVertMenu';

const EnhancedTableToolbar = ({ numSelected, selected, setSelected }) => {
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: 'var( --color-green-alpha)',
          }),
        }}
      >
        {numSelected > 0 && (
          <>
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>

            <Box sx={{ mx: 1 }}>
              <MoreVertMenu
                menuType="users-table-toolbar"
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </>
        )}
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
