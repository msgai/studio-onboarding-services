import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';
import { useEffect } from 'react';
import { getBotDetail } from '@/services/bots.ts';
import { STAGE_LIST } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';
import Spinner from '@/components/atoms/spinner.tsx';
import { getConfig, getSocialConfig } from '@/services/app.ts';
import { getChatWidgetDetails } from '@/services/chatWidget.ts';

function App() {
  const {
    setChatWidgetCdnUrl,
    setStage,
    setSocialConfig,
    setBotDetails,
    setChatWidgetAppEnv,
    setChatWidgetConfig,
    setBotRefIdStaging,
    setBotRefIdProduction,
  } = useAppStore();

  const { socialConfig, chatWidgetAppEnv, botDetails, botRefIdStaging } = useAppStore();

  async function fetchBotDetails() {
    const botId = localStorage.getItem('currentBotId');
    const $botDetails = await getBotDetail(botId);
    if ($botDetails) {
      const payload = $botDetails.payload;
      setBotDetails(payload);
      const properties = payload.properties;
      const onboardingStageIndex = parseInt(properties['ONBOARDING_STAGE'].value);
      setStage(STAGE_LIST[onboardingStageIndex || 0]);
    }
  }

  async function fetchSocialConfig() {
    const response = await getSocialConfig();
    const botRefId = response?.data?.find((item: any) => {
      if (item?.env === 'SANDBOX' && item.botId === localStorage.getItem('currentBotId')) return true;
    })?.botRefId;
    setBotRefIdProduction(response?.botRefId);
    setBotRefIdStaging(botRefId);
    setSocialConfig(response);
  }

  async function fetchChatWidgetConfigs() {
    const response = await getConfig('CHAT_WIDGET_APP_ENV');
    const response2 = await getConfig('CHAT_WIDGET_CDN_URL');
    setChatWidgetAppEnv(response?.CHAT_WIDGET_APP_ENV);
    setChatWidgetCdnUrl(response2?.CHAT_WIDGET_CDN_URL);
  }

  async function fetchChatWidgetConfig() {
    const response = await getChatWidgetDetails({
      env: chatWidgetAppEnv,
      botRefId: botRefIdStaging,
    });
    const payloadString = response?.payload;
    let payload;
    try {
      payload = JSON.parse(payloadString);
    } catch (e) {
      console.log('Not a valid JSON, error => ', e);
    }
    setChatWidgetConfig(payload);
    console.log('chatWidgetConfig', payload);
  }

  useEffect(() => {
    fetchBotDetails();
    fetchSocialConfig();
    fetchChatWidgetConfigs();
  }, []);

  useEffect(() => {
    console.log('botDetails', botDetails);
  }, [botDetails]);

  useEffect(() => {
    if (chatWidgetAppEnv && botRefIdStaging) {
      fetchChatWidgetConfig();
    }
  }, [chatWidgetAppEnv, botRefIdStaging]);

  return (
    <>
      {botDetails && (
        <div className={'relative flex h-[100vh] overflow-hidden w-full flex-nowrap'}>
          <div className={'mx-[30px] flex-grow pb-[30px] pt-[30px]'}>
            <div className='h-[150px]'>
              <Header />
              <StageSelector />
            </div>
            <div className='h-[60%] scale-[0.85]'>
              <StageForm />
            </div>
          </div>
          <div className={'flex w-[520px] justify-center overflow-hidden bg-neutral-200 pt-[50px]'}>
            <ChatWidgetModel />
          </div>
        </div>
      )}
      {!botDetails && (
        <div className={'flex h-full w-full items-center justify-center'}>
          <Spinner />
        </div>
      )}
    </>
  );
}

export default App;
