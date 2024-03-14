import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';
import React, { useEffect, useState } from 'react';
import { getBotDetail } from '@/services/bots.ts';
import { defaultBrandToneSettings, STAGE_LIST } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';
import Spinner from '@/components/atoms/spinner.tsx';
import { getConfig, getSocialConfig } from '@/services/app.ts';
import { getChatWidgetDetails } from '@/services/chatWidget.ts';
import useFormStore from '@/store/formStore.ts';
import { getAiAgentPersona } from '@/services/aiAgentService.ts';
import { getCurrentBotId } from '@/lib/utils.ts';
import { Toaster } from 'sonner';
import llm from '@/services/llm.ts';
import { checkApiCompleted } from '@/lib/utils';
import Banner from './components/atoms/banner.tsx';

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
  const {
    setTone,
    setGreetingPrompt,
    setLogoUrl,
    setColor,
    setBrandName,
    setAiAgentName,
    showLoading,
    llmCreationState,
    setLLMStatus,
    setDefaultSetting,
  } = useFormStore();

  const [loading, setLoading] = useState(false);
  const [showBanner, setBanner] = useState(false);
  const [timers, setTimers] = useState([]);
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
  }

  async function fetchAiAgentPersona() {
    const payload = await getAiAgentPersona();
    setAiAgentPersona(payload);
  }
  function addTimer(timer: any) {
    setTimers([timer]);
  }
  useEffect(() => {
    if (llmCreationState === 'IN_PROGRESS') {
      setBanner(true);
    }
  }, [llmCreationState]);
  async function startPolling() {
    try {
      console.log('polling', timers);
      timers.forEach((timer: any) => clearTimeout(timer));
      setTimers([]);
      let status = await checkApiCompleted(llm.getLLMCreationStatus, 30000, addTimer, setLLMStatus);
      setLLMStatus(status.status);
    } catch (e) {
      setLLMStatus('FAILED');
    }
  }
  useEffect(() => {
    fetchBotDetails();
    fetchSocialConfig();
    fetchChatWidgetConfigs();
    fetchAiAgentPersona();
    // startPolling();
  }, []);

  useEffect(() => {
    if (chatWidgetConfig && botDetails && aiAgentPersona) {
      setLoading(false);
    }
  }, [botDetails, chatWidgetConfig, aiAgentPersona]);

  useEffect(() => {
    if (chatWidgetAppEnv && botRefIdStaging) {
      fetchChatWidgetConfig();
    }
  }, [chatWidgetAppEnv, botRefIdStaging]);

  useEffect(() => {
    if (chatWidgetConfig && botDetails && aiAgentPersona) {
      setGreetingPrompt(chatWidgetConfig.initialFlows?.header);
      setColor(chatWidgetConfig.theme?.color);
      setLogoUrl(chatWidgetConfig.logoImage);
      setBrandName(chatWidgetConfig.title);
      setAiAgentName(botDetails.alias);
      if (aiAgentPersona.aiAgentPersonaConfig?.communicationTone?.tone) {
        setTone(aiAgentPersona.aiAgentPersonaConfig?.communicationTone?.tone);
      } else {
        setTone(defaultBrandToneSettings.aiAgentPersonaConfig.communicationTone.tone);
        setDefaultSetting(true);
      }
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
  let bannerBody;
  if (llmCreationState === 'FAILED') {
    bannerBody = 'LLM Creation Failed';
  } else if (llmCreationState === 'COMPLETED') {
    bannerBody = 'LLM Created successfully';
  } else {
    bannerBody = 'LLM Creation in Progress';
  }
  return (
    <>
      {!loading && (
        <div className="flex h-full flex-col">
          {(llmCreationState === 'IN_PROGRESS' || showBanner) && (
            <Banner
              spinner={llmCreationState === 'IN_PROGRESS'}
              body={bannerBody}
              showClose={llmCreationState !== 'IN_PROGRESS'}
              onClose={() => {
                setBanner(false);
              }}
            />
          )}
          <div className={'relative flex h-full w-full flex-nowrap overflow-hidden'}>
            <div className={'flex flex-grow flex-col'}>
              <div className="mx-[30px] flex w-full items-center justify-center pt-[30px]">
                <Header />
                <StageSelector />
              </div>
              <div className="scale-[0.85] overflow-y-auto">
                <StageForm startPolling={startPolling} />
              </div>
            </div>
            <div className={'flex h-full w-[520px] items-center justify-center overflow-y-auto  bg-neutral-200'}>
              <ChatWidgetModel />
            </div>
            <Toaster />
            {showLoading && (
              <div className="absolute h-full w-full bg-gray-700 opacity-50	">
                <div className="absolute left-[50%] top-[50%]">
                  <Spinner />
                </div>
              </div>
            )}
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
