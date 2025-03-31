import { useState } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import CustomTab from '@/components/tabs/CustomTab';
import { tourInclusionsTabComponents } from '@/config/componentMapping';

const inclusionIcons = {
  Activities: <InsertEmoticonOutlinedIcon />,
  Equipments: <HikingOutlinedIcon />,
  Transport: <EmojiTransportationOutlinedIcon />,
  Accommodation: <BedOutlinedIcon />,
  Meals: <RestaurantOutlinedIcon />,
};

const Inclusions = () => {
  const { tour } = useTourDetails();
  const [value, setValue] = useState(0);

  const tabContent = tour.inclusions.map((inclusion) => ({
    icon: inclusionIcons[inclusion.label],
    label: inclusion.label,
  }));

  return (
    <>
      <Divider />
      <Typography variant="h5">What&apos;s Included?</Typography>

      <Box sx={{ my: 2 }}>
        <CustomTab
          value={value}
          setValue={setValue}
          ariaLabel="tour inclusions tabs"
          tabContent={tabContent}
          tabPanelComponents={tourInclusionsTabComponents}
        />
      </Box>
    </>
  );
};

export default Inclusions;
