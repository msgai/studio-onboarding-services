import { create } from 'zustand';
import { createJSONStorage, devtools } from 'zustand/middleware';
import { COLOR_LIST, SOURCE_TYPE } from '@/lib/contants.ts';

interface FormState {
  showLoading: boolean;
  greetingPrompt: string;
  color: string;
  logoUrl: string;
  brandName: string;
  aiAgentName: string;
  tone: string;
  sourceName: string;
  sourceType: SOURCE_TYPE;
  sourceUrl: string;
  setSourceUrl: (data: string) => void;
  setSourceType: (data: SOURCE_TYPE) => void;
  setSourceName: (data: string) => void;
  setShowLoading: (data: boolean) => void;
  defaultSetting: boolean;
  setDefaultSetting: (data: boolean) => void;
  setTone: (data: string) => void;
  setAiAgentName: (data: string) => void;
  setBrandName: (data: string) => void;
  setLogoUrl: (data: string) => void;
  setColor: (data: string) => void;
  setGreetingPrompt: (data: string) => void;
  llmCreationState: string;
  setLLMStatus: (data: string) => void;
  webUrl: string;
  setWebUrl: (data: string) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    // persist(
    (set) => ({
      greetingPrompt: '',
      color: COLOR_LIST[1],
      logoUrl: '',
      brandName: '',
      aiAgentName: '',
      tone: '',
      showLoading: false,
      sourceName: '',
      sourceType: null,
      sourceUrl: '',
      webUrl: '',
      setWebUrl: (data: string) => {
        set({
          webUrl: data,
        });
      },
      setSourceUrl: (data: string) => {
        set({
          sourceUrl: data,
        });
      },
      setSourceType: (data: SOURCE_TYPE) => {
        set({
          sourceType: data,
        });
      },
      setSourceName: (data: string) => {
        set({
          sourceName: data,
        });
      },
      setShowLoading: (data: boolean) => {
        set({
          showLoading: data,
        });
      },
      defaultSetting: false,
      setTone: (data: string) => {
        set({
          tone: data,
        });
      },
      setDefaultSetting: (data: boolean) => {
        set({
          defaultSetting: data,
        });
      },
      setAiAgentName: (data: string) => {
        set({
          aiAgentName: data,
        });
      },
      setBrandName: (data: string) => {
        set({
          brandName: data,
        });
      },
      setLogoUrl: (data: string) => {
        set({
          logoUrl: data,
        });
      },
      setColor: (data: string) => {
        set({
          color: data,
        });
      },
      setGreetingPrompt: (data: string) => {
        set({
          greetingPrompt: data,
        });
      },
      llmCreationState: '',
      setLLMStatus: (data: string) => {
        set({
          llmCreationState: data,
        });
      },
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => localStorage),
    },
    // ),
  ),
);

export default useFormStore;
