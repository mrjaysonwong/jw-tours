import { create } from 'zustand';

export const useNavDrawerStore = create((set) => ({
    state: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
  
    toggleNavDrawer: (anchor, open) => {
      set((state) => ({ state: { ...state, [anchor]: open } }));
    },
  }));