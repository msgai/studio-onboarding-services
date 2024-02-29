import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { STAGES } from '@/lib/contants.ts';

interface AppState {
  botDetails: any;
  currentStage: STAGES;
  socialConfig: any;
  chatWidgetConfig: any;
  chatWidgetAppEnv: string;
  chatWidgetCdnUrl: string;
  botRefIdStaging: string;
  botRefIdProduction: string;
  setBotRefIdStaging: (data: string) => void;
  setBotRefIdProduction: (data: string) => void;
  setChatWidgetCdnUrl: (data: string) => void;
  setChatWidgetAppEnv: (data: string) => void;
  setBotDetails: (data: any) => void;
  setStage: (data: STAGES) => void;
  setChatWidgetConfig: (data: any) => void;
  setSocialConfig: (data: any) => void;
  aiAgentPersona: any;
  setAiAgentPersona: (data: any) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    // persist(
    (set) => ({
      botDetails: null,
      currentStage: STAGES.APPEARANCE,
      chatWidgetConfig: null,
      socialConfig: null,
      chatWidgetAppEnv: '',
      chatWidgetCdnUrl: '',
      botRefIdStaging: '',
      botRefIdProduction: '',
      aiAgentPersona: null,
      setAiAgentPersona: (data: any) => {
        set({
          aiAgentPersona: data,
        });
      },
      setBotRefIdStaging: (data: string) => {
        set({
          botRefIdStaging: data,
        });
      },
      setBotRefIdProduction: (data: string) => {
        set({
          botRefIdProduction: data,
        });
      },
      setChatWidgetCdnUrl: (data: string) => {
        set({
          chatWidgetCdnUrl: data,
        });
      },
      setChatWidgetAppEnv: (data: string) => {
        set({
          chatWidgetAppEnv: data,
        });
      },
      setBotDetails: (data: any) => {
        set({
          botDetails: data,
        });
      },
      setChatWidgetConfig: (data: any) => {
        set({
          chatWidgetConfig: data,
        });
      },
      setStage: (data: STAGES) => {
        set({
          currentStage: data,
        });
      },
      setSocialConfig: (data: any) => {
        set({
          socialConfig: data,
        });
      },
      clearAuthData: () => {
        localStorage.removeItem('token');
        set({
          currentStage: STAGES.APPEARANCE,
          botDetails: null,
          chatWidgetConfig: null,
          socialConfig: null,
        });
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
