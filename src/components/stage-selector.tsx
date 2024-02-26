import { STAGE_LIST } from '@/lib/contants.ts';
import StageSelectorItem from '@/components/stage-selector-item.tsx';
import useAppStore from '@/store/appStore.ts';

export default function StageSelector() {
  const currentStage = useAppStore((state) => state.currentStage);
  return (
    <div className={'flex w-full'}>
      {STAGE_LIST.map((stage) => {
        const isSelected = currentStage === stage;
        return (
          <div className={'w-full'}>
            <StageSelectorItem stage={stage} selected={isSelected} />
          </div>
        );
      })}
    </div>
  );
}
