import { STAGE_LIST } from '@/lib/contants.ts';
import StageSelectorItem from '@/components/stage-selector-item.tsx';

export default function StageSelector() {
  return (
    <div className={'flex w-full'}>
      {STAGE_LIST.map((stage) => {
        return (
          <div className={'w-full'} key={stage}>
            <StageSelectorItem stage={stage} isCompleted={false} />
          </div>
        );
      })}
    </div>
  );
}
