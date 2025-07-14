import { create } from 'zustand';

export const useAuthDialogStore = create((set) => ({
  isAuthDialogOpen: false,
  openAuthDialog: () => set({ isAuthDialogOpen: true }),
  closeAuthDialog: () => set({ isAuthDialogOpen: false }),
  toggleAuthDialog: () =>
    set((state) => ({ isAuthDialogOpen: !state.isAuthDialogOpen })),
}));
