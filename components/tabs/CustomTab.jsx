// third-party imports
import { Box, Tabs, Tab } from '@mui/material';

// internal imports
import CustomTabPanel from '@/components/tabs/CustomTabPanel';
import { a11yProps } from '@/utils/a11yprops';

const CustomTab = ({
  value,
  setValue,
  ariaLabel,
  tabContent,
  tabPanelComponents,
  iconPosition = 'start',
}) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label={ariaLabel}
          sx={{
            minHeight: 50,

            '& .MuiTab-root': {
              minHeight: 50,
              textTransform: 'none',
              px: 1,
            },

            '& .MuiTabs-scrollButtons.Mui-disabled': {
              opacity: 0.3,
            },

            '& .MuiTabs-scrollButtons': {
              width: '15px',
            },
          }}
        >
          {tabContent.map((el, index) => {
            return (
              <Tab
                key={index}
                icon={el.icon}
                iconPosition={iconPosition}
                label={el.label}
                {...a11yProps(index, el.label)}
              />
            );
          })}
        </Tabs>
      </Box>

      {tabContent.map((el, index) => {
        const TabComponent =
          tabPanelComponents[el.label] || tabPanelComponents[index];

        return (
          <CustomTabPanel
            key={index}
            value={value}
            index={index}
            a11ylabel={el.label}
          >
            {TabComponent && <TabComponent />}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};

export default CustomTab;
