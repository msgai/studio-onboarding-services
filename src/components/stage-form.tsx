import { STAGES } from '@/lib/contants.ts';
import useAppStore from '@/store/appStore.ts';
import StageFormAppearance from './stage-form-appearance.tsx';
import StageFormHeader from '@/components/stage-form-header.tsx';
import StageFormTone from '@/components/stage-form-tone.tsx';

export default function StageForm() {
  const currentStage = useAppStore((state) => state.currentStage);

  return (
    <div className={'mt-[10px] w-full'}>
      <StageFormHeader />
      <div className={'mt-[50px]'}>
        {currentStage === STAGES.APPEARANCE && <StageFormAppearance />}
        {currentStage === STAGES.TONE && <StageFormTone />}
      </div>
    </div>
  );
}
