import { Avatar } from '@mui/material';

const ProfileAvatar = ({ user, h, w, m = 0, cursor, ariaHidden = false }) => {
  const imgSrc = user?.image?.url;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Avatar
      src={imgSrc || '/assets/fallback_avatar.svg'}
      alt={ariaHidden ? '' : fullName}
      aria-hidden={ariaHidden}
      referrerPolicy="no-referrer"
      sx={{ mr: m, height: h, width: w, cursor: cursor, position: 'relative' }}
    />
  );
};

export default ProfileAvatar;
