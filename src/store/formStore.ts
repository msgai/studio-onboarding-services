import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { COLOR_LIST } from '@/lib/contants.ts';

interface FormState {
  greetingPrompt: string;
  color: string;
  setColor: (data: string) => void;
  setGreetingPrompt: (data: string) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    // persist(
    (set) => ({
      greetingPrompt: 'sdfsdfs',
      color: COLOR_LIST[0],
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
