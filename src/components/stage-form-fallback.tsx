import Input from '@/components/atoms/Input.tsx';
import React, { useEffect, useState } from 'react';
import ToneSelector from '@/components/atoms/tone-selector.tsx';
import { invalidateCloudfront, updateChatWidgetDetails } from '@/services/chatWidget.ts';
import { updateAiAgentName, updateStage } from '@/services/bots.ts';
import useFormStore from '@/store/formStore.ts';
import useAppStore from '@/store/appStore.ts';
import answerai from '@/services/answerAi';
import { updateAiAgentPersona } from '@/services/aiAgentService.ts';
import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import Table from './atoms/source-table';
import Spinner from './atoms/spinner';

export default function StageFormFallback() {
  const { botDetails, setStage } = useAppStore();

  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.FALLBACK,
      botDetails: botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.FALLBACK) + 1]);
    }
  }

  async function handleFormSubmit() {
    await updateStageData();
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
          Continue
        </button>
      </div>
    </div>
  );
}
