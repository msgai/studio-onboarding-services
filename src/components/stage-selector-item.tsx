import { FIRST_STAGE, STAGE_LIST_DATA, STAGES } from '@/lib/contants.ts';
import { clsx } from 'clsx';
import useAppStore from '@/store/appStore.ts';
import { useEffect, useState } from 'react';

interface Props {
  stage: STAGES;
  isCompleted: boolean;
}

export default function StageSelectorItem({ stage, isCompleted }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const { currentStage, setStage } = useAppStore((state) => state);
  const stageData = STAGE_LIST_DATA[stage];
  const isFirstStage = FIRST_STAGE === stage;
  const isLastStage = STAGES.TEST === stage;

  useEffect(() => {
    setIsSelected(isCompleted || currentStage === stage);
  }, [isCompleted, currentStage]);

  function onClickHandler() {
    setStage(stage);
  }

  return (
    <div className={'w-full'}>
      <div className={'relative flex items-center gap-[3px]'}>
        {!isFirstStage && <div className={'absolute right-[] top-[0px] h-[0.5px] w-[50px] bg-white'}>&nbsp;</div>}
        <div
          className={clsx([
            'absolute left-[52px] top-[-3px] z-10 h-[6px] w-[6px] shrink-0 overflow-hidden rounded-full',
            isSelected ? 'bg-white' : 'bg-[#796ee5]',
          ])}
        >
          &nbsp;
        </div>
        {!isLastStage && <div className={'absolute left-[57px] right-[10px] h-[0.5px] w-full bg-white'}>&nbsp;</div>}
      </div>
      <div className={'relative w-[111px] cursor-pointer truncate text-center'} onClick={onClickHandler}>
        <div
          className={clsx([
            'mb-[2px] mt-[6px] h-[17px]  text-sm font-normal leading-none text-white',
            isSelected ? 'text-opacity-100' : 'text-opacity-25',
          ])}
        >
          {stageData.title}
        </div>
        <div
          className={clsx([
            'h-[17px]  text-[10px] font-normal leading-none text-white',
            isSelected ? 'text-opacity-100' : 'text-opacity-25',
          ])}
        >
          {stageData.subtitle}
        </div>
      </div>
    </div>
  );
}
