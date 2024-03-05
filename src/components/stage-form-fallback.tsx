import React from 'react';
import { finishOnboarding, updateStage } from '@/services/bots.ts';
import useAppStore from '@/store/appStore.ts';
import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { toast } from 'sonner';
import Input from '@/components/atoms/Input.tsx';

export default function StageFormFallback() {
  const { botDetails, setStage, chatWidgetCdnUrl, botRefIdStaging } = useAppStore();

  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.FALLBACK,
      botDetails: botDetails,
    });
    await finishOnboarding({
      botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.FALLBACK)]);
    }
  }

  async function handleFormSubmit() {
    const id = toast.loading('Saving...');
    await updateStageData();
    openInteractiveTab();

    window.location.href = '/';

    toast.dismiss(id);
    toast.success('Saved');
  }

  function openInteractiveTab() {
    const cdnUrl = new URL(chatWidgetCdnUrl)
    const url = `https://${window.location.host}/preview?botRefId=${botRefIdStaging}&src=${cdnUrl.origin}`;
    window.open(url, '_blank');
  }

  return (
    <div className={'w-full'}>
      <div className="h-full pb-[50px]">
        <div>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Error message</div>
          <Input placeholder={'Thank you for reaching out to us, please create a Support ticket at netomi.com.'} />
        </div>
      </div>
      <div className={'mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[40px]  py-[15px] text-lg text-white'
          }
          onClick={handleFormSubmit}
        >
          Submit & Test
        </button>
      </div>
    </div>
  );
}
