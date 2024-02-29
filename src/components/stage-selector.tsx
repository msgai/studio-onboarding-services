import { STAGE_LIST } from '@/lib/contants.ts';
import StageSelectorItem from '@/components/stage-selector-item.tsx';

export default function StageSelector() {
  return (
    <div className={'ml-4 mt-5 flex w-full items-center'}>
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
