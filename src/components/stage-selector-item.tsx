import { FIRST_STAGE, STAGE_LIST_DATA, STAGES } from '@/lib/contants.ts';
import { clsx } from 'clsx';
import useAppStore from '@/store/appStore.ts';

interface Props {
  stage: STAGES;
  selected: boolean;
}

export default function StageSelectorItem({ stage, selected }: Props) {
  const { currentStage, setStage } = useAppStore((state) => state);
  const stageData = STAGE_LIST_DATA[stage];
  const isFirstStage = FIRST_STAGE === stage;
  const isLastStage = STAGES.TEST === stage;

  function onClickHandler() {
    setStage({ currentStage: stage });
    // if (isFirstStage) {
    //   return;
    // }
    // if (isLastStage) {
    //   return;
    // }
    // useAppStore.setState({ currentStage: stage });
  }

  return (
    <div className={'w-full'}>
      {/*<div className={'relative h-[0.5px] w-full bg-white'}>*/}
      {/*  <div className={'overflow-hidden px-1'}>*/}
      {/*    <div*/}
      {/*      className={clsx([*/}
      {/*        'absolute left-[50px] top-[-3px] z-10 h-[6px] w-[6px] overflow-hidden rounded-full',*/}
      {/*        selected ? 'bg-white' : 'bg-[#796ee5]',*/}
      {/*      ])}*/}
      {/*    >*/}
      {/*      &nbsp;*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={'flex gap-[3px]'}></div>
      <div className={'relative w-[111px] cursor-pointer truncate text-center'} onClick={onClickHandler}>
        {/*<div*/}
        {/*  className={clsx([*/}
        {/*    'absolute left-[50%] top-[-3px] h-[6px] w-[6px] overflow-hidden rounded-full bg-white p-[2px]',*/}
        {/*    selected ? 'text-opacity-100' : 'text-opacity-25',*/}
        {/*  ])}*/}
        {/*>*/}
        {/*  &nbsp;*/}
        {/*</div>*/}
        <div
          className={clsx([
            'mb-[2px] mt-[6px] h-[17px]  text-sm font-normal leading-none text-white',
            selected ? 'text-opacity-100' : 'text-opacity-25',
          ])}
        >
          {stageData.title}
        </div>
        <div
          className={clsx([
            'h-[17px]  text-[10px] font-normal leading-none text-white',
            selected ? 'text-opacity-100' : 'text-opacity-25',
          ])}
        >
          {stageData.subtitle}
        </div>
      </div>
    </div>
  );
}
