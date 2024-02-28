import Input from '@/components/atoms/Input.tsx';
import ColorPicker from '@/components/atoms/color-picker.tsx';
import React, { useEffect, useState } from 'react';
import FileUploader from '@/components/atoms/file-uploader';
import { getConfig, getSocialConfig } from '@/services/app.ts';
import { getChatWidgetDetails } from '@/services/chatWidget.ts';
import useAppStore from '@/store/appStore.ts';
import useFormStore from '@/store/formStore.ts';

export default function StageFormAppearance() {
  const [chatWidgetAppEnv, setChatWidgetAppEnv] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [chatWidgetCdnUrl, setChatWidgetCdnUrl] = useState(null);
  const { socialConfig } = useAppStore((state) => state);
  const { greetingPrompt, setGreetingPrompt, color, setColor } = useFormStore((state) => state);
  function onColorUpdate(value: string) {
    setColor(value);
  }

  function handleFormSubmit() {
    console.log('Form Submitted');
  }

  async function fetchConfig() {
    const response = await getConfig('CHAT_WIDGET_APP_ENV');
    const response2 = await getConfig('CHAT_WIDGET_CDN_URL');
    setChatWidgetAppEnv(response?.CHAT_WIDGET_APP_ENV);
    setChatWidgetCdnUrl(response2);
    console.log('chatWidgetAppEnv', response);
    console.log('chatWidgetCdnUrl', response2);
  }

  async function fetchChatWidgetConfig() {
    const response = await getChatWidgetDetails({
      env: chatWidgetAppEnv,
      botRefId: socialConfig?.botRefId,
    });
    console.log('chatWidgetConfig', response);
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    if (chatWidgetAppEnv && socialConfig) {
      fetchChatWidgetConfig();
    }
  }, [chatWidgetAppEnv, socialConfig]);
  let botId = localStorage.getItem('currentBotId') || '5fe5fd10-c110-4f48-b950-82e85edac81e'
  const uploadKeyPrefix = `CHAT-WIDGET/${botId}/logoImage`
  const kbKeyPrefix = `SETTINGS/KBANSAI/SOURCES/${botId}/`
  const validateFile = async (fileObj:any) => {
    console.log(fileObj.size)
    if (fileObj.size > 1024 * 1024 * 2) {
      throw new Error('File size greater than 2mb')
    }
  }
  return (
    <div className={'w-full'}>
      <div>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Greeting Prompt</div>
        <Input
          placeholder={'Welcome to {Company Chat Bot Name} customer support! How can I assist you today?'}
          value={greetingPrompt}
          onChange={(e) => {
            console.log(e.target.value);
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
        <FileUploader value={iconUrl}  validateFile={validateFile} showIcon uploadKeyPrefix={uploadKeyPrefix} description='IMG, JPG, JPEG format, up to 2MB' onChange={(url:any)=>setIconUrl(url)}/>
      </div>
      <div className={'mt-[50px] flex justify-end'}>
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
