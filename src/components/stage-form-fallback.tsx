import React from 'react';
import { updateStage } from '@/services/bots.ts';
import useAppStore from '@/store/appStore.ts';
import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { toast } from 'sonner';
import Input from '@/components/atoms/Input.tsx';
import ColorPicker from '@/components/atoms/color-picker.tsx';
import FileUploader from '@/components/atoms/file-uploader.tsx';

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
    const id = toast.loading('Saving...');
    await updateStageData();
    toast.dismiss(id);
    toast.success('Saved');
  }
  return (
    <div className={'w-full'}>
      <div className="h-full pb-[50px]">
        <div>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Error message</div>
          <Input placeholder={'Thank you for reaching out to us, please create a Support ticket at netomi.com.'} />
        </div>
      </div>
      <div className={'mr-[90px] mt-[50px] flex scale-[1.25] justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[32px] py-[12px] text-sm text-white'
          }
          onClick={handleFormSubmit}
        >
          Submit & Test
        </button>
      </div>
    </div>
  );
}
