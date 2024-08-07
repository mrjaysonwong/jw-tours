import { useContext, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  Tooltip,
  Button,
} from '@mui/material';
import { PersonalSettingsContext } from '../../PersonalDetails';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { LoadingSkeletonEmailCard } from '@/app/components/custom/loaders/Skeleton';
import CustomError from '@/app/components/custom/error';
import CardMenu from './CardMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MobileNumbers() {
  const { user, isLoading, isError, error } = useContext(
    PersonalSettingsContext
  );

  const [displayCount, setDisplayCount] = useState(4);

  const sortedPhoneList = user?.phone
    ?.slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const phoneListCard = sortedPhoneList?.slice(0, displayCount).map((item) => {
    const completePhone = `${item.dialCode} ${item.phoneNumber}`;

    return (
      <Box key={completePhone} sx={{ position: 'relative' }}>
        <Card
          sx={{
            py: 2,
            pl: 3,
            pr: 7,
            my: 2,
          }}
        >
          <Typography sx={{ overflow: 'auto', userSelect: 'all' }}>
            {completePhone}
          </Typography>
        </Card>

        {!item.isPrimary && (
          <CardMenu dialCode={item.dialCode} phoneNumber={item.phoneNumber} />
        )}

        {item.isPrimary && (
          <Tooltip title="Primary Mobile Number" arrow placement="right-end">
            <Box sx={{ position: 'absolute', top: -5 }}>
              <WorkspacePremiumIcon />
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  });

  const handleShowMore = () => {
    const nextDisplayCount = displayCount + 2;

    if (nextDisplayCount >= sortedPhoneList.length) {
      setDisplayCount(sortedPhoneList.length);
    } else {
      setDisplayCount(nextDisplayCount);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSkeletonEmailCard h={56} />
      ) : isError ? (
        <CustomError error={error} />
      ) : (
        <>
          {!user?.phone ? (
            <Card
              sx={{
                py: 2,
                pl: 3,
                pr: 7,
                my: 2,
              }}
            >
              <Typography>No verified mobile number</Typography>
            </Card>
          ) : (
            <>
              {phoneListCard}

              {displayCount !== sortedPhoneList.length &&
                sortedPhoneList.length > 4 && (
                  <Button
                    fullWidth
                    onClick={handleShowMore}
                    startIcon={<ExpandMoreIcon />}
                  >
                    Show More
                  </Button>
                )}
            </>
          )}
        </>
      )}
    </>
  );
}
