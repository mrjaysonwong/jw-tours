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

  const handleReviewAction = () => {
    setDialogState({ type: 'review-action', open: true });
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
    'reviews-table': {
      approve: handleReviewAction,
      reject: handleReviewAction,
      delete: handleReviewAction,
    },
  };

  const handler = actionMap[menuType]?.[action];

  handler();
};

export const validateMenuAction = (menuAction, allowedActions) => {
  if (!menuAction) {
    return { isValidAction: false, message: 'Missing body' };
  }
  if (!allowedActions.includes(menuAction)) {
    return { isValidAction: false, message: 'Invalid action' };
  }
  return { isValidAction: true };
};
