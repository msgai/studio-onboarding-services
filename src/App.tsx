import Header from './components/header.tsx';
import StageSelector from './components/stage-selector.tsx';

function App() {
  return (
    <div className={'h-full w-full'}>
      <div className={'mx-[30px] pt-[50px]'}>
        <Header />
        <StageSelector />
      </div>
    </div>
  );
}

export default App;
