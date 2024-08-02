import { create } from 'zustand';

export const useMessageStore = create((set) => ({
  success: {
    open: false,
    message: '',
    severity: 'success',
  },
  error: {
    open: false,
    message: '',
    severity: 'error',
  },
  alert: {
    open: false,
    message: '',
    severity: '',
  },

  handleAlertMessage: (message, severity) => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: true,
        message: message,
        severity: severity,
      },
    }));
  },

  handleClose: () => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: false,
      },
    }));
  },
}));
