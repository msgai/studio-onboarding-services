import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';
import { useEffect, useState } from 'react';
import { getBotDetail } from '@/services/bots.ts';
import { STAGE_LIST } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';
import Spinner from '@/components/atoms/spinner.tsx';
import { getChatWidgetDetails } from '@/services/chatWidget.ts';

function App() {
  const [currentStage, setCurrentStage] = useState(STAGE_LIST[0]);
  const { setStage } = useAppStore((state) => state);
  const [botDetails, setBotDetails] = useState(null);

  async function fetchBotDetails() {
    const botId = localStorage.getItem('currentBotId');
    const botDetails = await getBotDetail(botId);
    if (botDetails) {
      setBotDetails(botDetails);
      const payload = botDetails.payload;
      const properties = payload.properties;
      const onboardingStageIndex = parseInt(properties['ONBOARDING_STAGE']);
      setCurrentStage(STAGE_LIST[onboardingStageIndex || 0]);
    }
    console.log('Bot details:', botDetails);

    const chatWidgetDetails = await getChatWidgetDetails(botId);
    console.log('Chat widget details:', chatWidgetDetails);
  }

  useEffect(() => {
    setStage({ currentStage });
  }, [currentStage]);

  useEffect(() => {
    fetchBotDetails();
  }, []);

  return (
    <>
      {botDetails && (
        <div className={'flex h-full w-full flex-nowrap'}>
          <div className={'relative mx-[30px] flex-grow overflow-y-auto pb-[30px] pt-[50px]'}>
            <Header />
            <StageSelector />
            <StageForm />
          </div>
          <div className={'flex w-[520px] justify-center bg-neutral-200 pt-[50px]'}>
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
