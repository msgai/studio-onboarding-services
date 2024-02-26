import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { STAGES } from '@/lib/contants.ts';

interface AppState {
  currentStage: string;
  setStage: (data: { currentStage: string }) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        currentStage: STAGES.APPEARANCE,
        setStage: (data: { currentStage: string }) => {
          set({
            currentStage: data.currentStage,
          });
        },
        clearAuthData: () => {
          localStorage.removeItem('token');
          set({ currentStage: '' });
        },
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useAppStore;
