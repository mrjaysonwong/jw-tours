// stores/checkoutStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// export const useCheckoutStore = create(
//   persist(
//     (set) => ({
//       data: null,
//       setData: (data) => set({ data }),
//       clearData: () => set({ data: null }),
//     }),
//     {
//       name: 'checkout', // storage key in localStorage
//     }
//   )
// );

export const useCheckoutStepStore = create((set) => ({
  activeStep: 0,
  setActiveStep: (step) => set({ activeStep: step }),
}));

export const usePickupLocationStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
