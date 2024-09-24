import React, { useContext, useState } from 'react';
import { Typography, Box, Tooltip, Button } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import CardMenu from '@/components/menus/CardMenu';
import { SkeletonCard, SkeletonButton } from '@/components/loaders/Skeletons';
import { StyledGridCard } from '@/components/styled/StyledCards';

export default function EmailAddresses({ setOpen }) {
  const { user, isLoading } = useContext(UserDataContext);

  const [displayCount, setDisplayCount] = useState(4);

  const sortedEmailList = user?.email
    .slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const emailListCard = sortedEmailList
    ?.slice(0, displayCount)
    .map((item, index) => {
      return (
        <Box key={index} sx={{ position: 'relative' }}>
          <StyledGridCard
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
          </StyledGridCard>

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

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleShowMore = () => {
    const nextDisplayCount = displayCount + 2;

    if (nextDisplayCount >= sortedEmailList?.length) {
      setDisplayCount(sortedEmailList?.length);
    } else {
      setDisplayCount(nextDisplayCount);
    }
  };

  if (isLoading) {
    return (
      <>
        <SkeletonButton w={120} />
        <SkeletonCard h={56} l={4} />
      </>
    );
  }

  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<EmailIcon />}
          onClick={handleAddClick}
          sx={{ mt: 2 }}
        >
          Add Email
        </Button>
      </Box>

      {emailListCard}

      {displayCount !== sortedEmailList?.length &&
        sortedEmailList?.length > 4 && (
          <Button
            fullWidth
            onClick={handleShowMore}
            startIcon={<ExpandMoreIcon />}
          >
            Show More
          </Button>
        )}
    </>
  );
}
