'use client';

import AlertMessage from './AlertMessage';
import { useMessageStore } from '@/stores/messageStore';

export default function GlobalAlert() {
  const { alert, hideAlert } = useMessageStore();

  return (
    <AlertMessage
      open={alert.open}
      message={alert.message}
      severity={alert.severity}
      onClose={hideAlert}
      x={alert.horizontal}
      y={alert.vertical}
      title={alert.title}
      duration={alert.autoHideDuration}
    />
  );
}
