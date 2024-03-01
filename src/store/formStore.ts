import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { COLOR_LIST } from '@/lib/contants.ts';

interface FormState {
  greetingPrompt: string;
  color: string;
  logoUrl: string;
  brandName: string;
  aiAgentName: string;
  tone: string;
  setTone: (data: string) => void;
  setAiAgentName: (data: string) => void;
  setBrandName: (data: string) => void;
  setLogoUrl: (data: string) => void;
  setColor: (data: string) => void;
  setGreetingPrompt: (data: string) => void;
  llmCreationState: string;
  setLLMStatus: (data: string) => void;
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
      setTone: (data: string) => {
        set({
          tone: data,
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
      }
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => localStorage),
    },
    // ),
  ),
);

export default useFormStore;
