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

export default function StageFormSources() {
  const { brandName, setBrandName, aiAgentName, setAiAgentName, tone, setTone } = useFormStore((state) => state);
  const { botDetails, setStage } = useAppStore();

  const [sources, updateSources] = useState([]);
  const [loading, setLoading] = useState(true);

  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.SOURCES,
      botDetails: botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.SOURCES) + 1]);
    }
  }

  async function handleFormSubmit() {
    await updateStageData();
  }
  useEffect(() => {
    setLoading(true);
    answerai
      .getAllSources()
      .then((res: any) => {
        console.log('Answer', res);
        updateSources(res.payload);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className={'w-full'}>
      <Table data={sources} />
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Name</div>
        <Input
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Type</div>
        <select
          id="countries"
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-lg leading-none text-gray-500 focus:border-blue-500 focus:ring-blue-500 "
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Web Url</div>
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
