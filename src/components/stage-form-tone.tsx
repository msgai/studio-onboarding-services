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

export default function StageFormTone() {
  const { brandName, setBrandName, aiAgentName, setAiAgentName, tone, setTone } = useFormStore((state) => state);
  const { setStage, botDetails, chatWidgetConfig, chatWidgetAppEnv, botRefIdStaging, aiAgentPersona } = useAppStore();

  async function updateChatWidgetData() {
    const chatWidgetConfigCopy = JSON.parse(JSON.stringify(chatWidgetConfig));
    chatWidgetConfigCopy.title = brandName;
    const payloadString = JSON.stringify(chatWidgetConfigCopy);
    await updateChatWidgetDetails({
      env: chatWidgetAppEnv,
      botRefId: botRefIdStaging,
      payloadString: payloadString,
    });
    await invalidateCloudfront({ env: chatWidgetAppEnv, botRefId: botRefIdStaging });
  }

  async function updateToneData() {
    let aiAgentPersonaCopy = JSON.parse(JSON.stringify(aiAgentPersona));
    aiAgentPersonaCopy = {
      ...aiAgentPersonaCopy,
      aiAgentPersonaConfig: {
        ...aiAgentPersonaCopy.aiAgentPersonaConfig,
        communicationTone: {
          ...aiAgentPersonaCopy.aiAgentPersonaConfig?.communicationTone,
          tone: tone,
        },
      },
    };
    const payloadString = JSON.stringify(aiAgentPersonaCopy);
    await updateAiAgentPersona(payloadString);
  }

  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.TONE,
      botDetails: botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.TONE) + 1]);
    }
  }

  async function handleFormSubmit() {
    const promise = Promise.all([updateChatWidgetData(), updateAiAgentName(aiAgentName), updateToneData()]);
    await promise;
    await updateStageData();
  }
  useEffect(() => {
    answerai.getAllSources().then((res: any) => {
      console.log('Answer', res);
    });
  }, []);

  return (
    <div className={'w-full'}>
      <div>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Brand Name</div>
        <Input
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
          }}
        />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">AI Agent Name</div>
        <Input
          placeholder={'What would your chat bot be called?'}
          value={aiAgentName}
          onChange={(e) => {
            setAiAgentName(e.target.value);
          }}
        />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Formality of Tone</div>
        <ToneSelector value={tone} onChange={(value: string) => setTone(value)} />
        <div className="mt-[15px] text-base font-bold text-white">
          Informal: Allows casual usage of slang and other phrases
        </div>
      </div>
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
