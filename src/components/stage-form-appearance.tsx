import Input from '@/components/atoms/Input.tsx';
import ColorPicker from '@/components/atoms/color-picker.tsx';
import React, { useEffect, useState } from 'react';
import FileUploader from '@/components/atoms/file-uploader';
import { invalidateCloudfront, updateChatWidgetDetails } from '@/services/chatWidget.ts';
import useAppStore from '@/store/appStore.ts';
import useFormStore from '@/store/formStore.ts';
import { COLOR_LIST, STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { updateStage } from '@/services/bots.ts';
import { getCurrentBotId } from '@/lib/utils.ts';
import { toast } from 'sonner';

export default function StageFormAppearance() {
  const { greetingPrompt, setGreetingPrompt, color, setColor, logoUrl, setLogoUrl } = useFormStore((state) => state);
  const { chatWidgetConfig, chatWidgetAppEnv, botRefIdStaging, botDetails, setStage } = useAppStore();
  function onColorUpdate(value: string) {
    setColor(value);
  }

  async function handleFormSubmit() {
    const id = toast.loading('Saving...');
    const chatWidgetConfigCopy = JSON.parse(JSON.stringify(chatWidgetConfig));
    chatWidgetConfigCopy.initialFlows.header = greetingPrompt;
    chatWidgetConfigCopy.theme.color = color;
    chatWidgetConfigCopy.logoImage = logoUrl;
    const payloadString = JSON.stringify(chatWidgetConfigCopy);
    await updateChatWidgetDetails({
      env: chatWidgetAppEnv,
      botRefId: botRefIdStaging,
      payloadString: payloadString,
    });
    await invalidateCloudfront({ env: chatWidgetAppEnv, botRefId: botRefIdStaging });
    const payload = await updateStage({
      stage: STAGES.APPEARANCE,
      botDetails: botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.APPEARANCE) + 1]);
    }
    toast.dismiss(id);
    toast.success('Saved');
    console.log('payload ===>', payload);
  }

  useEffect(() => {
    if (chatWidgetConfig) {
      setGreetingPrompt(chatWidgetConfig.initialFlows?.header);
      setColor(chatWidgetConfig.theme?.color || COLOR_LIST[1]);
      setLogoUrl(chatWidgetConfig.logoImage);
    }
  }, [chatWidgetAppEnv]);

  let botId = getCurrentBotId();
  const uploadKeyPrefix = `CHAT-WIDGET/${botId}/logoImage`;
  const kbKeyPrefix = `SETTINGS/KBANSAI/SOURCES/${botId}/`;
  const validateFile = async (fileObj: any) => {
    console.log(fileObj.size);
    if (fileObj.size > 1024 * 1024 * 2) {
      throw new Error('File size greater than 2mb');
    }
  };
  return (
    <div className={'w-full'}>
      <div className="h-full pb-[50px]">
        <div>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Greeting Prompt</div>
          <Input
            placeholder={'Welcome to {Company Chat Bot Name} customer support! How can I assist you today?'}
            value={greetingPrompt}
            onChange={(e) => {
              setGreetingPrompt(e.target.value);
            }}
          />
        </div>
        <div className={'mt-[30px]'}>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Select color</div>
          <ColorPicker value={color} onChange={onColorUpdate} />
        </div>
        <div className={'mt-[30px]'}>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Upload Logo</div>
          <FileUploader
            value={logoUrl}
            validateFile={validateFile}
            showIcon
            uploadKeyPrefix={uploadKeyPrefix}
            description="IMG, JPG, JPEG format, up to 2MB"
            onChange={(url: any) => setLogoUrl(url)}
          />
        </div>
      </div>
      <div className={'mr-[90px] mt-[50px] flex scale-[1.25] justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[32px] py-[12px] text-sm text-white'
          }
          onClick={handleFormSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
