import React, { useContext, useState } from 'react';
import { Typography, Box, Card, Tooltip, Button } from '@mui/material';
import { PersonalSettingsContext } from '../../../tabs/MySettingsTabs';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardMenu from './CardMenu';
import { LoadingSkeletonEmailCard } from '@/app/components/custom/loaders/Skeleton';
import CustomError from '@/app/components/custom/error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EmailAddresses() {
  const { user, isLoading, isError, error } = useContext(
    PersonalSettingsContext
  );

  const [displayCount, setDisplayCount] = useState(4);

  const sortedEmailList = user?.email
    .slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const emailListCard = sortedEmailList?.slice(0, displayCount).map((item) => {
    return (
      <Box key={item.email} sx={{ position: 'relative' }}>
        <Card
          sx={{
            py: 2,
            pl: 3,
            pr: 7,
            my: 2,
          }}
        >
          <Typography sx={{ overflow: 'auto', userSelect: 'all' }}>
            {item.email}
          </Typography>
        </Card>

        {!item.isPrimary && <CardMenu email={item.email} />}

        {item.isPrimary && (
          <Tooltip title="Primary Email Address" arrow placement="right-end">
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

    if (nextDisplayCount >= sortedEmailList.length) {
      setDisplayCount(sortedEmailList.length);
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
          {emailListCard}

          {displayCount !== sortedEmailList.length &&
            sortedEmailList.length > 4 && (
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
  );
}
