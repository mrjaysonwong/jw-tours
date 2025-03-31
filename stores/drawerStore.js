import { create } from 'zustand';

export const useDrawerStore = create((set) => ({
  notificationsDrawerOpen: false,
  navDrawerOpen: false,
  toggleDrawer: (drawer, open) => set({ [drawer]: open }),
}));
