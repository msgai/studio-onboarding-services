import React from 'react';
import { finishOnboarding, updateAiAgentName, updateStage } from '@/services/bots.ts';
import useAppStore from '@/store/appStore.ts';
import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { toast } from 'sonner';

export default function StageFormTest() {
  const { botDetails, setStage } = useAppStore();

  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.TEST,
      botDetails: botDetails,
    });
    await finishOnboarding({
      botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.TEST)]);
    }
  }

  async function handleFormSubmit() {
    const id = toast.loading('Saving...');
    await updateStageData();
    window.location.href = '/';
    toast.dismiss(id);
    toast.success('Saved');
  }

  return (
    <div className={'w-full'}>
      <div className={'mr-[90px] mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[40px]  py-[15px] text-lg text-white'
          }
          onClick={handleFormSubmit}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
