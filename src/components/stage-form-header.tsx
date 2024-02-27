import useAppStore from '@/store/appStore.ts';
import { STAGE_LIST_DATA } from '@/lib/contants.ts';

export default function StageFormHeader() {
  const { currentStage } = useAppStore((state) => state);
  const header = STAGE_LIST_DATA[currentStage].header;
  const subHeader = STAGE_LIST_DATA[currentStage].subHeader;
  return (
    <div className={'text-center'}>
      <div className={'mb-[15px] text-3xl font-normal leading-none text-white'}>{header}</div>
      <div className={'text-lg font-normal leading-none text-white'}>{subHeader}</div>
    </div>
  );
}
