import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';
import { useEffect, useState } from 'react';
import { getBotDetail } from '@/services/bots.ts';
import { STAGE_LIST } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';
import Spinner from '@/components/atoms/spinner.tsx';
import { getConfig, getSocialConfig } from '@/services/app.ts';
import { getChatWidgetDetails } from '@/services/chatWidget.ts';
import useFormStore from '@/store/formStore.ts';
import { getAiAgentPersona } from '@/services/aiAgentService.ts';
import { getCurrentBotId } from '@/lib/utils.ts';

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

  const { aiAgentPersona, setAiAgentPersona, chatWidgetAppEnv, botDetails, botRefIdStaging, chatWidgetConfig } =
    useAppStore();
  const { setTone, setGreetingPrompt, setLogoUrl, setColor, setBrandName, setAiAgentName } = useFormStore();

  const [loading, setLoading] = useState(true);
  async function fetchBotDetails() {
    const botId = getCurrentBotId();
    const $botDetails = await getBotDetail(botId);
    if ($botDetails) {
      const payload = $botDetails.payload;
      setBotDetails(payload);
      const properties = payload.properties;
      const onboardingStageIndex = parseInt(properties['ONBOARDING_STAGE']?.value);
      setStage(STAGE_LIST[onboardingStageIndex || 0]);
    }
  }

  async function fetchSocialConfig() {
    const response = await getSocialConfig();
    const botRefId = response?.data?.find((item: any) => {
      if (item?.env === 'SANDBOX' && item.botId === getCurrentBotId()) return true;
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

  async function fetchAiAgentPersona() {
    const payload = await getAiAgentPersona();
    setAiAgentPersona(payload);
  }

  useEffect(() => {
    fetchBotDetails();
    fetchSocialConfig();
    fetchChatWidgetConfigs();
    fetchAiAgentPersona();
  }, []);

  useEffect(() => {
    if (chatWidgetConfig && botDetails && aiAgentPersona) {
      console.log('botDetails', botDetails, chatWidgetConfig);
      setLoading(false);
    }
  }, [botDetails, chatWidgetConfig, aiAgentPersona]);

  useEffect(() => {
    if (chatWidgetAppEnv && botRefIdStaging) {
      fetchChatWidgetConfig();
    }
  }, [chatWidgetAppEnv, botRefIdStaging]);

  useEffect(() => {
    if (chatWidgetConfig) {
      setGreetingPrompt(chatWidgetConfig.initialFlows?.header);
      setColor(chatWidgetConfig.theme?.color);
      setLogoUrl(chatWidgetConfig.logoImage);
      setBrandName(chatWidgetConfig.title);
      setAiAgentName(botDetails.alias);
      setTone(aiAgentPersona.aiAgentPersonaConfig?.communicationTone?.tone);
    }
  }, [chatWidgetConfig, botDetails, aiAgentPersona]);

  useEffect(() => {
    if (botDetails) {
      const properties = botDetails.properties;
      const isOnboardingComplete = properties['IS_ONBOARDING_COMPLETE']?.value;
      if (isOnboardingComplete === 'true') {
        window.location.href = '/';
      }
    }
  }, [botDetails]);

  return (
    <>
      {!loading && (
        <div className={'relative flex h-[100vh] w-full flex-nowrap overflow-hidden'}>
          <div className={'mx-[30px] flex-grow pb-[30px] pt-[30px]'}>
            <div className="flex h-[50px] items-center">
              <Header />
              <StageSelector />
            </div>
            <div className="h-[60%] scale-[0.85]">
              <StageForm />
            </div>
          </div>
          <div className={'flex w-[520px] justify-center overflow-hidden bg-neutral-200 pt-[50px]'}>
            <ChatWidgetModel />
          </div>
        </div>
      )}
      {loading && (
        <div className={'flex h-full w-full items-center justify-center'}>
          <Spinner />
        </div>
      )}
    </>
  );
}

export default App;
