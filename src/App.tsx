import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';
import StageForm from '@/components/stage-form.tsx';
import ChatWidgetModel from '@/components/chat-widget-model.tsx';

function App() {
  return (
    <div className={'flex h-full w-full flex-nowrap'}>
      <div className={'mx-[30px] flex-grow overflow-hidden pt-[50px]'}>
        <Header />
        <StageSelector />
        <StageForm />
      </div>
      <div className={'bg- flex w-[520px] items-center justify-center bg-neutral-200'}>
        <ChatWidgetModel />
      </div>
    </div>
  );
}

export default App;
