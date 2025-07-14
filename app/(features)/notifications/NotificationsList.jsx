import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Badge,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InfoIcon from '@mui/icons-material/Info';

// internal imports
import { useDrawerStore } from '@/stores/drawerStore';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  markNotificationAsRead,
  fetchMoreNotifications,
} from '@/services/notifications/notificationActions';
import { getDateTime, formatEpochDate } from '@/utils/formats/formatDates';
import { scrollbarStyles } from '@/components/styled/StyledScrollBars';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { adminNotificationTypes } from '@/constants/iconMaps/icons';

const ErrorContent = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
        mb: 8,
      }}
    >
      <NotificationsNoneOutlinedIcon sx={{ fontSize: '6rem' }} />
      <Typography variant="h6" sx={{ my: 2 }}>
        Something went wrong!
      </Typography>
    </Box>
  );
};

const NotificationsList = ({
  hasScrollbarStyle = true,
  isUnreadTab = false,
}) => {
  const [loadingMore, setLoadingMore] = useState(null);
  const router = useRouter();

  const {
    notifications,
    lastDoc,
    setLastDoc,
    markAsRead,
    addMoreNotifications,
    hasError,
  } = useNotificationStore();

  const session = useUserSessionContext();

  const { toggleDrawer } = useDrawerStore();
  const { handleAlertMessage } = useMessageStore();

  const handleClick = async (e, n) => {
    try {
      if (n.template === 'survey') {
        window.open(n.link, '_blank');
      } else {
        router.push(n.link);
      }

      await markNotificationAsRead(n.id);

      // optimistically update ui
      markAsRead(n.id);

      toggleDrawer('notificationsDrawerOpen', false);
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const fetchMorePosts = async (lastDoc) => {
    if (lastDoc) {
      setLoadingMore(true);

      try {
        const { next, lastVisible } = await fetchMoreNotifications(
          session.user.id,
          lastDoc
        );

        addMoreNotifications(next, lastVisible);
        setLastDoc(lastVisible);
      } catch (error) {
        const { errorMessage } = errorHandler(error);
        handleAlertMessage(errorMessage, 'error');
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return (
    <>
      {notifications.length < 1 ? (
        <Box
          sx={{
            height: '100%',
            display: hasError ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'gray',
            mb: 8,
          }}
        >
          <NotificationsNoneOutlinedIcon sx={{ fontSize: '6rem' }} />
          <Typography sx={{ my: 2 }}>Your notifications live here</Typography>
          <Button variant="contained" sx={{ textTransform: 'none' }}>
            Notifications Settings
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={hasScrollbarStyle ? scrollbarStyles : {}}>
            <List sx={{ p: 0, m: 0 }}>
              {(isUnreadTab
                ? notifications.filter((n) => !n.read)
                : notifications
              ).map((n, index) => (
                <ListItem
                  key={`${n.userId}-${index}`}
                  disablePadding
                  alignItems="flex-start"
                  sx={{
                    '&:not(:first-child)': {
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    },
                  }}
                >
                  <ListItemButton onClick={(e) => handleClick(e, n)}>
                    <ListItemAvatar sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <Badge
                        color="error"
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            top: 5,
                            right: 5,
                            display: n.read ? 'none' : 'block',
                          },
                        }}
                      >
                        <Avatar sx={{ color: 'white' }}>
                          {adminNotificationTypes[n.type].icon}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: n.read ? 'gray' : 'inherit',
                            fontWeight: n.read ? 'normal' : 500,
                          }}
                        >
                          {n.title}
                        </Typography>
                      }
                      secondary={
                        <span
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography variant="overline" color="gray">
                            {formatEpochDate(n.createdAt.seconds)}
                            {' • '}
                            {getDateTime(n.createdAt.seconds)}
                          </Typography>

                          <span
                            style={{
                              color: n.read ? 'gray' : 'inherit',
                              height: '40px',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              whiteSpace: 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {n.message}
                          </span>
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ textAlign: 'center', m: 2 }}>
              {lastDoc ? (
                <Button variant="outlined">
                  {loadingMore ? (
                    'Loading...'
                  ) : (
                    <span onClick={() => fetchMorePosts(lastDoc)}>
                      Load More
                    </span>
                  )}
                </Button>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 1,
                  }}
                >
                  <InfoIcon sx={{ mr: 1 }} />
                  <Typography>No more notifications</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}

      {hasError && <ErrorContent />}
    </>
  );
};

export default NotificationsList;
