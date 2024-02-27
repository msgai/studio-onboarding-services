import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';
import { useEffect, useState } from 'react';
import { getBotDetail } from '@/services/bots.ts';
import { STAGE_LIST } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';

function App() {
  const [currentStage, setCurrentStage] = useState(STAGE_LIST[0]);
  const { setStage } = useAppStore((state) => state);

  async function fetchBotDetails() {
    const botId = localStorage.getItem('currentBotId');
    const botDetails = await getBotDetail(botId);
    if (botDetails) {
      const payload = botDetails.payload;
      const properties = payload.properties;
      const onboardingStageIndex = parseInt(properties['ONBOARDING_STAGE']);
      setCurrentStage(STAGE_LIST[onboardingStageIndex || 1]);
    }
    console.log('Bot details:', botDetails);
  }

  useEffect(() => {
    setStage({ currentStage });
  }, [currentStage]);

  useEffect(() => {
    fetchBotDetails();
  }, []);

  return (
    <div className={'flex h-full w-full flex-nowrap'}>
      <div className={'relative mx-[30px] flex-grow overflow-y-auto pb-[30px] pt-[50px]'}>
        <Header />
        <StageSelector />
        <StageForm />
        {/*<div className={'absolute left-0 top-0 z-50 h-full w-full blur-3xl'}>&nbsp;</div>*/}
      </div>
      <div className={'bg- flex w-[520px] items-center justify-center bg-neutral-200'}>
        <ChatWidgetModel />
      </div>
    </div>
  );
}

export default App;
