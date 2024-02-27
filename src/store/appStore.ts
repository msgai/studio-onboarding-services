import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { STAGES } from '@/lib/contants.ts';

interface AppState {
  currentStage: string;
  socialConfig: any;
  chatWidgetConfig: any;
  setStage: (data: { currentStage: string }) => void;
  setChatWidgetConfig: (data: { chatWidgetConfig: any }) => void;
  setSocialConfig: (data: { socialConfig: any }) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    // persist(
    (set) => ({
      currentStage: STAGES.APPEARANCE,
      chatWidgetConfig: null,
      socialConfig: null,
      setChatWidgetConfig: (data: { chatWidgetConfig: any }) => {
        set({
          chatWidgetConfig: data.chatWidgetConfig,
        });
      },
      setStage: (data: { currentStage: string }) => {
        set({
          currentStage: data.currentStage,
        });
      },
      setSocialConfig: (data: { socialConfig: any }) => {
        set({
          socialConfig: data.socialConfig,
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
    // ),
  ),
);

export default useAppStore;
