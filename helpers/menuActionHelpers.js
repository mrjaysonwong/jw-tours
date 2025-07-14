'use client';

export const menuActionHelpers = ({
  event,
  menuType,
  action,
  targetId,
  setDialogState,
  selected,
  setSelectedUserIds,
  router,
  email,
  setTargetEmail,
  setTargetNumber,
}) => {
  const handleContactInfoAction = () => {
    setDialogState({ type: 'contact-info-action', open: true });

    email
      ? setTargetEmail(event.currentTarget.getAttribute('data-email'))
      : setTargetNumber(event.currentTarget.getAttribute('data-number'));
  };

  const actionMap = {
    'my-contact-info': {
      'set-primary': handleContactInfoAction,
      delete: handleContactInfoAction,
    },
    'users-table': {
      edit: () => router.push(`/admin/dashboard/users/${targetId}/edit`),
    },
    'users-table-toolbar': {
      delete: () => setDialogState({ type: '2FA', open: true }),
      'send-notification': () => {
        setDialogState({ type: 'send-notification', open: true });
        setSelectedUserIds([...selected]);
      },
    },
    'tour-list': {
      edit: () => router.push(`/admin/dashboard/tours/${targetId}/edit`),
    },
  };

  const handler = actionMap[menuType]?.[action];

  handler();
};
