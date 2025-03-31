import { create } from 'zustand';

export const useMessageStore = create((set) => ({
  alert: {
    open: false,
    message: '',
    severity: '',
    horizontal: 'left',
    vertical: 'bottom',
    title: '',
    autoHideDuration: 4000,
  },

  handleAlertMessage: (
    message,
    severity,
    horizontal,
    vertical,
    title,
    autoHideDuration
  ) => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: true,
        message: message,
        severity: severity,
        horizontal: horizontal,
        vertical: vertical,
        title: title,
        autoHideDuration: autoHideDuration,
      },
    }));
  },

  hideAlert: () => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: false,
      },
    }));
  },
}));
