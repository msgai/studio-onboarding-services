import Input from '@/components/atoms/Input.tsx';
import ColorPicker from '@/components/atoms/color-picker.tsx';
import React, { useEffect } from 'react';
import FileUploader from '@/components/atoms/file-uploader';
import { invalidateCloudfront, updateChatWidgetDetails } from '@/services/chatWidget.ts';
import useAppStore from '@/store/appStore.ts';
import useFormStore from '@/store/formStore.ts';
import { COLOR_LIST, STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { updateStage } from '@/services/bots.ts';
import { getUploadKeyPrefix } from '@/lib/utils.ts';
import { toast } from 'sonner';

export default function StageFormAppearance() {
  const uploadKeyPrefix = getUploadKeyPrefix();

  const { greetingPrompt, setGreetingPrompt, color, setColor, logoUrl, setLogoUrl, setShowLoading } = useFormStore();
  const { chatWidgetConfig, chatWidgetAppEnv, botRefIdStaging, botDetails, setStage } = useAppStore();
  function onColorUpdate(value: string) {
    setColor(value);
  }

  function validateForm() {
    if (!greetingPrompt) {
      throw new Error('Greeting prompt is required');
    }
    if (!color) {
      throw new Error('Color is required');
    }
    if (!logoUrl) {
      throw new Error('Logo is required');
    }
  }

  async function handleSubmit() {
    toast.info('Saving');
    setShowLoading(true);
    try {
      validateForm();
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
      toast.success('Saved');
    } catch (e) {
      if (e.message) {
        toast.error(e.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    if (chatWidgetConfig) {
      setGreetingPrompt(chatWidgetConfig.initialFlows?.header);
      setColor(chatWidgetConfig.theme?.color || COLOR_LIST[1]);
      setLogoUrl(chatWidgetConfig.logoImage);
    }
  }, [chatWidgetAppEnv]);

  const validateFile = async (fileObj: any) => {
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
      <div className={'mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-between gap-[8px] rounded-full bg-orange-400 px-[40px]  py-[15px] text-lg text-white disabled:cursor-not-allowed'
          }
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
