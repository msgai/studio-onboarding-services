import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { COLOR_LIST } from '@/lib/contants.ts';

interface FormState {
  greetingPrompt: string;
  color: string;
  logoUrl: string;
  setLogoUrl: (data: string) => void;
  setColor: (data: string) => void;
  setGreetingPrompt: (data: string) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    // persist(
    (set) => ({
      greetingPrompt: '',
      color: COLOR_LIST[1],
      logoUrl: '',
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
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => localStorage),
    },
    // ),
  ),
);

export default useFormStore;
