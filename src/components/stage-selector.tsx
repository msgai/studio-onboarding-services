import { STAGE_LIST } from '@/lib/contants.ts';
import StageSelectorItem from '@/components/stage-selector-item.tsx';
import useAppStore from '@/store/appStore.ts';

export default function StageSelector() {
  const { setStage } = useAppStore();
  return (
    <div className={'ml-4 mt-5 flex w-full  max-w-[1130px] items-center'}>
      {STAGE_LIST.map((stage) => {
        return (
          <div className={'w-full'} key={stage}>
            <div
              onClick={() => {
                setStage(stage);
              }}
            >
              <StageSelectorItem stage={stage} isCompleted={false} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
