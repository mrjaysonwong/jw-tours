import { useContext, useState } from 'react';
import { Typography, Box, Card, Tooltip, Button } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import { SkeletonCard, SkeletonButton } from '@/components/loaders/Skeletons';
import CardMenu from '@/components/menus/CardMenu';
import { StyledGridCard } from '@/components/styled/StyledCards';

export default function MobileNumbers({ setOpen }) {
  const { user, isLoading } = useContext(UserDataContext);

  const [displayCount, setDisplayCount] = useState(4);

  const sortedPhoneList = user?.phone
    ?.slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const phoneListCard = sortedPhoneList
    ?.slice(0, displayCount)
    .map((item, index) => {
      const completePhone = `${item.dialCode} ${item.phoneNumber}`;
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
              {completePhone}
            </Typography>
          </StyledGridCard>

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

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleShowMore = () => {
    const nextDisplayCount = displayCount + 2;

    if (nextDisplayCount >= sortedPhoneList?.length) {
      setDisplayCount(sortedPhoneList?.length);
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
          startIcon={<PhoneIcon />}
          onClick={handleAddClick}
          sx={{ mt: 2 }}
        >
          Add Mobile
        </Button>
      </Box>

      {!user?.phone ? (
        <StyledGridCard
          sx={{
            py: 2,
            pl: 3,
            pr: 7,
            my: 2,
          }}
        >
          <Typography>No verified mobile number</Typography>
        </StyledGridCard>
      ) : (
        <>
          {phoneListCard}

          {displayCount !== sortedPhoneList?.length &&
            sortedPhoneList?.length > 4 && (
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
