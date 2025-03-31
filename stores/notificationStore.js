import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  isNotificationLoading: true,
  lastDoc: '',
  hasError: false,

  setNotifications: (notifications) => set({ notifications }),
  setIsNotificationLoading: (isLoading) =>
    set({ isNotificationLoading: isLoading }),
  setLastDoc: (lastDoc) => set({ lastDoc }),
  setHasError: (boolean) => set({ hasError: boolean }),

  addMoreNotifications: (newNotifications, lastVisible) =>
    set((state) => ({
      notifications: [...state.notifications, ...newNotifications],
      lastDoc: lastVisible,
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: (updatedIds) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        updatedIds.includes(n.id) ? { ...n, read: true } : n
      ),
    })),
}));

export const useSendNotificationStore = create((set) => ({
  selectedUserIds: [],
  setSelectedUserIds: (ids) => set({ selectedUserIds: ids }),
  clearSelectedUserIds: () => set({ selectedUserIds: [] }),
}));
